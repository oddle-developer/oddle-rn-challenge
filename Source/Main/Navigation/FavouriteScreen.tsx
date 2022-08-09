import React from 'react';
import { Favourite } from 'lybrid-screen';
import { connect } from "react-redux";
import { ActionCreators } from "lybrid-action";
import { bindActionCreators, Dispatch } from "redux";
import { Constants } from 'lybrid-common'
import { BaseProps } from 'lybrid-screen/Base';
import * as ActionTypes from "lybrid-action/ActionTypes";

class FavouriteScreen extends Favourite {

    static navigationOption: any = {
        headerShown: false,
        gestureEnabled: false
    }

    constructor(props: any) {
        super(props);
        //Navigation Implementation
        this.goBack = () => this.props.navigation.goBack();
        this.goToDetail = () => this.props.navigation.navigate(Constants.Screen.Detail);
        this.goToShop = () => this.props.navigation.navigate(Constants.Screen.Shop);
    }
}

function mapStateToProps({ productReducers }: { productReducers: any }, ownProps: BaseProps) {
    if (productReducers.sender?.route?.key != ownProps?.route?.key && (productReducers.type !== ActionTypes.DO_LIKE_PRODUCT_SUCCESS && productReducers.type !== ActionTypes.DO_UNLIKE_PRODUCT_SUCCESS)) {
        return {};
    }
    return productReducers;
    // return {
    //     index: productReducers.index,
    //     sender: productReducers.sender,
    //     type: productReducers.type,
    //     data: productReducers.data,
    //     isRequesting: productReducers.isRequesting,
    //     message: productReducers.message,
    //     requestUuid: productReducers.requestUuid,
    // };
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: any) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen);