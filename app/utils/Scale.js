/*
 * @Author: Jonson 
 * @Date: 2020-03-03 10:19:17 
 * @Last Modified by: Jonson
 * @Last Modified time: 2021-08-04 18:27:51
 */
// import {
//   Dimensions,
//   PixelRatio,
// } from 'react-native';

// // iPhone6 尺寸
// const defaultDevice = {
//   width: 375,
//   height: 667
// }

// // 设备的宽
// const {
//   width: deviceWidth
// } = Dimensions.get('window');

// // 字体大小缩放比例(Android下可设置字体大小)
// let fontScale = PixelRatio.getFontScale();

// // 获取缩放比例
// const scale = deviceWidth / defaultDevice.width;

// /**
//  * 设置text
//  * 如Android设备下不需要根据系统设置做字体缩放，可全面使用ScaleSize
//  * @param {number} size
//  * @returns {number}
//  */
// export const ScaleText = size => {
//   size = Math.round(size * scale * fontScale);
//   return size;
// }

// /**
//  * 设置size
//  * @param {number} size
//  * @returns {number}
//  */
// export const ScaleSize = size => {
//   size = Math.round(size * scale);
//   return size;
// }
// /**
//  * 设置size
//  * @param {number} size
//  * @returns {number}
//  */
// export const ScaleSize = size => {
//   size = Math.round(size * scale);
//   return size;
// }

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

 import {
  Dimensions,
  PixelRatio,
} from 'react-native';


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                           //iphone6的像素密度
//px转换成dp
const w2 = 375 / defaultPixel;
const h2 = 812 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例

/**
* 设置text为sp
* @param size sp
* return number dp
*/
export const ScaleText = size => {
  // let scaleWidth = deviceWidth / w2;
  // let scaleHeight = deviceHeight / h2;
  // let scale = Math.min(scaleWidth, scaleHeight);
  // size = Math.round((size * scale + 0.5));

  // return size / defaultPixel * fontScale;
  return Math.round((size * scale ) / defaultPixel);
}

// export const ScaleText = size => {
//   size = Math.round(size * scale * fontScale);
//   return size;
// }

export const ScaleSize = size =>{

  size = Math.round(size * scale + 2);
  return size / defaultPixel;
}
