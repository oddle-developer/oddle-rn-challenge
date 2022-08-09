import React from 'react';
import { View, Text, Image } from 'react-native';
import { CommonActions, ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './style'
import Base, { BaseProps, BaseState, UiState } from '../Base'
import { Settings } from 'lybrid-common';

interface SplashProps extends BaseProps {
}

interface SplashState extends BaseState {
}

export default class Splash extends Base<SplashProps, SplashState> {
    //Navigation Implement
    goToLogin!: (() => void);

    //State Implement
    state: SplashState = {
        type: undefined,
        canBack: false,
        uiState: UiState.Normal,
    }

    constructor(props: any) {
        super(props);
        this.showToolbar = false;
        this.enableKeyboardAware = false;
    }

    getTite(): string | undefined {
        return ''
    }

    componentDidMount() {
        super.componentDidMount();
        Settings.load(() => {
            setTimeout(() => {
                this.goToDashboard();
            }, 1000);
        });
    }

    renderView() {
        return <View style={styles.container}>
            <Image source={require('lybrid-image/logo_oddle.png')} />
            {/* <Text>Loading...</Text> */}
        </View>
    }
}