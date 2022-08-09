import React from 'react';
import { View } from 'react-native';
import styles from './style'
import Base, { BaseProps, BaseState, UiState } from '../Base'
import * as ActionTypes from "lybrid-action/ActionTypes";
import { Constants, Settings } from 'lybrid-common';
import { Input, Button } from 'lybrid-component';

interface DashboardProps extends BaseProps {
    login: (sender: BaseProps, params: any) => void,
    getProducts: (sender: BaseProps, limit: number, offset: number) => void,
}

interface DashboardState extends BaseState {
    progressVolumn: number,
    progressBrightness: number,
    nickname: string,
}

export default class Dashboard extends Base<DashboardProps,DashboardState> {

    //Navigation Implement
    goToDetail!: ((data: { nickname: string, join: boolean }) => void);

    //State Implement
    state: DashboardState = {
        canBack: false,
        uiState: UiState.Normal,
        progressVolumn: 1,
        progressBrightness: 1,
        nickname: Settings.getDefault<string>(Constants.Store.Username, ''),

    }

    constructor(props: DashboardProps) {
        super(props);
        this.showToolbar = false;
    }

    getTite(): string | undefined {
        return 'screen.detail.title'.localize();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    static getDerivedStateFromProps(props: DashboardProps, state: DashboardState) {
        if (props.type == ActionTypes.GET_PRODUCTS_SUCCESS) {
            return {
                token: props.data
            }
        }
        return {}
    }

    renderView() {
        return <View style={styles.container}>
            {/* <Text style={styles.title}>Dashboard</Text> */}
            <View style={styles.logoWrap}>
            </View>
            <Input
                onFocus={this.scrollToInput.bind(this)}
                onSubmitEditing={() => this.Inputs['login-password']?.focus()}
                ref={ref => this.Inputs['login-nickname'] = ref}
                title={"screen.Dashboard.nickname".localize()}
                inputStyle={styles.input}
                value={this.state.nickname}
                onBlur={() => Settings.set(Constants.Store.Username, this.state.nickname)}
                onChangeText={(nickname: string) => this.setState({ nickname })} />
            <Button title={'screen.Dashboard.submit'.localize()} onPress={() => this.goToDetail({ nickname: '', join: false })} />
        </View>
    }
}
