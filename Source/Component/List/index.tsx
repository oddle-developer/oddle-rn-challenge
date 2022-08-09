import React from 'react';
import { Styles } from 'lybrid-common'
import { RefreshControl, Dimensions, ActivityIndicator, View, StyleProp, ViewStyle } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import styles from './style'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

interface ListProps {
    data: any[],
    itemRenderer: (type: string | number, data: any, index: number, extendedState?: object) => JSX.Element | JSX.Element[] | null,
    onLoadMore: () => void | undefined,
    onRefresh: () => void | undefined,
    isRefreshing: boolean | undefined,
    isLoadmore: boolean | undefined,
    onRef: (ref: RecyclerListView<any, any> | null) => void | undefined
    style: StyleProp<ViewStyle> | undefined,
    contentContainerStyle: StyleProp<ViewStyle> | undefined,
    itemHeight: number,
    onScrollEvent: (offsetX: number, offsetY: number) => void | undefined,
}

interface ListState {
    dataProvider: DataProvider
}

export default class List extends React.Component<ListProps, ListState> {

    static defaultProps: {
        data: [],
        itemRenderer: null,
        isRefreshing: false,
        isLoadmore: false,
        onLoadMore: undefined,
        onRefresh: undefined,
        onRef: undefined,
        style: undefined,
        contentContainerStyle: undefined,
        itemHeight: 50,
        onScrollEvent: undefined,
    };

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 120;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 40;
        return contentOffset.y <= 40;
    }

    dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    });

    _layoutProvider: LayoutProvider;

    constructor(props: any) {
        super(props)

        let { width } = Dimensions.get("window");

        this._layoutProvider = new LayoutProvider(
            () => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                dim.width = width;
                dim.height = props.itemHeight;
            }
        );

        this.state = {
            dataProvider: this.dataProvider.cloneWithRows([]),
        }
    }

    componentWillReceiveProps(newProps: ListProps) {
        this.setState({ dataProvider: this.dataProvider.cloneWithRows(newProps.data) })
    }

    render() {
        let { onLoadMore, onRefresh, onScrollEvent, isLoadmore } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <RecyclerListView
                    ref={(ref) => {
                        if (this.props.onRef) {
                            this.props.onRef(ref)
                        }
                    }}
                    style={styles.container}
                    layoutProvider={this._layoutProvider}
                    dataProvider={this.state.dataProvider}
                    rowRenderer={this.props.itemRenderer}
                    extendedState={this.state}
                    contentContainerStyle={[{ backgroundColor: '#fff', paddingVertical: 0 }, this.props.contentContainerStyle]}
                    removeClippedSubviews={false}
                    onScroll={(scrollEvent: ScrollEvent, offsetX: number, offsetY: number) => {
                        onScrollEvent && onScrollEvent(offsetX, offsetY);
                        // if (this.props.onLoadMore && this.isCloseToBottom(scrollEvent.nativeEvent)) {
                        //     this.props.onLoadMore();
                        // }
                        // if (this.props.onTop && this.isCloseToTop(nativeEvent)) {
                        //     this.props.onTop && this.props.onTop(true);
                        // } else {
                        //     this.props.onTop && this.props.onTop(false);
                        // }
                    }}
                    onEndReached={() => { onLoadMore && onLoadMore() }}
                    onEndReachedThreshold={200}
                    // scrollEventThrottle={400}
                    scrollViewProps={{
                        refreshControl: this.props.onRefresh ? (
                            <RefreshControl
                                refreshing={this.props.isRefreshing!}
                                onRefresh={() => this.props.onRefresh && this.props.onRefresh()}
                            />
                        ) : null
                    }}
                    {...this.props}
                />
                {isLoadmore && <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 115,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...Styles.shadowSmall
                    }}>
                        <ActivityIndicator size={'small'} color={'#333'} />
                    </View>
                </View>}
            </View>
        );
    }

}
