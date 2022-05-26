/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:37:39 
 * @Last Modified by: Jonson
 * @Last Modified time: 2022-05-26 14:54:32
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
import Contacts from '../../components/AddressBook'


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
      title={'个人中心'}
        statusBarStyle={'dark-content'}
        isHiddenNavBar={false}
        isTopNavigator={true}
        // statusBarColor={'#F5F5F5'}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      >
        <View>
          <Text onPress={()=>{
            Contacts.openContactForm({}).then(contact => {
              console.log(contact)
            })
          }}>个人中心</Text>
          </View>
      </BaseContainer>
    );
  }
}



const styles = StyleSheet.create({
  
});