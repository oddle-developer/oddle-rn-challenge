import { RESTApi, Hygraph, Alert } from 'lybrid-common'
import Base from './base';
import GraphBase, { GraphList, RecommendList } from './graphBase';
import { ProductModel } from 'lybrid-screen/Shop/ProductItem';
import Global from 'lybrid-global';
import _ from 'lodash'

class Services {
  static likeProduct(item_id: string) {
    return Base.patch(RESTApi.LIKE_PRODUCT.replace(":app_account_name", Global.appAccountName).replace(":item_id", item_id), {})
  }

  static unlikeProduct(item_id: string) {
    return Base.del(RESTApi.UNLIKE_PRODUCT.replace(":app_account_name", Global.appAccountName).replace(":item_id", item_id), {})
  }

  static async getLikedProductIDs(limit: number, offset: number) {
    return Base.get(RESTApi.LIST_LIKED_PRODUCTS.replace(":app_account_name", Global.appAccountName), {})
  }

  static getRecommendedProducts(limit: number, offset: number): Promise<GraphList<ProductModel>> {
    return new Promise(async (resolve: (value: GraphList<ProductModel>) => void, reject: (reason?: any) => void) => {
      try {
        let likedProductIDs = await Base.get(RESTApi.LIST_LIKED_PRODUCTS.replace(":app_account_name", Global.appAccountName), {})
        let products = await GraphBase.getList<ProductModel>(
          'products',
          'id name brand rating price category priceSign productType tagList websiteLink productLink apiFeaturedImage',
          'ProductOrderByInput = price_ASC',
          limit,
          offset,
        );
        products.items.forEach(item => item.liked = likedProductIDs.data?.data?.includes(item.id));
        resolve(products)
      } catch (error) {
        reject();
      }
    });
  }

  static getProducts(limit: number, offset: number): Promise<GraphList<ProductModel>> {
    return new Promise(async (resolve: (value: GraphList<ProductModel>) => void, reject: (reason?: any) => void) => {
      try {
        let likedProductIDs = await Base.get(RESTApi.LIST_LIKED_PRODUCTS.replace(":app_account_name", Global.appAccountName), {})
        let products = await GraphBase.getList<ProductModel>(
          'products',
          'id name brand rating price category priceSign productType tagList websiteLink productLink apiFeaturedImage',
          'ProductOrderByInput = price_ASC',
          limit,
          offset,
        );
        products.items.forEach(item => item.liked = likedProductIDs.data?.data?.includes(item.id));
        resolve(products)
      } catch (error) {
        reject();
      }
    });
  }

  static async getLikedProducts(limit: number, offset: number): Promise<GraphList<ProductModel>> {
    return new Promise(async (resolve: (value: GraphList<ProductModel>) => void, reject: (reason?: any) => void) => {
      try {
        let likedProductIDs = await Base.get(RESTApi.LIST_LIKED_PRODUCTS.replace(":app_account_name", Global.appAccountName), {})
        likedProductIDs.data?.data ?? []
        let products = await GraphBase.getList<ProductModel>(
          'products',
          'id name brand rating price category priceSign productType tagList websiteLink productLink apiFeaturedImage',
          'ProductOrderByInput = price_ASC',
          limit,
          offset,
          ', $filterData: [ID!]',
          ', where: { id_in: $filterData }',
          likedProductIDs.data?.data ?? [],
        );
        products.items.forEach(item => item.liked = true);
        resolve(products)
      } catch (error) {
        reject();
      }
    });
  }

  static async getHomeProducts(limit: number, offset: number): Promise<RecommendList<ProductModel>> {
    return new Promise(async (resolve: (value: RecommendList<ProductModel>) => void, reject: (reason?: any) => void) => {
      try {
        let likedProductIDs = await Base.get(RESTApi.LIST_LIKED_PRODUCTS.replace(":app_account_name", Global.appAccountName), {})
        likedProductIDs.data?.data ?? []
        let products = await GraphBase.getList<ProductModel>(
          'products',
          'id productType brand',
          'ProductOrderByInput = price_ASC',
          limit,
          offset,
          ', $filterData: [ID!]',
          ', where: { id_in: $filterData }',
          likedProductIDs.data?.data ?? [],
        );

        var mostProductType = _.head(_(products.items)
          .countBy(item => item.productType)
          .entries()
          .maxBy(_.last));

        var mostBrand = _.head(_(products.items)
          .countBy(item => item.brand)
          .entries()
          .maxBy(_.last));


        let mostProductsByType = mostProductType ? await GraphBase.getList<ProductModel>(
          'products',
          'id name brand rating price category priceSign productType tagList websiteLink productLink apiFeaturedImage',
          'ProductOrderByInput = price_DESC',
          3,
          0,
          ', $filterData: [String!]',
          ', where: { productType_in: $filterData }',
          [mostProductType],
        ) : undefined;

        let mostProductsByBrand = mostBrand ? await GraphBase.getList<ProductModel>(
          'products',
          'id name brand rating price category priceSign productType tagList websiteLink productLink apiFeaturedImage',
          'ProductOrderByInput = price_ASC',
          3,
          0,
          ', $filterData: [String!]',
          ', where: { brand_in: $filterData }',
          [mostBrand],
        ) : undefined;

        let mostProductsByRate = mostBrand ? await GraphBase.getList<ProductModel>(
          'products',
          'id name brand rating price category priceSign productType tagList websiteLink productLink apiFeaturedImage',
          'ProductOrderByInput = rating_DESC',
          3,
          0,
          ', $filterData: [String!]',
          ', where: { AND: [{ productType_in: $filterData }, { rating_gt: 0 }]}',
          [mostProductType],
        ) : undefined;

        mostProductsByType?.items?.forEach(item => item.liked = likedProductIDs.data?.data?.includes(item.id));
        mostProductsByBrand?.items?.forEach(item => item.liked = likedProductIDs.data?.data?.includes(item.id));
        mostProductsByRate?.items?.forEach(item => item.liked = likedProductIDs.data?.data?.includes(item.id));

        resolve({
          RecommendByType: mostProductsByType,
          RecommendByBrand: mostProductsByBrand,
          RecommendByRate: mostProductsByRate
        })
      } catch (error) {
        reject();
      }
    });
  }

}
export default Services
