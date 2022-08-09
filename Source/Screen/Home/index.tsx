import React from 'react';
import { View, SafeAreaView, ScrollView, RefreshControl, Image } from 'react-native';
import styles from './style'
import Base, { BaseProps, BaseState, UiState } from '../Base'
import * as ActionTypes from "lybrid-action/ActionTypes";
import { Alert, Constants, Settings, Styles, Utils } from 'lybrid-common';
import { Text, ImageView } from 'lybrid-component';
import Global from 'lybrid-global';
import LinearGradient from 'react-native-linear-gradient';
import ProductItem, { ProductItemStyle, ProductModel } from '../Shop/ProductItem';
import { Button } from 'react-native-paper';

interface HomeProps extends BaseProps {
    getHomeProducts: (sender: BaseProps, limit: number, offset: number) => void,
    likeProduct: (sender: BaseProps, product: ProductModel) => void,
    unlikeProduct: (sender: BaseProps, product: ProductModel) => void,
}

interface HomeState extends BaseState {
    refreshing: boolean,
    RecommendByType: ProductModel[],
    RecommendByBrand: ProductModel[],
    RecommendByRate: ProductModel[],
    noData: boolean,
    shouldReload: boolean,
    greeting: string,
}

export default class Home extends Base<HomeProps, HomeState> {

    //Navigation Implement
    goToDetail!: ((data: { nickname: string, join: boolean }) => void);
    goToShop!: (() => void);

    //State Implement
    state: HomeState = {
        type: undefined,
        canBack: false,
        uiState: UiState.Normal,
        refreshing: false,
        RecommendByType: [],
        RecommendByBrand: [],
        RecommendByRate: [],
        noData: false,
        shouldReload: false,
        greeting: Utils.getGreeting(),
    }
    page: number = 0;
    checkTime: NodeJS.Timer | undefined;

    constructor(props: HomeProps) {
        super(props);
        this.showToolbar = false;
        this.enableKeyboardAware = false;
    }

    getTite(): string | undefined {
        return 'screen.home.title'.localize();
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.getHomeProducts(this.props, Constants.Api.Limit, this.page);
        this.checkTime = setInterval(this.checkTimeCurrent.bind(this), 60000);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        clearInterval(this.checkTime);
    }

    checkTimeCurrent() {
        this.setState({ greeting: Utils.getGreeting() });
    }

    onBlur() {
        if (this.state.shouldReload) {
            this.setState({ shouldReload: false }, () => {
                setTimeout(this.onRefresh.bind(this), 100);
            })
        }
    }

    componentDidUpdate?(prevProps: Readonly<HomeProps>, prevState: Readonly<HomeState>) {
        if (prevProps.type != this.props.type) {
            if (this.props.type == ActionTypes.DO_UNLIKE_PRODUCT_SUCCESS || this.props.type == ActionTypes.DO_LIKE_PRODUCT_SUCCESS) {
                this.setState({ shouldReload: true });
                // setTimeout(this.onRefresh.bind(this), 1000);
            }
            if (this.props.type == ActionTypes.GET_HOME_PRODUCTS_FAIL) {
                this.showMessageConfirm(this.props.message, this.onRefresh.bind(this));
            }
        }
    }

    static findAndUpdateLikeStatus(data: ProductModel[], target: ProductModel, status: boolean) {
        let index = data.findIndex(item => item.id == target?.id);
        if (index >= 0) {
            data[index].liked = false;
        }
        return data;
    }

