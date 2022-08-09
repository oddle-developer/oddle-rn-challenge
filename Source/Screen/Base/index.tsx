import React, { LegacyRef, ReactInstance, Ref } from 'react';
import { View, KeyboardAvoidingView, ScrollView, findNodeHandle, NativeSyntheticEvent, TextInputFocusEventData, StatusBar } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert, Utils } from 'lybrid-common';
import { ProgressView, ToolBar, Input } from 'lybrid-component';
import styles from './style'

export enum UiState {
    New = 1,
    Loading,
    Error,
    Normal,
}

export interface BaseProps<V extends object | undefined = object | undefined> {
    navigation: NativeStackNavigationProp<Record<string, V>>,
    route: RouteProp<Record<string, V>>,
    sender: BaseProps,
    index: number,
    type: string,
    data: any,
    request: any,
    isRequesting: boolean,
    message: string,
}

export interface BaseState {
    type: string | undefined,
    canBack: boolean | undefined,
    uiState: UiState | undefined
}


export default class Base<T extends BaseProps<V>, S, V extends object | undefined = object | undefined> extends React.Component<T> {

    //Navigation Declair
    goBack!: (() => void);
    goToDashboard!: (() => void);
    didBlurSubscription: any | undefined;

    //Base Variable
    screenUUID: string;
    showToolbar: boolean = true;
    showProgress: boolean = true;
    enableKeyboardAware: boolean = true;
    scroll: KeyboardAwareScrollView | undefined | null;
    keyboardMargin: number = 100;
    Inputs: {
        [key: string]: Input | null
    } = {};

    constructor(props: any) {
        super(props);
        this.screenUUID = Utils.randomUUID();
        this.state = {
            type: undefined,
            uiState: UiState.New,
            canBack: true,
        }!;
        // this.Inputs = {}
    }

    state: BaseState = {
        type: undefined,
        uiState: UiState.New,
        canBack: false
    }

    getParam() {

    }

    onBlur() {

    }

    componentDidMount() {
        this.didBlurSubscription = this.props.navigation.addListener('focus', payload => {
            this.onBlur()
        });
    }

    componentWillUnmount() {
        if (this.didBlurSubscription && this.didBlurSubscription.remove) {
            this.didBlurSubscription.remove();
        }
    }

    renderToolbarContainer() {
        return <View style={styles.toolbarContainer}>
            {this.renderToolbar()}
        </View>
    }

    renderToolbar() {
        return <ToolBar onPressLeft={this.goBack.bind(this)} back={this.state.canBack} title={this.getTite()} />
    }

    getTite(): string | undefined {
        throw new Error('Method not implemented.');
    }

    scrollToInput(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        if (this.scroll && this.scroll.scrollToFocusedInput) {
            let targetObj = findNodeHandle(event.target);
            if (targetObj) {
                this.scroll.scrollToFocusedInput(targetObj)
            }
        }
    }

    render() {
        if (this.enableKeyboardAware) {
            return <View style={styles.container}>
                <StatusBar barStyle={"dark-content"} backgroundColor={'white'} />
                {this.showToolbar && this.renderToolbarContainer()}
                <KeyboardAwareScrollView
                    ref={(ref) => {
                        this.scroll = ref;
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                    enableResetScrollToCoords={true}
                    extraHeight={this.keyboardMargin}>
                    {this.renderState()!}
                </KeyboardAwareScrollView>
                <ProgressView visible={this.props.isRequesting} />
            </View>
        } else {
            return <View style={styles.container}>
                <StatusBar barStyle={"dark-content"} backgroundColor={'white'} />
                {this.showToolbar && this.renderToolbarContainer()}
                {this.renderState()!}
                {this.showProgress && <ProgressView visible={this.props.isRequesting} />}
            </View>
        }
    }

    renderState() {
        switch (this.state.uiState) {
            case UiState.New:
                return this.renderNew();
            case UiState.Loading:
                return this.renderLoading();
            case UiState.Error:
                return this.renderError();
            default:
                return this.renderView();
        }
    }

    renderNew() {
    }

    renderLoading() {
    }

    renderError() {
    }

    renderView() {
    }

    showMessage(message: string) {
        Alert('', message);
    }
    showMessageConfirm(message: string, action: () => void) {
        Alert('', (message == undefined || message.length == 0) ? 'system.server.internal.error'.localize() : message, "system.error.tryagain".localize(), action);
    }
}