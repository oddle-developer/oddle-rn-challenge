import React from 'react';
import { Animated, View, ActivityIndicator, Text } from 'react-native';
import { Colors } from 'lybrid-common'
import styles from './style'

interface ProgressViewProps {
  title: string | undefined
  visible: boolean
}

interface ProgressViewState {
  fadeAnimation: Animated.Value | undefined
  visible: boolean
}

class ProgressView extends React.PureComponent<ProgressViewProps, ProgressViewState> {
  static defaultProps: {
    title: undefined,
  };

  constructor(props: ProgressViewProps) {
    super(props);
    this.state = {
      fadeAnimation: new Animated.Value(0),
      visible: false
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps: Readonly<ProgressViewProps>, prevState: Readonly<ProgressViewState>) {
    if (prevProps.visible != this.props.visible) {
      if (this.props.visible) {
        this.setState({ visible: true });
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }

  fadeIn = () => {
    this.setState({ visible: true })
    Animated.timing(this.state.fadeAnimation!, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnimation!, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false
    }).start(()=>{
      this.setState({ visible: false });
    });
  };

  render() {
    let { title } = this.props;
    if (this.state.visible) {
      return (
        <Animated.View style={[styles.container, {
          opacity: this.state.fadeAnimation
        }]}>
          <View style={styles.box}>
            <ActivityIndicator size="large" color={Colors.ProgressColor} />
            {title && <Text style={styles.label}>{title}</Text>}
          </View>
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}


export default ProgressView;
