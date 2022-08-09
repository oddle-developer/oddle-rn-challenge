import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './style'
import Base, { BaseProps, BaseState, UiState } from '../Base'
import * as ActionTypes from "lybrid-action/ActionTypes";
import { Alert, Constants, Logging, Styles, Utils } from 'lybrid-common';
import { List, Text, ImageView, ProgressView } from 'lybrid-component';
import LinearGradient from 'react-native-linear-gradient';
import Global from 'lybrid-global';
import Style from 'lybrid-common/Style';
import ProductItem, { ProductModel } from '../Shop/ProductItem'
import { Button } from 'react-native-paper';

interface ShopProps extends BaseProps {
    getLikedProducts: (sender: BaseProps, limit: number, offset: number) => void,
    likeProduct: (sender: BaseProps, product: ProductModel) => void,
    unlikeProduct: (sender: BaseProps, product: ProductModel) => void,
}

interface ShopState extends BaseState {
    data: any[],
    shouldShowShadow: boolean,
    isRefreshing: boolean,
    isLoadmore: boolean,
    totalProduct: number | undefined,
    page: number,
    noData: boolean,
}

const ListHeaderHeight = Constants.MeasureSize(15);

export default class Shop extends Base<ShopProps, ShopState> {

    //Navigation Implement
    goToDetail!: ((data: { nickname: string, join: boolean }) => void);
    goToShop!: (() => void);

    //State Implement
    state: ShopState = {
        type: undefined,
        canBack: false,
        uiState: UiState.Normal,
        data: [],
        isRefreshing: false,
        isLoadmore: false,
        totalProduct: undefined,
        shouldShowShadow: false,
        page: 0,
        noData: false,
    }

    constructor(props: ShopProps) {
        super(props);
        this.showToolbar = false;
        this.showProgress = false;
        this.enableKeyboardAware = false;
    }

    getTite(): string | undefined {
        return 'screen.home.title'.localize();
    }

    componentDidMount() {
        super.componentDidMount();
        this.setState({ isRefreshing: true, })
        this.props.getLikedProducts(this.props, Constants.Api.Limit, this.state.page);
    }

    componentDidUpdate?(prevProps: Readonly<ShopProps>, prevState: Readonly<ShopState>) {
        if (prevProps.type != this.props.type) {
            if (this.props.type == ActionTypes.GET_LIKED_PRODUCTS_FAIL) {
                this.showMessageConfirm(this.props.message, this.onRefresh.bind(this));
            }
        }
    }

    static getDerivedStateFromProps(props: ShopProps, state: ShopState) {
        if (state.type == props.type) {
            return {};
        }
        Logging.log("props", props)
        if (props.type == ActionTypes.GET_LIKED_PRODUCTS_SUCCESS && (state.isRefreshing || state.isLoadmore)) {
            let newData = state.isRefreshing ? props.data?.items : Utils.mergerList(state.data, props.data?.items, "id");
            Logging.log("data", newData)
            return {
                data: newData,
                totalProduct: props.data?.totalCount,
                isLoadmore: false,
                isRefreshing: false,
                page: state.page + (props.data?.items?.length > 0 ? 1 : 0),
                noData: newData == undefined || newData.length == 0,
                type: props.type,
            }
        }
        if (props.type == ActionTypes.DO_UNLIKE_PRODUCT_SUCCESS) {
            let index = state.data.findIndex(item => item.id == props.request?.id);
            if (index >= 0) {
                state.data.splice(index, 1)
                return {
                    data: state.data,
                    noData: state.data == undefined || state.data.length == 0,
                    type: props.type,
                }
            }
        }
        if (props.type == ActionTypes.DO_LIKE_PRODUCT_SUCCESS) {
            let index = state.data.findIndex(item => item.id == props.request?.id);
            if (index < 0) {
                state.data.splice(0, 0, props.request);
                state.data[0].liked = true;
                return {
                    data: state.data,
                    noData: state.data == undefined || state.data.length == 0,
                    type: props.type,
                }
            }
        }
        return {
            type: props.type,
        }
    }

    onPressItemFavourite(item: ProductModel) {
        if (item.liked) {
            this.props.unlikeProduct(this.props, item)
        } else {
            this.props.likeProduct(this.props, item)
        }
    }

    renderItem(type: string | number, data: ProductModel, index: number, extendedState?: object): JSX.Element | JSX.Element[] {
        return <ProductItem data={data} onFavouritePress={this.onPressItemFavourite.bind(this, data)} />
    }

    onRefresh() {
        if (this.state.isLoadmore || this.state.isRefreshing) {
            return;
        }
        this.props.getLikedProducts(this.props, Constants.Api.Limit, 0);
        this.setState({ isRefreshing: true, page: 0 });
    }

    onRequestNextPage() {
        if (this.state.isLoadmore || this.state.isRefreshing) {
            return;
        }
        this.props.getLikedProducts(this.props, Constants.Api.Limit, this.state.page * Constants.Api.Limit);
        this.setState({ isLoadmore: true })
    }

    renderView() {
        return <LinearGradient colors={['#F3EFFF', '#F7FDFF', '#FFFFFF']} style={styles.linearGradient}>
            {/* <Text style={styles.title}>Shop</Text> */}
            <View style={[{ backgroundColor: 'white', zIndex: 999 }, this.state.shouldShowShadow && Style.shadowSmallLight]}>
                <SafeAreaView>
                    <View style={styles.container}>
                        <Text style={styles.title}>{'screen.favourites.title'.localize()}</Text>
                        <View style={styles.avatarWrap}>
                            <ImageView source={{ uri: 'https://i.picsum.photos/id/203/200/200.jpg?hmac=fydyJjsULq7iMwTTIg_m6g_PQQ1paJrufNsEiqbJRsg' }} style={styles.avatar} />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
            <View style={{ flex: 1 }}>
                <List
                    style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    itemHeight={Constants.ScreenSize.width * 382 / 410}
                    data={this.state.data}
                    itemRenderer={this.renderItem.bind(this)}
                    isRefreshing={this.state.isRefreshing}
                    isLoadmore={this.state.isLoadmore && this.state.page != 0}
                    onLoadMore={this.onRequestNextPage.bind(this)}
                    onRefresh={this.onRefresh.bind(this)}
                    onScrollEvent={(offsetX, offsetY) => {
                        let shouldShowShadow = offsetY >= ListHeaderHeight;
                        if (this.state.shouldShowShadow != shouldShowShadow) {
                            this.setState({ shouldShowShadow })
                        }
                    }}
                />
                <ProgressView visible={!this.state.isLoadmore && this.props.isRequesting} />
            </View>
            {this.state.noData && !this.state.isRefreshing && !this.state.isLoadmore && <View style={Styles.wellcomeBox} pointerEvents="box-none">
                <Text style={Styles.wellcomeText}>{'screen.favourites.wellcome'.localize()}</Text>
                <Button style={Styles.wellcomeButton} mode="contained" onPress={() => this.goToShop()}>{'screen.favourites.explore'.localize()}</Button>
            </View>}
        </LinearGradient>
    }
}
