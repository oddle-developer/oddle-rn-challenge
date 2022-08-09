import { AxiosResponse } from 'axios'
import { Hygraph } from 'lybrid-common'
import { gql } from 'graphql-request';
import { Languages, Logging, NetworkHelper } from 'lybrid-common'
import Global from 'lybrid-global'
import _ from 'lodash'

export interface GraphNode<T> {
    node: T,
}

export interface GraphList<T> {
    items: T[],
    pageInfo: PageInfo,
    totalCount: number
}

export interface RecommendList<T> {
    RecommendByType: GraphList<T> | undefined
    RecommendByBrand: GraphList<T> | undefined
    RecommendByRate: GraphList<T> | undefined
}

interface PageInfo {
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export default class GraphBase {

    static handleConnection<T>(resolve: (value: T) => void, reject: (reason?: any) => void, callback: () => void) {
        if (Global.connected) {
            callback()
        } else {
            setTimeout(() => {
                reject(Languages.get('system.no.internet.connection'))
            }, 1000)
        }
    }

    static handleResponse<T>(resolve: (value: T) => void, reject: (reason?: any) => void, response: T) {
        if (!response) {
            reject('response.data.message')
        } else {
            Logging.log('response')
            Logging.log(response)
            Logging.log('response')
            resolve(response)
        }
    }

    static handleTimeout(resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void) {
        reject(Languages.get('system.no.internet.connection'))
    }

    static post(api: string, params: any, header: any = null) {
        return new Promise((resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void) => {
            this.handleConnection(resolve, reject, () => {
                NetworkHelper.requestPost(api, params, header)
                    .then((response) => {
                        this.handleResponse(resolve, reject, response);
                    })
                    .catch((error) => {
                        this.handleTimeout(resolve, reject)
                    })
            });
        })
    }

    static getList<T extends object>(schema: string, fields: string, orderBy: string | undefined, limit: number, offset: number, filterField: string | undefined = undefined, filterKey: string | undefined = undefined, filterData: any | undefined = undefined) {
        return new Promise((resolve: (value: GraphList<T>) => void, reject: (reason?: any) => void) => {
            this.handleConnection(resolve, reject, async () => {
                const query = gql`
                    query indexPageQuery($limit: Int!, $offset: Int!, $orderBy: ${orderBy}${filterField ? filterField : ''}) {
                        ${schema}Connection(first: $limit, skip: $offset, orderBy: $orderBy${filterKey ? filterKey : ''}) {
                            items:edges {
                                node {
                                    ${fields}
                                }
                            }
                            pageInfo {
                                hasNextPage
                                hasPreviousPage
                            }
                            aggregate {
                              count
                            }
                        }
                    }
                `;
                try {
                    const response = await Hygraph.request(query, { limit, offset, filterData });
                    if (response && response[`${schema}Connection`]) {
                        var graphNodeList: GraphList<GraphNode<T>> = response[`${schema}Connection`]
                        var graphList: GraphList<T> = {
                            items: graphNodeList.items.map(item => item.node),
                            pageInfo: graphNodeList.pageInfo,
                            totalCount: response[`${schema}Connection`].aggregate?.count
                        }
                        resolve(graphList);
                    } else {
                        reject();
                    }
                } catch {
                    reject();
                }
            });
        })
    }
}