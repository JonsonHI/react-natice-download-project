
/**
  *
  *
  * @class Root
  * @extends {React.Component}
  * APP入口
  */
import React, { Component,Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import App from './App'
 
 class Root extends React.Component {
    constructor(props){
      super(props)

    }

  
   async componentDidMount() {
    
  

    };
  
    componentWillUnmount() {
  
    };

    //获取view高度
   
  
    render() {
      return (
       <App />

      )
    }
  }

  export default Root
  

