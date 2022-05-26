/*
 * @Descripttion: 模块
 * @Author: pliybird
 * @Date: 2020-06-12 15:20:31
 * @LastEditors: pliybird
 * @LastEditTime: 2021-08-03 17:40:25
 */ 
// NavigationBackButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, Image} from 'react-native';

import {Theme}from '../Theme/Theme';
import NavigationButton from './NavigationButton';

import {
  SvgIcon, iconPath, LHTPopover
} from '../../components'
import { ScaleSize } from '../../utils';
export default class NavigationBackButton extends NavigationButton {

  static propTypes = {
    ...NavigationButton.propTypes,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.any,
  };

  static defaultProps = {
    ...NavigationButton.defaultProps,
    title:'', // 默认定义返回文字
    icon: iconPath.GlobalBack, // 默认返回icon
  };

  buildStyle() {
    return super.buildStyle().concat({paddingLeft: 0, paddingTop: 8, paddingBottom: 8});
  }

  renderTitle() {
    let {title, icon} = this.props;

    let textStyle = {
      color: this.context.tintColor,
      fontSize: 15,
      overflow: 'hidden',
    };
    let iconStyle = {
      tintColor: this.context.tintColor,
      width: 25,
      height: 15,
    };
    let elements = [
      <SvgIcon key={'icon'} path={icon} fill={['#333333']} size={ScaleSize(16)} style={iconStyle}/>,
      <Text key={'title'} style={textStyle} numberOfLines={1} allowFontScaling={false}>{title}</Text>,
    ];

    return elements;
  }

}

