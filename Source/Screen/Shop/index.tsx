import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './style'
import Base, { BaseProps, BaseState, UiState } from '../Base'
import * as ActionTypes from "lybrid-action/ActionTypes";
import { Alert, Constants, Logging, Utils } from 'lybrid-common';
import { List, Text, ImageView, ProgressView } from 'lybrid-component';
import LinearGradient from 'react-native-linear-gradient';
import Global from 'lybrid-global';
import Style from 'lybrid-common/Style';
import ProductItem, { ProductModel } from './ProductItem'

interface ShopProps extends BaseProps {
    getProducts: (sender: BaseProps, limit: number, offset: number) => void;
    likeProduct: (sender: BaseProps, product: ProductModel) => void;
    unlikeProduct: (sender: BaseProps, product: ProductModel) => void;
}

interface ShopState extends BaseState {
    data: ProductModel[];
    shouldShowShadow: boolean;
    isRefreshing: boolean;
    isLoadmore: boolean;
    totalProduct: number | undefined;
    page: number;
    greeting: string,
}

const ListHeaderHeight = Constants.MeasureSize(50);

export default class Shop extends Base<ShopProps, ShopState> {

    //Navigation Implement
    goToDetail!: ((data: { nickname: string, join: boolean }) => void);

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
        greeting: Utils.getGreeting(),
    }
    checkTime: NodeJS.Timer | undefined;

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
        this.setState({ isRefreshing: true })
        this.props.getProducts(this.props, Constants.Api.Limit, this.state.page);
        this.checkTime = setInterval(this.checkTimeCurrent.bind(this), 60000);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        clearInterval(this.checkTime);
    }

    checkTimeCurrent() {
        this.setState({ greeting: Utils.getGreeting() });
    }

    componentDidUpdate?(prevProps: Readonly<ShopProps>, prevState: Readonly<ShopState>) {
        if (prevProps.type != this.props.type) {
            if (this.props.type == ActionTypes.GET_PRODUCTS_FAIL) {
                this.showMessageConfirm(this.props.message, this.onRefresh.bind(this));
            }
        }
    }

    static getDerivedStateFromProps(props: ShopProps, state: ShopState) {
        if (state.type == props.type) {
            return {};
        }
        if (props.type == ActionTypes.GET_PRODUCTS_SUCCESS && (state.isRefreshing || state.isLoadmore)) {
            let newData = state.isRefreshing ? props.data?.items : Utils.mergerList(state.data, props.data?.items, "id");
            return {
                data: newData,
                totalProduct: props.data?.totalCount,
                isLoadmore: false,
                isRefreshing: false,
                page: state.page + 1,
                type: props.type,
            }
        }
        if (props.type == ActionTypes.DO_UNLIKE_PRODUCT_SUCCESS) {
            // Alert('ok','ok')
            let index = state.data.findIndex(item => item.id == props.request?.id);
            if (index >= 0) {
                state.data[index].liked = false;
                return {
                    data: state.data,
                    type: props.type,
                }
            }
        }
        if (props.type == ActionTypes.DO_LIKE_PRODUCT_SUCCESS) {
            // Alert('ok','ok')
            let index = state.data.findIndex(item => item.id == props.request?.id);
            if (index >= 0) {
                state.data[index].liked = true;
                return {
                    data: state.data,
                    type: props.type,
                }
            }
        }
        return {
            type: props.type,
        }
    }

    onPressItemFavourite(item: ProductModel) {
        // this.showProgress = true;
        if (item.liked) {
            this.props.unlikeProduct(this.props, item)
        } else {
            this.props.likeProduct(this.props, item)
        }
    }

    onDoubleTapFavourite(item: ProductModel) {
        // this.showProgress = true;
        if (!item.liked) {
            this.props.likeProduct(this.props, item)
        }
    }

    renderItem(type: string | number, data: ProductModel, index: number, extendedState?: object): JSX.Element | JSX.Element[] {
        return <ProductItem data={data} onFavouritePress={this.onPressItemFavourite.bind(this, data)} onDoubleTap={this.onDoubleTapFavourite.bind(this, data)} />
    }

    onRefresh() {
        if (this.state.isLoadmore || this.state.isRefreshing) {
            return;
        }
        // this.showProgress = true;
        this.props.getProducts(this.props, Constants.Api.Limit, 0);
        this.setState({ isRefreshing: true, page: 0 }, () => { });
    }

    onRequestNextPage() {
        if (this.state.isLoadmore || this.state.isRefreshing) {
            return;
        }
        // this.showProgress = false;
        this.props.getProducts(this.props, Constants.Api.Limit, this.state.page * Constants.Api.Limit);
        this.setState({ isLoadmore: true }, () => { });
    }

    renderView() {
        return <LinearGradient colors={['#F3EFFF', '#F7FDFF', '#FFFFFF']} style={styles.linearGradient}>
            {/* <Text style={styles.title}>Shop</Text> */}
            <View style={[{ backgroundColor: 'white', zIndex: 999 }, this.state.shouldShowShadow && Style.shadowSmallLight]}>
                <SafeAreaView>
                    <View style={styles.container}>
                        <View style={styles.avatarWrap}>
                            <ImageView source={{ uri: 'https://i.picsum.photos/id/203/200/200.jpg?hmac=fydyJjsULq7iMwTTIg_m6g_PQQ1paJrufNsEiqbJRsg' }} style={styles.avatar} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.hello}>{this.state.greeting}</Text>
                            <Text style={styles.account}>{Global.appAccountName?.substring(0, 8)}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
            <View style={{ flex: 1 }}>
                {!this.state.shouldShowShadow && this.state.totalProduct !== undefined && <View style={styles.wrapTotal}>
                    <Text style={styles.total}>{`${Utils.formatNumberToString(this.state.totalProduct)} products sorted by price`}</Text>
                </View>}
                <List
                    style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    itemHeight={Constants.ScreenSize.width * 382 / 410}
                    data={this.state.data}
                    itemRenderer={this.renderItem.bind(this)}
                    isRefreshing={this.state.isRefreshing}
                    isLoadmore={this.state.isLoadmore}
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
        </LinearGradient>
    }
}
