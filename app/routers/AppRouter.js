/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:37:50 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:37:50 
 */


import React, {
  Component
} from 'react';
import {
  Platform,
  Text,
  PixelRatio
} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import {
  createDrawerNavigator
} from 'react-navigation-drawer';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
  TransitionPresets
} from "react-navigation-stack";
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';


import {
  SvgIcon,
  iconPath,
  configRoute
} from '../components'
import {
  ScaleText,
  ScaleSize
} from '../utils'

import Message from '../pages/Message' //消息中心
import Application from '../pages/Application' //消息中心
import Me from '../pages/Me' //消息中心
import TestWebview from '../pages/Message/TestWebview' //消息中心



const MyTab = createBottomTabNavigator({
  Message: {
    screen: Message,
    navigationOptions: {
      tabBarLabel: '首页',
      // tabBarIcon: ({
      //   tintColor,
      //   focused
      // }) => (
      //   focused ?
      //     <SvgIcon path={
      //       iconPath.homeTabbar
      //     }
      //       fill={
      //         [isBtnBgColor, isBtnBgColor, '#FFFFFF']
      //       }
      //       size={
      //         35
      //       }
      //     /> :
      //     <SvgIcon path={
      //         iconPath.homeTabbarNot
      //       }
      //       fill={
      //         ['#CCCCCC', '#999999', '#999999']
      //       }
      //       size={
      //         35
      //       }
      //     />
      // ),
    }
  },
  Application: {
    screen: Application,
    navigationOptions: {
      tabBarLabel: '项目',
      labelStyle: {
        fontSize: 1,
        margin: 1
      },
      // tabBarIcon: ({
      //   tintColor,
      //   focused
      // }) => (
      //   focused ?
      //     <SvgIcon path={
      //       iconPath.homeProject
      //     }
      //       fill={
      //         [isBtnBgColor, '#FFFFFF', '#FFFFFF', '#FFFFFF']
      //       }
      //       size={
      //         35
      //       }
      //     /> :
      //     <
      //       SvgIcon path={
      //         iconPath.homeProjectNot
      //       }
      //       fill={
      //         ['#D0D0D0', '#999999', '#FFFFFF', '#999999']
      //       }
      //       size={
      //         35
      //       }
      //     />
      // ),
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: '我的',
      // tabBarIcon: ({
      //   tintColor,
      //   focused
      // }) => (
      //   focused ?
      //     <SvgIcon path={
      //       iconPath.homeMe
      //     }
      //       fill={
      //         [isBtnBgColor, '#FFFFFF', isBtnBgColor, '#FFFFFF']
      //       }
      //       size={
      //         35
      //       }
      //     /> :
      //     <
      //       SvgIcon path={
      //         iconPath.homeMeNot
      //       }
      //       fill={
      //         ['#999999', '#FFFFFF', '#999999', '#D0D0D0']
      //       }
      //       size={
      //         35
      //       }
      //     />
      // ),
    }
  },

}, {
  initialRouteName: 'Message',
  backBehavior: 'none',
  // lazy: false,
  defaultNavigationOptions: ({
    navigation
  }) => ({
    tabBarOnPress: ({
      navigation,
      defaultHandler
    }) => {
      defaultHandler()
      //处理 权限跳转问题
    },
  }),
  navigationOptions: ({
    navigation
  }) => NavigationOptions(navigation),
  tabBarOptions: {
    tabStyle: {
      marginTop: 5,
    },
    upperCaseLabel: false,
    style: { borderTopWidth: 0 },
    // labelStyle:{
    //   fontSize:14/PixelRatio.getFontScale()
    // },
    safeAreaInset: {
      bottom: 'always',
      top: 'never'
    },
    allowFontScaling: false,
    showLabel: true,

  }
});

MyTab.navigationOptions = ({
  navigation
}) => {
  global.nav = navigation
  const routes = navigation.state.routes;
  const params = routes ? routes[navigation.state.index].params : null;

  const headerTitle = params ? params.title : '';

  const headerTitleStyle = {
    fontSize: iOS ? 23 : 20,
    color: 'white',
    flex: 1,
    textAlign: 'center',
    paddingTop: Android ? 23 : null,
  };
  const headerBackTitle = null;
  const headerTintColor = 'white';
  const headerStyle = {
    backgroundColor: 'blue',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    elevation: 0,
  };

  // 这里的导航都是手动控制的，所以这里设置为null就可以隐藏了。
  const header = null;

  return {
    headerTitle,
    headerStyle,
    headerTitleStyle,
    headerBackTitle,
    headerTintColor,
    header,
  };
};

export const AppRouter = createNativeStackNavigator(
  configRoute({
    MyTab: {
      screen: MyTab,
    },
    Message:{
      screen:Message
    },
    TestWebview:{
      screen:TestWebview
    }
    


  }), {
  // 快速定制导航条，所有的导航都是重写的，所以这里会将全部的导航置空
  // initialRouteName: 'TabNavigator',
  defaultNavigationOptions: () => ({
    // headerStyle: {
    //   ...Platform.OS === 'android' && {
    //     height: StatusBar.currentHeight + 44,
    //     paddingTop: StatusBar.currentHeight
    //   }
    // },
    headerShown: false,
    header: null,
    // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    // gesturesEnabled: true,
    // headerTransparent: false
    stackAnimation: Android ? 'slide_from_right' : null,
    // stackPresentation:'push'
  }),
  // stackPresentation:'push'

  // transitionConfig: iOS
  //   ? dynamicModalTransition
  //   : () => ({
  //     screenInterpolator: CardStyleInterpolators.forHorizontal
  //   }),

  //   transitionConfig: () => ({
  //     screenInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid, // 设置转场动画
  // }),
  // transitionConfig:TransitionConfiguration,
  //transitionConfig: iOS ? dynamicModalTransition : StackViewStyleInterpolator.forHorizontal,
  // transitionConfig: StackViewStyleInterpolator.forVertical,
  // cardOverlayEnabled: false,
  // transparentCard: true,
  // headerTransitionPreset: 'fade-in-place',
  // headerMode: 'float',
  // mode: 'containedModal'
}
);
