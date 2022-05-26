/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:37:09 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:37:09 
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  SvgIcon, iconPath, GlobalModal, RouteHelper, BaseContainer
} from '../../components'
import AnimatedCircularProgress from '../../components/Progress/AnimatedCircularProgress'
import { ScaleSize, ScaleText, _mkdir, _downloadFile } from '../../utils';
import { inject, observer } from 'mobx-react'
import RNFS from 'react-native-fs';
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs'
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'

@inject()
@observer
export default class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progressFill: 0,
      isFlg: false
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })
  render() {
    return (
      <BaseContainer
        title={'首页'}
        isTopNavigator={true}
        statusBarStyle={'dark-content'}
        // statusBarColor={'#2173E4'}
        style={{ flex: 1, backgroundColor: '#F5F5F5' }}
      >
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            RouteHelper.navigate('TestWebview')
          }}>
          <Text style={{ fontSize: 30 }}>跳转vue</Text>
        </TouchableOpacity>
        <View style={styles.viewStyle}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              const downloadPath = RNFS.DocumentDirectoryPath + "/work"
              const unzipPath = RNFS.DocumentDirectoryPath + "/work/test.zip"
              const charset = 'UTF-8'
              this.setState({ isFlg: true })
              _mkdir(downloadPath, (res) => {
                if (res) {
                  _downloadFile('http://vyungcrmonline.vyung.com:85/api/vue/download', 'work/test.zip', (res) => {
                    console.log(res)
                    if (res) {
                      // // 调用解压函数
                      RNFS.exists(unzipPath)
                        .then(res => {
                          console.log(res)
                          if (res) {
                            unzip(unzipPath, downloadPath, charset)
                              .then((path) => {
                                console.log(`unzip completed at ${path}`)
                                // RouteHelper.navigate('TestWebview')

                              })
                              .catch((error) => {
                                console.error(error)
                                // this.setState({isFlg:false})
                              })
                          }
                        });
                      setTimeout(() => {
                        this.setState({ isFlg: false })
                      }, 1000);

                    }
                  }, (progres) => {
                    console.log(progres)
                    this.setState({ progressFill: progres })
                  })
                }
              })
            }}>
            <Text style={{ fontSize: 30 }}>下载文件</Text>
          </TouchableOpacity>
          {
            !this.state.isFlg ?
              <View style={{ width: 80, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
                <Text onPress={() => { RouteHelper.navigate('TestWebview') }}>打开</Text>
              </View>
              :
              <AnimatedCircularProgress
                size={60}
                width={5}
                fill={this.state.progressFill * 100}
                tintColor="#EF081F"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875" />
          }



        </View>
      </BaseContainer>
    );
  }
}



const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    marginTop: 100
    // backgroundColor: 'black',
    // height: 40
  }
});