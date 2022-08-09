import { AxiosResponse } from 'axios'
import { Languages, Logging, Alert, Constants, NetworkHelper } from 'lybrid-common'
import Global from 'lybrid-global'
import { Linking } from 'react-native'

export default class Base {

    static handleConnection(resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void, callback: () => void) {
        if (Global.connected) {
            callback()
        } else {
            setTimeout(() => {
                reject(Languages.get('system.no.internet.connection'))
            }, 1000)
        }
    }

    static handleResponse(resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void, response: AxiosResponse<any, any>) {
        if (response.status == 201 && response.data) {

            Alert('', response.data.message, Languages.get('system.dialog.update'), () => {
                Linking.openURL(response.data.link)
            });

            reject(response.data.message)
        } else if (response.status == 401) {
            Alert('',
                Languages.get("system.verifytoken.fail.message"),
                Languages.get("system.verifytoken.fail.quit"),
                () => {
                    // global.user.area = null
                    // global.device.area = null
                    // global.updateUser(global.user)
                    // Global.emit(Constants.Event.ChangeScreen, Constants.Screen.Initial1);
                },
            );
        }

        if (response.status != 200 && response.data && response.data.message) {
            reject(response.data.message)
        } else if (response.status == 200) {
            Logging.log('response')
            Logging.log(response)
            Logging.log('response')
            resolve(response)
        } else {
            reject(Languages.get('system.server.internal.error'))
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

    static patch(api: string, params: any, header: any = null) {
        return new Promise((resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void) => {
            this.handleConnection(resolve, reject, () => {
                NetworkHelper.requestPatch(api, params, header)
                    .then((response) => {
                        this.handleResponse(resolve, reject, response);
                    })
                    .catch((error) => {
                        this.handleTimeout(resolve, reject)
                    })
            });
        })
    }

    static del(api: string, params: any, header: any = null) {
        return new Promise((resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void) => {
            this.handleConnection(resolve, reject, () => {
                NetworkHelper.requestDelete(api, params, header)
                    .then((response) => {
                        this.handleResponse(resolve, reject, response);
                    })
                    .catch((error) => {
                        this.handleTimeout(resolve, reject)
                    })
            });
        })
    }

    static get(api: string, header: any = null) {
        return new Promise((resolve: (value: AxiosResponse<any, any>) => void, reject: (reason?: any) => void) => {
            this.handleConnection(resolve, reject, () => {
                NetworkHelper.requestGet(api, header)
                    .then((response) => {
                        this.handleResponse(resolve, reject, response);
                    })
                    .catch((error) => {
                        this.handleTimeout(resolve, reject)
                    })
            });
        })
    }
}