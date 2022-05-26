/*
 * @Author: Jonson 
 * @Date: 2022-05-21 14:06:40 
 * @Last Modified by: Jonson
 * @Last Modified time: 2022-05-25 15:39:53
 */

import React, { useEffect, createRef } from 'react';
import { View, ActivityIndicator, DeviceEventEmitter, BackHandler, ToastAndroid, StatusBar, NativeModules } from 'react-native';
import { AuthLoadingRouter } from './routers/AuthLoading';
import MyLoading from './utils/MyLoading';
import { Provider } from 'mobx-react';
import stores from './stores/RootStore'
import  HotUpdate  from './components/Hotdialog';
import { useScreens, enableScreens } from 'react-native-screens';
import {RootSiblingParent} from 'react-native-root-siblings';
enableScreens(true)
export const drawer = createRef();
const defaultScalingDrawerConfig = {
  scalingFactor: 0.8,
  minimizeFactor: 0.6,
  swipeOffset: 20
};

const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null;
let lastBackPressed: number;



 function index() {


  
  
  useEffect(() => {
    // SplashScreen.hide();

    // DeviceEventEmitter.emit('badgeNumber', 30);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    };
  });

  function onBackButtonPressAndroid() {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  }

  return (
    <Provider {...stores}>
      <View
        style={{
          flex: 1,
          backgroundColor:'transparent'
        }}
      >
          <HotUpdate />
          <RootSiblingParent>
          <AuthLoadingRouter
            // persistenceKey={navigationPersistenceKey}
            // renderLoadingExperimental={() => <ActivityIndicator size="large" color="black" />}
            onNavigationStateChange={(prevState, currentState) => {
              const AppRouter = currentState.routes[1];
              if (AppRouter.routes && AppRouter.routes.length > 1) {
                BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressAndroid);
              } else {
                BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);
              }
            }}
          />
          </RootSiblingParent>
        {<MyLoading
          ref={(ref) => {
            global.mLoadingComponentRef = ref;
          }}
        />}
      </View>
    </Provider>
  );
}
export default index ;