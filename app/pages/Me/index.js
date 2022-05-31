/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:37:39 
 * @Last Modified by: Jonson
 * @Last Modified time: 2022-05-31 14:01:45
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {
  SvgIcon, iconPath, GlobalModal
} from '../../components'
import { ScaleSize, ScaleText } from '../../utils';
import { inject, observer } from 'mobx-react'
import BaseContainer from '../../components/BaseContainer';
import Contacts from '../../components/AddressBook'
import {Geolocation, stop} from '../../components/AmapLocation'

@inject()
@observer
export default class Me extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })

  async componentDidMount(){
    // if (Platform.OS === "android") {
    //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //     title: "Contacts",
    //     message: "This app would like to view your contacts."
    //   }).then(() => {

    //   });
    // } else {


    
      await Geolocation.getCurrentPosition(({ coords }) => {
        console.log('coords~~~~~~~~~~~~~~~~:',coords)
        stop();
      })
  }
  auth() {
    return new Promise(async (resolve, reject) => {
      const newUser = {
        givenName: 'MyUser',
        phoneNumbers: [{
          label: 'mobile',
          number: '999'
        }],
        // postalAddresses: [{
        //   label: 'custom',
        //   street: 'Anystreet',
        //   country: 'United States'
        // }]
      };
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
            {
              title: '选择您的联系人',
              message: '授权访问您的联系人信息',
              buttonNeutral: "授权访问",
              buttonNegative: "拒绝",
              buttonPositive: "确定"
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           
            // Contacts.addContact(newUser, (err) => {
            //   if (err) {
            //    console.warn(`error: ${err}`);
            //   }
            // })
            Contacts.addContact(newUser).then((contact) => {
              console.log('contact', contact); // Logs the new record that was created
            });
            resolve()
          } else {
            toast('您已拒绝了通讯录的访问权限，请前往设置打开')
            reject()
          }
        } catch (error) {
          toast('权限获取失败')
          reject()
        }
      } else {
        Contacts.addContact(newUser).then((contact) => {
          console.log('contact', contact); // Logs the new record that was created
        });
        resolve()
      }
    })
  }


  render() {
    return (
      <BaseContainer
      title={'个人中心'}
        statusBarStyle={'dark-content'}
        isHiddenNavBar={false}
        isTopNavigator={true}
        // statusBarColor={'#F5F5F5'}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      >
        <View>
          <Text onPress={()=>{
            this.auth()
          }}>个人中心</Text>
          </View>
      </BaseContainer>
    );
  }
}



const styles = StyleSheet.create({
  
});