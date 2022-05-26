/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:36:57 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:36:57 
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  SvgIcon, iconPath, GlobalModal,RouteHelper,BaseContainer
} from '../../components'
import { ScaleSize, ScaleText } from '../../utils';
import { inject, observer } from 'mobx-react'
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';
@inject()
@observer
export default class TestWebview extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })
  render() {
    return (
      <BaseContainer
        title={'VUE'}
        // isTopNavigator={true}
        statusBarStyle={'dark-content'}
        // statusBarColor={'#2173E4'}
        style={{ flex: 1, backgroundColor: '#F5F5F5' }}
      >
        <WebView
          originWhitelist={['*', "file://"]}
          allowFileAccess={true}
          allowingReadAccessToURL={'file://'}
          source={{ uri: `file://${RNFS.DocumentDirectoryPath}/work/index.html` }}
          style={{ flex: 1 }}
        />
      </BaseContainer>
    );
  }
}



const styles = StyleSheet.create({

});