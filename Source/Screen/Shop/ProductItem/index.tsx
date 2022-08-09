
import { ImageView, Text, TouchableOpacityEx } from "lybrid-component";
import React from "react";
import { Image, Linking, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
import styles from './style'

export enum ProductItemStyle {
    small,
    large
}

interface ProductItemProp {
    itemStyle: ProductItemStyle
    data: ProductModel
    onFavouritePress: () => void
    onDoubleTap: () => void | undefined
    containerStyle: StyleProp<ViewStyle>
}

interface ProductItemState {
    liked: boolean
    clickCount: number
}

export interface ProductColorModel {
    hex_value: string,
    colour_name: string,
}

export interface ProductModel {
    id: string
    apiFeaturedImage: string
    brand: string
    category: string
    currency: string
    description: string
    name: string
    price: string
    priceSign: string
    productApiUrl: string
    productID: number
    productLink: string
    productType: string
    rating: number
    tagList: string[]
    websiteLink: string,
    liked: boolean,
}

export default class ProductItem extends React.PureComponent<ProductItemProp, ProductItemState> {

    static defaultProps: {
        itemStyle: ProductItemStyle.large
        data: undefined,
        containerStyle: undefined
        onDoubleTap: undefined
    };

    state: ProductItemState = {
        liked: false,
        clickCount: 0,
    }

    constructor(pros: ProductItemProp) {
        super(pros)
    }

    handlingTap() {
        this.state.clickCount === 1
            ? this.props.onDoubleTap && this.props.onDoubleTap()
            : this.setState(state => ({ clickCount: state.clickCount + 1 }), () => {
                setTimeout(() => {
                    this.setState({ clickCount: 0 })
                }, 500)
            })
    }

    render() {
        let { data, itemStyle, containerStyle, onFavouritePress } = this.props
        return <View style={[styles.container, containerStyle]}>
            <TouchableOpacity activeOpacity={1} style={styles.wrapImage} onPress={this.handlingTap.bind(this)}>
                <ImageView resizeMode={'contain'} style={styles.image} source={{ uri: 'https:' + data.apiFeaturedImage }} />
            </TouchableOpacity>
            <View style={styles.brandWrap}><Text style={styles.brand}>{data.brand}</Text></View>
            <TouchableOpacityEx style={styles.likeButton} onPress={onFavouritePress}>
                <Image style={styles.likeButtonIcon} source={data.liked ? require('lybrid-image/ic_liked.png') : require('lybrid-image/ic_like.png')} />
            </TouchableOpacityEx>
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={2}>{data.name}</Text>
                <View style={styles.row}>
                    <Text style={styles.tag} numberOfLines={2}>{(data.tagList && data.tagList.length > 0) ? data.tagList.join(', ') : 'system.data.empty'.localize()}</Text>
                </View>
                <View style={styles.row}>
                    <Image resizeMode={'contain'} style={styles.icon} source={require('lybrid-image/ic_rating.png')} />
                    <Text style={styles.rate}>{data.rating ?? 'system.data.empty'.localize()}</Text>
                    <Image resizeMode={'contain'} style={styles.icon} source={require('lybrid-image/ic_price.png')} />
                    <Text style={styles.price}>{data.price ?? 'system.data.empty'.localize()}</Text>
                    <Text style={styles.priceSign}>{data.price !== undefined ? data.priceSign : 'system.data.empty'.localize()}</Text>
                </View>
                <View style={styles.row}>
                    <Image resizeMode={'contain'} style={styles.icon} source={require('lybrid-image/ic_infor.png')} />
                    <Text style={styles.categoryAndProductType}>{data.category ?? 'system.data.empty'.localize()}{" - "}{data.productType ?? 'system.data.empty'.localize()}</Text>
                </View>
            </View>
            <View style={styles.wrapButton}>
                <Button mode="outlined" style={styles.viewBrandButton} uppercase={false} labelStyle={styles.viewBrandLabel} onPress={() => { data.websiteLink && Linking.openURL(data.websiteLink) }} >
                    View brand
                </Button>
                <Button mode="contained" style={styles.orderNowButton} uppercase={false} labelStyle={styles.orderNowLabel} onPress={() => { data.productLink && Linking.openURL(data.productLink) }} >
                    Order now
                </Button>
            </View>
        </View>
    }
}