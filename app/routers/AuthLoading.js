/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:37:57 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:37:57 
 */

import React, { Component, createRef } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet, Platform, Image, NativeModules, StatusBar, Text, BackHandler, ScrollView } from 'react-native';
import { createSwitchNavigator, createAppContainer, NavigationActions,StackActions } from 'react-navigation';
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { AppRouter } from './AppRouter';
import { AuthRouter } from './AuthRouter';
import BaseContainer from '../components/BaseContainer'
import { ScaleText, ScaleSize, getBool } from '../utils'



type Props = {
  navigation: any
};

// @inject("LoginStore")
// @observer
export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
   

  }




  async componentDidMount() {
    this.pageEnter()
    
  }
  


  _renderAgreement() {
    
  }

  /**
   *
   * 判断是否可以进入登录页或者首页
   * @memberof AuthLoadingScreen
   */
  pageEnter = () => {
    this.props.navigation.navigate('AppRouter')

  }


  render() {
    return (
      <BaseContainer
        isTopNavigator={true}
        statusBarStyle={'dark-content'}
        isNotBackground={false}
        style={{ flex: 1, }}
      >
        {
          // this.pageEnter()
        }
        
      </BaseContainer>
    )
  }
}

export const AuthLoadingRouter = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      AppRouter: AppRouter,
      AuthRouter: AuthRouter,

    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);


const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: ScaleSize(25),
    backgroundColor: '#FFFFFF',
    height: SCREEN_HEIGHT
  },
  title: {
    fontSize: ScaleSize(20),
    textAlign: 'center',
    marginVertical: 20
  },

  desc: {
    color: blackColor,
    fontSize: ScaleSize(14),
    textAlign: 'justify',
    lineHeight: ScaleSize(17)
  },
  buttonWrap: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: ScaleSize(50)
  },
  button: {
    backgroundColor: '#C0C0C0',
    width: SCREEN_WIDTH * 0.8,
    height: ScaleSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ScaleSize(36)
  },
  buttonText: {
    color: 'white',
    fontSize: ScaleSize(16)
  },
  active: {
    backgroundColor: isBtnBgColor
  },
  textStyle:{
    color:'#2173E4'
  }
});
