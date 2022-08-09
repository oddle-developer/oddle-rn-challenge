import React from 'react';
import { View, Image, ImageResizeMode, ViewStyle, StyleProp } from 'react-native';
import styles from './style'
import { Colors, Logging } from 'lybrid-common'
import AutoHeightImage from 'react-native-auto-height-image';
import { ActivityIndicator } from 'react-native-paper';
import FastImage, { ResizeMode } from 'react-native-fast-image'
import Global from 'lybrid-global';

interface ImageViewProp {
    style: StyleProp<ViewStyle> | undefined,
    source: any | undefined;
    width: number | undefined
    useReactImage: boolean | undefined
    resizeMode: ImageResizeMode | ResizeMode | any | undefined
    defaultImage: any | undefined
    base64: string | undefined
}

interface ImageViewState {
    loading: boolean,
    error: boolean,
    uri: string | undefined,
    base64: string | undefined,
    show: boolean,
}

export default class ImageView extends React.Component<ImageViewProp, ImageViewState> {

    static defaultProps = {
        style: undefined,
        source: undefined,
        width: undefined,
        useReactImage: undefined,
        resizeMode: undefined,
        defaultImage: undefined,
        base64: undefined,
    }

    state: ImageViewState = {
        loading: true,
        error: false,
        uri: undefined,
        base64: undefined,
        show: true,
    }

    tryCount: number = 0;

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return Global.connected
    }

    componentDidMount() {
        this.checkProps(this.props)
        this.tryCount = 0;
    }


    async checkProps(nextProps: any) {
        if (!this.props.source) {
            this.setState({
                loading: false,
                error: true,
            });
            return
        }

        if (nextProps.source != this.props.source || nextProps.source?.uri != this.props.source?.uri) {
            this.tryCount = 0;
            this.setState({
                loading: true,
                error: false,
                show: false
            }, () => this.setState({ show: true }));
        }

        // if (this.props.base64 && this.state.base64 == null) {
        //     try {
        //         resp = await RNFetchBlob.config({
        //             fileCache: true
        //         }).fetch("GET", this.props.source.uri);
        //         imagePath = resp.path();
        //         base64Data = await resp.readFile("base64");
        //         this.setState({ base64: `data:image/jpeg;base64,${base64Data}`, loading: false, error: false })
        //         await RNFetchBlob.fs.unlink(imagePath);
        //     }
        //     catch (error) {
        //         this.setState({ error: true, loading: false })
        //     };
        // }
    }

    render() {
        if (this.props.base64) {
            return this.render64()
        } else {
            return this.renderNormal()
        }
    }

    render64() {
        return (
            <View style={[this.props.style, { minHeight: 20 }]}>
                {this.state.loading && <View style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}>
                    <ActivityIndicator size="small" color={Colors.LoadingColor} />
                </View>}
                {!this.state.error && !this.state.loading && <FastImage
                    {...this.props}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{ uri: this.state.base64 }}
                    onError={() => { this.setState({ loading: false, error: true }) }}
                    onLoadEnd={() => { this.setState({ loading: false }) }} />}
                {this.state.error && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={[{ tintColor: '#ccc', resizeMode: 'contain', width: 30, height: 30 }]}
                        source={require('lybrid-image/ic_image_notfound.png')} />
                </View>}
            </View>
        );
    }

    renderNormal() {
        const { width, useReactImage, resizeMode, defaultImage } = this.props;
        if (width) {
            return (
                <View style={[this.props.style, { minHeight: 40 }]}>
                    {this.state.loading && <View style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}>
                        <ActivityIndicator size="small" color={Colors.LoadingColor} />
                    </View>}
                    {!this.state.error && <AutoHeightImage
                        {...this.props}
                        onError={() => { this.setState({ loading: false, error: true }) }}
                        onLoadEnd={() => { this.setState({ loading: false }) }} />}
                    {this.state.error && !defaultImage && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[{ tintColor: '#ccc', resizeMode, width: 30, height: 30 }]}
                            source={require('lybrid-image/ic_image_notfound.png')} />
                    </View>}
                    {this.state.error && defaultImage && <AutoHeightImage
                        {...this.props}
                        source={defaultImage}
                        onError={() => { this.setState({ loading: false, error: true }) }}
                        onLoadEnd={() => { this.setState({ loading: false }) }} />}
                </View>
            );
        } else if (useReactImage == undefined || useReactImage == false) {
            return (
                <View style={[this.props.style, { minHeight: 20 }]}>
                    {this.state.loading && <View style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}>
                        <ActivityIndicator size="small" color={Colors.LoadingColor} />
                    </View>}
                    {!this.state.error && this.state.show && <FastImage
                        {...this.props}
                        resizeMode={resizeMode}
                        // onLoadStart={() => { Logging.log("load image " + (this.props.source?.uri ?? "")) }}
                        onError={() => {
                            if (this.tryCount > 5) {
                                this.setState({ loading: false, error: true });
                            } else {
                                this.setState({ loading: true, show: false }, () => {
                                    setTimeout(() => {
                                        this.setState({ loading: true, show: true });
                                    }, 1000);
                                })
                            }
                            this.tryCount += 1;
                        }}
                        onLoadEnd={() => { this.setState({ loading: false }) }} />}
                    {this.state.error && !defaultImage && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[{ tintColor: '#ccc', resizeMode, width: 30, height: 30 }]}
                            source={require('lybrid-image/ic_image_notfound.png')} />
                    </View>}
                    {this.state.error && defaultImage && <FastImage
                        {...this.props}
                        source={defaultImage}
                        resizeMode={resizeMode}
                        onError={() => { this.setState({ loading: false, error: true }) }}
                        onLoadEnd={() => { this.setState({ loading: false }) }} />}
                </View>
            );
        } else {
            return (
                <View style={[this.props.style, { minHeight: 20 }]}>
                    {this.state.loading && <View style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0
                    }}>
                        <ActivityIndicator size="small" color={Colors.LoadingColor} />
                    </View>}
                    {!this.state.error && <Image
                        {...this.props}
                        onError={() => { this.setState({ loading: false, error: true }) }}
                        onLoadEnd={() => { this.setState({ loading: false }) }} />}
                    {this.state.error && !defaultImage && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[{ tintColor: '#ccc', resizeMode: 'contain', width: 30, height: 30 }]}
                            source={require('lybrid-image/ic_image_notfound.png')} />
                    </View>}
                    {this.state.error && defaultImage && <Image
                        {...this.props}
                        source={defaultImage}
                        onError={() => { this.setState({ loading: false, error: true }) }}
                        onLoadEnd={() => { this.setState({ loading: false }) }} />}
                </View>
            );
        }

    }
}