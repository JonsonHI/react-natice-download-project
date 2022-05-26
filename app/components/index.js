/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:41:38 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:41:38 
 */

import { SvgIcon, iconPath } from './svgIcon'
import BaseContainer from './BaseContainer'
import { configRoute } from './NavigationHelp/addToRouteStack'
import { RouteHelper } from './NavigationHelp/RouteHelper'
import IsIphonex from './IsIphonex'
import Popover from './Popover';
// import LHTImagePlaceholder from './LHTImagePlaceholder' //弹窗
/**
|--------------------------------------------------
| 象乐成长v0.2
|--------------------------------------------------
*/

export {
    BaseContainer,//导航头
    SvgIcon,//  SVG图片加载
    iconPath,//Svg路径
    RouteHelper,//路由跳转
    IsIphonex,//判断机型
    Popover,//箭头弹窗
    // LHTImagePlaceholder,//默认图片
    configRoute
};