import * as ActionTypes from 'lybrid-action/ActionTypes'
import { Keyboard } from 'react-native'

export default function base(state = {}, action: any) {
    switch (action.type) {
        case ActionTypes.DO_LIKE_PRODUCT_PENDING:
        case ActionTypes.DO_UNLIKE_PRODUCT_PENDING:
        case ActionTypes.GET_LIKED_PRODUCTS_PENDING:
        case ActionTypes.GET_HOME_PRODUCTS_PENDING:
        case ActionTypes.GET_PRODUCTS_PENDING:
            {
                Keyboard.dismiss()
                return {
                    ...state,
                    ...action,
                    isRequesting: true,
                    message: '',
                    index: new Date().getTime(),
                }
            }
        case ActionTypes.DO_LIKE_PRODUCT_FAIL:
        case ActionTypes.DO_UNLIKE_PRODUCT_FAIL:
        case ActionTypes.GET_LIKED_PRODUCTS_FAIL:
        case ActionTypes.GET_HOME_PRODUCTS_FAIL:
        case ActionTypes.GET_PRODUCTS_FAIL:
            {
                return {
                    ...state,
                    ...action,
                    isRequesting: false,
                    message: action.message,
                    index: new Date().getTime(),
                }
            }
        case ActionTypes.DO_LIKE_PRODUCT_SUCCESS:
        case ActionTypes.DO_UNLIKE_PRODUCT_SUCCESS:
        case ActionTypes.GET_LIKED_PRODUCTS_SUCCESS:
        case ActionTypes.GET_HOME_PRODUCTS_SUCCESS:
        case ActionTypes.GET_PRODUCTS_SUCCESS:
            {
                return {
                    ...state,
                    ...action,
                    isRequesting: false,
                    message: '',
                    index: new Date().getTime(),
                }
            }
        default:
            return {};
    }
}
