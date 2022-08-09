import * as ActionTypes from './ActionTypes'
import { ProductService } from 'lybrid-service'
import { Alert, Constants } from 'lybrid-common'
import { Dispatch } from 'redux';
import { BaseProps } from 'lybrid-screen/Base';
import Global from 'lybrid-global';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProductModel } from 'lybrid-screen/Shop/ProductItem';

export const getProducts = (sender: BaseProps, limit: number, offset: number) => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch({ type: ActionTypes.GET_PRODUCTS_PENDING, sender })
        ProductService.getProducts(limit, offset)
            .then((data) => {
                if (data && data.pageInfo && data.items) {
                    dispatch({ type: ActionTypes.GET_PRODUCTS_SUCCESS, sender, data })
                } else {
                    dispatch({ type: ActionTypes.GET_PRODUCTS_FAIL, sender, ...data })
                }
            })
            .catch((message) => {
                dispatch({ type: ActionTypes.GET_PRODUCTS_FAIL, sender, message })
            })
    }
};

export const getHomeProducts = (sender: BaseProps, limit: number, offset: number) => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch({ type: ActionTypes.GET_HOME_PRODUCTS_PENDING, sender })
        ProductService.getHomeProducts(limit, offset)
            .then((data) => {
                if (data) {
                    dispatch({ type: ActionTypes.GET_HOME_PRODUCTS_SUCCESS, sender, data: data })
                } else {
                    dispatch({ type: ActionTypes.GET_HOME_PRODUCTS_FAIL, sender })
                }
            })
            .catch((message) => {
                dispatch({ type: ActionTypes.GET_HOME_PRODUCTS_FAIL, sender, message })
            })
    }
};


export const likeProduct = (sender: BaseProps, product: ProductModel) => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch({ type: ActionTypes.DO_LIKE_PRODUCT_PENDING, sender })
        ProductService.likeProduct(product.id)
            .then(({ data, status }) => {
                if (data) {
                    dispatch({ type: ActionTypes.DO_LIKE_PRODUCT_SUCCESS, request: product, sender, data })
                } else {
                    dispatch({ type: ActionTypes.DO_LIKE_PRODUCT_FAIL, request: product, sender, ...data })
                }
            })
            .catch((message) => {
                dispatch({ type: ActionTypes.DO_LIKE_PRODUCT_FAIL, request: product, sender, message })
            })
    }
};

export const unlikeProduct = (sender: BaseProps, product: ProductModel) => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch({ type: ActionTypes.DO_UNLIKE_PRODUCT_PENDING, sender })
        ProductService.unlikeProduct(product.id)
            .then(({ data, status }) => {
                if (data) {
                    dispatch({ type: ActionTypes.DO_UNLIKE_PRODUCT_SUCCESS, request: product, sender, data })
                } else {
                    dispatch({ type: ActionTypes.DO_UNLIKE_PRODUCT_FAIL, request: product, sender, ...data })
                }
            })
            .catch((message) => {
                dispatch({ type: ActionTypes.DO_UNLIKE_PRODUCT_FAIL, request: product, sender, message })
            })
    }
};

export const getLikedProducts = (sender: BaseProps, limit: number, offset: number) => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch({ type: ActionTypes.GET_LIKED_PRODUCTS_PENDING, sender })
        ProductService.getLikedProducts(limit, offset)
            .then((data) => {
                if (data) {
                    dispatch({ type: ActionTypes.GET_LIKED_PRODUCTS_SUCCESS, sender, data: data })
                } else {
                    dispatch({ type: ActionTypes.GET_LIKED_PRODUCTS_FAIL, sender })
                }
            })
            .catch((message) => {
                dispatch({ type: ActionTypes.GET_LIKED_PRODUCTS_FAIL, sender, message })
            })
    }
};