/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:38:06 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:38:06 
 */

import React from 'react';
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';
// import Live from '../pages/Home/Live'
import {
  SvgIcon, iconPath, configRoute
} from '../components'

import Message from '../pages/Message'

export const AuthRouter = createNativeStackNavigator(
  configRoute(
    {
      Message:{
        screen:Message
      }
      
    },
  ),
  {
    defaultNavigationOptions: () => ({
      header: null,
      gesturesEnabled: true
    }),
    // headerTransitionPreset: 'fade-in-place',
    // headerMode: 'float',
    mode: 'modal'
  }
);
