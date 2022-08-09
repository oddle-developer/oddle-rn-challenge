import React from 'react';
import { Constants, Styles } from 'lybrid-common'

import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

enableScreens();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


import SplashScreen from './Navigation/SplashScreen';
import HomeScreen from './Navigation/HomeScreen';
import ShopScreen from './Navigation/ShopScreen';
import FavouriteScreen from './Navigation/FavouriteScreen';
import DetailScreen from './Navigation/DetailScreen';
import { View, TouchableOpacity, SafeAreaView, Image, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import Style from 'lybrid-common/Style';
import { Text } from 'lybrid-component';

const commonNavigationOption: any = {
  headerShown: false,
  gestureEnabled: false
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#ffffffCC',
    position: 'absolute',
    borderTopColor: '#ebebeb',
    borderTopWidth: 0.5,
    bottom: 0,
    left: 0,
    right: 0
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


const getTabIcon = function (name: string, focused: boolean) {
  switch (name) {
    case Constants.Screen.Home:
      return focused ? require('lybrid-image/ic_dashboard_home_active.png') : require('lybrid-image/ic_dashboard_home.png')
    case Constants.Screen.Shop:
      return focused ? require('lybrid-image/ic_dashboard_shop_active.png') : require('lybrid-image/ic_dashboard_shop.png')
    case Constants.Screen.Favourite:
      return focused ? require('lybrid-image/ic_dashboard_favourite_active.png') : require('lybrid-image/ic_dashboard_favourite.png')
  }
}

const getTabIconStyle = function (name: string, focused: boolean): StyleProp<ImageStyle> {
  switch (name) {
    case Constants.Screen.Home:
      return { width: 30, height: 30, marginTop: 8, marginBottom: 6, resizeMode: 'contain' }
    case Constants.Screen.Shop:
      return { width: 46, height: 46, marginTop: -2, resizeMode: 'contain' }
    case Constants.Screen.Favourite:
      return { width: 30, height: 30, marginTop: 8, marginBottom: 6, resizeMode: 'contain' }
  }
}

const getTabTitle = function (name: string): string {
  switch (name) {
    case Constants.Screen.Home:
      return 'screen.home.title'.localize();
    case Constants.Screen.Shop:
      return 'screen.shop.title'.localize();
    case Constants.Screen.Favourite:
      return 'screen.favourites.title'.localize();
  }
  return '';
}


function CustomTabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
  return (
    <SafeAreaView style={Styles.tabBarContainer}>
      <View style={Styles.tabBarContainerFake} />
      <View style={Styles.tabBarContent} needsOffscreenAlphaCompositing={true}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label = getTabTitle(route.name)

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={Style.tabBarButton}>
              <Image style={getTabIconStyle(route.name, isFocused)} source={getTabIcon(route.name, isFocused)} />
              <Text style={{ color: isFocused ? '#673ab7' : '#222', fontSize: Constants.FontSize.superTiny }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function Home() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name={Constants.Screen.Home} component={HomeScreen} options={commonNavigationOption} />
      <Tab.Screen name={Constants.Screen.Shop} component={ShopScreen} options={commonNavigationOption} />
      <Tab.Screen name={Constants.Screen.Favourite} component={FavouriteScreen} options={commonNavigationOption} />
    </Tab.Navigator>
  );
}

export default <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name={Constants.Screen.Splash} component={SplashScreen} options={commonNavigationOption} />
    <Stack.Screen name={Constants.Screen.Dashboard} component={Home} options={commonNavigationOption} />
    <Stack.Screen name={Constants.Screen.Detail} component={DetailScreen} />
  </Stack.Navigator>
</NavigationContainer>