/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:40:50 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:40:50 
 */


import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import {
  SvgIcon, iconPath, RouteHelper
} from '../../components'
const { width, height } = Dimensions.get('window');
// import { NavigationBar, Theme } from 'teaset';
import NavigationBar from '../NavigationBar/NavigationBar';
import Theme from '../Theme/Theme';
import { ScaleSize, ScaleText } from '../../utils';
// import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';

export type Props = {
  leftView?: any,
  backButtonPress?: any,
  isTopNavigator?: ?boolean,
  isNotBackground?: boolean,
  background?: any,
  statusBarStyle?:any,
  ...NavigationBar.props
};


class NavigatorBar extends React.PureComponent<Props> {
  static defaultProps = {
    isTopNavigator: false,
    isNotBackground: false,
    statusBarStyle:'dark-content'
  };

  constructor(props: Props) {
    super(props);
  }

  backButtonPress = () => {
    const { backButtonPress } = this.props;
    if (backButtonPress) {
      backButtonPress();
    } else {
      if(this.props.navigation.state.routeName == "Appeal" ){
        console.log(tokenVal,"是否有token",this.props.navigation.state.routeName);
        if(!tokenVal){
          RouteHelper.navigate('Login')
          return
        }
      }
      this.props.navigation.goBack();
    }
  };

  renderLeftView = () => {
    const { isTopNavigator, leftView ,leftButtonTitle,leftButtonIcon} = this.props;
    let left;
    if (isTopNavigator || leftView) {
      left = leftView;
    } else {
      left = <NavigationBar.BackButton  title={leftButtonTitle} icon={leftButtonIcon} onPress={this.backButtonPress} />;
    }
    return left;
  };

  render() {
    return (
      <NavigationBar
        leftView={this.renderLeftView()}
        background={
          this.props.isNotBackground ? (
            // <LinearGradient
            //   start={{ x: 0.0, y: 0.25 }}
            //   end={{ x: 0.5, y: 1.0 }}
            //   locations={[0, 1]}
            //   // colors={['rgb(13,199,255)', 'rgb(16,174,255)']}
            //   colors={['white', 'white']}
            //   style={{
            //     height: Theme.statusBarHeight + Theme.navBarContentHeight,
            //     borderBottomColor:'black',
            //     borderBottomWidth:1
            //   }}
            // >
            // </LinearGradient>
            <View style={{height:Theme.statusBarHeight + Theme.navBarContentHeight,width:width,
              backgroundColor:isNotBackground}}/>
          ) : (
            <View style={{height:Theme.statusBarHeight + Theme.navBarContentHeight,width:width,
              backgroundColor:'white',}}>
                {this.props.background}
              </View>
            
          )
        }
        titleStyle={{
          fontSize: ScaleSize(16),
          color: '#272A33',
          // fontWeight: 'bold'
        }}
        tintColor={Theme.tabBarColor}
        statusBarStyle={this.props.statusBarStyle}//'dark-content'
        // statusBarColor={'dark'}
        {...this.props}
      />
    );
  }
}

export default withNavigation(NavigatorBar);

