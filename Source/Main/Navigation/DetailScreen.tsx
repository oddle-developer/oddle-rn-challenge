import React from 'react';
import { Detail } from 'lybrid-screen';
import { connect } from "react-redux";
import { ActionCreators } from "lybrid-action";
import { bindActionCreators, Dispatch } from "redux";
import { Constants } from 'lybrid-common'
import { BaseProps } from 'lybrid-screen/Base';

class DetailScreen extends Detail {

    static navigationOption: any = {
        headerShown: false,
        gestureEnabled: false
    }

    constructor(props: any) {
        super(props);
        //Navigation Implementation
        this.goBack = () => this.props.navigation.goBack();
    }
}

function mapStateToProps({ productReducers }: { productReducers: any }, ownProps: BaseProps) {
    if (productReducers.sender?.route?.key != ownProps?.route?.key) {
        return {};
    }
    return {
        index: productReducers.index,
        sender: productReducers.sender,
        type: productReducers.type,
        data: productReducers.data,
        isRequesting: productReducers.isRequesting,
        message: productReducers.message,
        requestUuid: productReducers.requestUuid,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: any) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);