    static getDerivedStateFromProps(props: HomeProps, state: HomeState) {
        if (state.type == props.type) {
            return {};
        }
        if (props.type == ActionTypes.GET_HOME_PRODUCTS_SUCCESS) {
            return {
                RecommendByType: props.data?.RecommendByType?.items ?? [],
                RecommendByBrand: props.data?.RecommendByBrand?.items ?? [],
                RecommendByRate: props.data?.RecommendByRate?.items ?? [],
                refreshing: false,
                noData: !props.data?.RecommendByType && !props.data?.RecommendByBrand && !props.data?.RecommendByRate,
                type: props.type,
            }
        }
        if (props.type == ActionTypes.DO_UNLIKE_PRODUCT_SUCCESS) {
            Home.findAndUpdateLikeStatus(state.RecommendByType, props.request, false);
            Home.findAndUpdateLikeStatus(state.RecommendByRate, props.request, false);
            Home.findAndUpdateLikeStatus(state.RecommendByBrand, props.request, false);
            return {
                RecommendByType: state.RecommendByType,
                RecommendByBrand: state.RecommendByBrand,
                RecommendByRate: state.RecommendByRate,
                type: props.type,
            }
        }
        if (props.type == ActionTypes.DO_LIKE_PRODUCT_SUCCESS) {
            Home.findAndUpdateLikeStatus(state.RecommendByType, props.request, true);
            Home.findAndUpdateLikeStatus(state.RecommendByRate, props.request, true);
            Home.findAndUpdateLikeStatus(state.RecommendByBrand, props.request, true);
            return {
                RecommendByType: state.RecommendByType,
                RecommendByBrand: state.RecommendByBrand,
                RecommendByRate: state.RecommendByRate,
                type: props.type,
            }
        }
        return {
            type: props.type,
        }
    }

    onRefresh() {
        this.setState({ refreshing: true })
        this.props.getHomeProducts(this.props, Constants.Api.Limit, this.page);
    }

    onPressItemFavourite(item: ProductModel) {
        if (item.liked) {
            this.props.unlikeProduct(this.props, item)
        } else {
            this.props.likeProduct(this.props, item)
        }
    }

    renderView() {
        return <LinearGradient colors={['#F3EFFF', '#F7FDFF', '#FFFFFF']} style={styles.linearGradient}>
            <View style={styles.content}>
                <SafeAreaView style={styles.safeView}>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={styles.avatarWrap}>
                                <ImageView source={{ uri: 'https://i.picsum.photos/id/203/200/200.jpg?hmac=fydyJjsULq7iMwTTIg_m6g_PQQ1paJrufNsEiqbJRsg' }} style={styles.avatar} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.hello}>{this.state.greeting}</Text>
                                <Text style={styles.account}>{Global.appAccountName}</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                <ScrollView style={styles.linearGradient} contentContainerStyle={styles.scrollContainer} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}>
                    <View>
                        {this.state.RecommendByType.length > 0 && <>
                            <Text style={styles.recommendLabel}>{'Recommended for you'}</Text>
                            <ScrollView style={styles.recommendContent} contentContainerStyle={styles.recommendContentContainer} horizontal={true}>
                                {this.state.RecommendByType.map(data => {
                                    return <ProductItem containerStyle={styles.recommendItem} itemStyle={ProductItemStyle.small} data={data} onFavouritePress={this.onPressItemFavourite.bind(this, data)} />
                                })}
                            </ScrollView>
                        </>}
                        {this.state.RecommendByBrand.length > 0 && <>
                            <Text style={styles.recommendLabel}>{'Because you like ' + this.state.RecommendByBrand[0]?.brand}</Text>
                            <ScrollView style={styles.recommendContent} contentContainerStyle={styles.recommendContentContainer} horizontal={true}>
                                {this.state.RecommendByBrand.map(data => {
                                    return <ProductItem containerStyle={styles.recommendItem} itemStyle={ProductItemStyle.small} data={data} onFavouritePress={this.onPressItemFavourite.bind(this, data)} />
                                })}
                            </ScrollView>
                        </>}
                        {this.state.RecommendByRate.length > 0 && <>
                            <Text style={styles.recommendLabel}>{'The most rating you may interesting'}</Text>
                            <ScrollView style={styles.recommendContent} contentContainerStyle={styles.recommendContentContainer} horizontal={true}>
                                {this.state.RecommendByRate.map(data => {
                                    return <ProductItem containerStyle={styles.recommendItem} itemStyle={ProductItemStyle.small} data={data} onFavouritePress={this.onPressItemFavourite.bind(this, data)} />
                                })}
                            </ScrollView>
                        </>}
                    </View>
                </ScrollView>
                {this.state.noData && !this.props.isRequesting && <View style={Styles.wellcomeBox} pointerEvents="box-none">
                    <Text style={Styles.wellcomeText}>{'screen.home.wellcome'.localize()}</Text>
                    <Button style={Styles.wellcomeButton} mode="contained" onPress={() => this.goToShop()}>{'screen.home.explore'.localize()}</Button>
                </View>}
            </View >
        </LinearGradient >
    }
}
