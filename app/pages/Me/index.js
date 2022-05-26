/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:37:39 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:37:39 
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  SvgIcon, iconPath, GlobalModal
} from '../../components'
import { ScaleSize, ScaleText } from '../../utils';
import { inject, observer } from 'mobx-react'
import BaseContainer from '../../components/BaseContainer';


@inject()
@observer
export default class Me extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })
  render() {
    return (
      <BaseContainer
        statusBarStyle={'dark-content'}
        style={{ marginTop: 0, backgroundColor: '#88CFFB' }}
      >
        <View><Text>个人中心</Text></View>
      </BaseContainer>
    );
  }
}



const styles = StyleSheet.create({
  
});