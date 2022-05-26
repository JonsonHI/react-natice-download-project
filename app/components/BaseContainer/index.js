/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:41:33 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:41:33 
 */

import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar, Platform} from 'react-native';

import { observer } from 'mobx-react';
import { NavigationEvents } from 'react-navigation';
// import NetInfo from '@react-native-community/netinfo';

// import { NavigatorBar, LoadingSpinner, ErrorView } from '../index';
import NavigatorBar from '../NavigatorBar'
// import LoadingSpinner from '../LoadingSpinner'
import ErrorView from '../ErrorView'
// import { Theme } from 'teaset';
import  Theme from '../../components/Theme/Theme';
// import {setStatusBar} from '../StatusBar'
import {ConfigStore} from '../../stores/ConfigStore'

type Props = {
  store?: Object, // 页面中的mobx状态
  onErrorPress?: Function, // 出错页面的点击事件
  navBar?: any, // 导航条
  children?: any,
  statusBarStyle?: string,

  style?: any, // 外层View样式
  navStyle?: any, // 导航条样式
  contentViewStyle?: any, // 包裹层View样式

  isTopNavigator?: boolean, // 是否是顶层页面,显示返回按钮  true false
  isHiddenNavBar?: boolean,  //是否隐藏  navbar

  errorTitle?: string, //  错误页文本
  imageSource?: string, // 错误页图片
  errorStyle?: string, // 错误View样式

  bottomStyle?: any,
  bottomBackgroundColor?: string,
  bottomHeight?: number,

  onWillFocus?: Function,
  onDidFocus?: Function,
  onWillBlur?: Function,
  onDidBlur?: Function,

  // netInfoCallBack?: (network: NetType) => void, // 网络监听回调

  ...NavigatorBar.Props
};

export type NetType = {
  isConnect: boolean, // 是否连接网络
  isWifi: boolean, // 是否是wifi连接
  isCellular: boolean // 是否是流量连接
};

// type State = {
//   netInfo: NetType // 网络状态
// };

// @setStatusBar({
//   barStyle: 'dark-content',
//   translucent: true,
//   backgroundColor: 'transparent'
// })

@observer
export default class BaseContainer extends React.Component<props,State> {
  // netInfoListen: any;
  constructor(props) {
    super(props);
    this.setStatusBar()
    this.state = {
        
      };

}
 
  componentWillUnmount() {
    // this.netInfoListen && NetInfo.removeEventListener('connectionChange', this.networkHandle);
  }

  componentDidMount = async () => {
    // // 添加网络获取判断
    // NetInfo.getConnectionInfo().then(this.networkHandle);
    // // 添加网络监听
    // if (this.netInfoListen) {
    //   NetInfo.removeEventListener('connectionChange', this.networkHandle);
    // } else {
    //   this.netInfoListen = NetInfo.addEventListener('connectionChange', this.networkHandle);
    // }
    
  };
  setStatusBar(){
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setTranslucent(true)
    Platform.OS === 'android' && StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  }
  // networkHandle = (netInfo: NetType) => {
  //   const { netInfoCallBack } = this.props;
  //   const network: NetType = this.getNetInfoStatus(netInfo);

  //   // alert(JSON.stringify(network))
  //   const { store } = this.props;
  //   console.log(store)
  //   if(store){
  //     store.isConnect = network.isConnect
  //   }
    
  //   // store && store.setNetInfo(network);
  //   netInfoCallBack && netInfoCallBack(network);
  // };

  // getNetInfoStatus = (netInfo: any) => {
  //   const type: string = netInfo.type;
  //   return {
  //     isConnect: type.toUpperCase() === 'WIFI' || type.toUpperCase() === 'CELLULAR',
  //     isWifi: type.toUpperCase() === 'WIFI',
  //     isCellular: type.toUpperCase() === 'CELLULAR'
  //   };
  // };

  renderContent() {
    const { store, children, onErrorPress, errorTitle, imageSource, errorStyle } = this.props;
    // if (!store) return children;
    const { isLoading, isError, errorInfo,isConnect } = ConfigStore;
    // console.log(store);
    if (isLoading) {
      // if (store.loadingType === 'page') {
        // return <LoadingSpinner isVisible={store.isLoading} />;
      // } else {
        return (
          <View style={{ flex: 1 }}>
            {children}
            {/* <LoadingSpinner isVisible={store.isLoading} /> */}
          </View>
        );
      // }
      // return(
        // MToast.show(toastOpts = {
        //   data: 'Loading',
        //   textFont: 14,
        //   textColor: '#ffffff',
        //   backgroundColor: '#DEDEDD',
        //   position: MToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
        //   icon: <ActivityIndicator color='#fff' size={'large'}/>
        // })
      
      // )
    }
    if (isError)
      return (
        <ErrorView
          errorStyle={errorStyle}
          imageSource={imageSource}
          title={errorInfo.message}
          onErrorPress={onErrorPress}
        />
      );
    return children;
  }

  renderNavView() {
    const { navBar, isTopNavigator, navStyle,statusBarStyle, ...navProps} = this.props;
    let navView = null;
    if (typeof navBar === 'undefined') {
      navView = <NavigatorBar {...navProps} style={navStyle} isTopNavigator={isTopNavigator} statusBarStyle={statusBarStyle}/>;
    } else {
      navView = navBar;
    }
    return navView;
  }

  renderBottom() {
    const { bottomStyle, bottomBackgroundColor, bottomHeight = 39, isTopNavigator,isBottomHeight } = this.props;

    const backgroundColor = bottomBackgroundColor ? bottomBackgroundColor : 'white';
    const height = isBottomHeight && Theme.isIPhoneX ? bottomHeight : 0;
    return <View style={[{ height, backgroundColor }, bottomStyle]} />;
  }

  render() {
    const {
      style,
      contentViewStyle,
      isTopNavigator,
      isHiddenNavBar,
      onWillFocus,
      onDidFocus,
      onWillBlur,
      onDidBlur,
      navBar
    } = this.props;

    const backgroundColor = !isTopNavigator && Theme.isIPhoneX ? 'white' : null;
    const marginTop = !isHiddenNavBar ? Theme.statusBarHeight + Theme.navBarContentHeight : 0;

    return (
      <View style={[styles.container, style]}>
        {
          // navBar ? 
          // this.renderNavView()
          // :!isHiddenNavBar && this.renderNavView()
          isHiddenNavBar ?
          null
          :
          this.renderNavView()
          // !isHiddenNavBar && this.renderNavView()
        }
        <View style={[styles.contentView, { marginTop, backgroundColor }, style, contentViewStyle]}>
          {this.renderContent()}
          {this.renderBottom()}
        </View>
        <NavigationEvents
          onWillFocus={onWillFocus}
          onDidFocus={onDidFocus}
          onWillBlur={onWillBlur}
          onDidBlur={onDidBlur}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flex: 1,
  }
});


