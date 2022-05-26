/*
 * @Version: 1.0
 * @Autor: Jonson
 * @LastEditors: Seven
 * iPhone X 适配工具类
 */
import { Dimensions,Platform} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
//iphoneXS Max
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
//iphone12MINI
const MINI12_WIDTH = 360;
const MINI12_HEIGHT = 780;
//iphone12
const I12_WIDTH = 390;
const I12_HEIGHT = 844;
//iphone12PROMAX
const I12MAX_WIDTH = 428;
const I12MAX_HEIGHT = 926;

export default class IphoneX {
    static ifIphoneX(iphoneXStyle, iosStyle, androidStyle) {
    
        if (Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT)||(screenH === XSMAX_HEIGHT && screenW === XSMAX_WIDTH)||
            (screenH === I12_HEIGHT && screenW === I12_WIDTH)||(screenH === MINI12_HEIGHT && screenW === MINI12_WIDTH)||
            (screenH === I12MAX_HEIGHT && screenW === I12MAX_WIDTH)
            )) {
            return iphoneXStyle;
        } else if (Platform.OS === 'ios') {
            return iosStyle
        } else {
            if (androidStyle) return androidStyle;
            return iosStyle
        }
      }
}