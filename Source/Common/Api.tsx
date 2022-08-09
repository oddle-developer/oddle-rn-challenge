import * as Domain from "../../Domain"
export const BASE_API = Domain.REST_API_SERVER;
export const GRAPH_API = Domain.GRAPH_API_SERVER;
export const REST_API_KEY = Domain.REST_API_KEY;
export const REST_API_NAME = Domain.REST_API_NAME;
export const LIKE_PRODUCT = BASE_API + '/api/accounts/:app_account_name/favourites/:item_id'
export const UNLIKE_PRODUCT = BASE_API + '/api/accounts/:app_account_name/favourites/:item_id'
export const LIST_LIKED_PRODUCTS = BASE_API + '/api/accounts/:app_account_name/favourites'
