
/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:39:45 
 * 一些常用的文字 颜色 通用修改类
 * @Last Modified by: Jonson
 * @Last Modified time: 2022-05-21 15:40:00
 */

import { Dimensions, PixelRatio, Platform } from 'react-native';
// import DeviceInfo , { getUniqueId } from 'react-native-device-info';
// import { FontSize } from './FontSize';
// import { Px2Dp } from './Tool';

const { height, width } = Dimensions.get('window');

import Theme from '../components/Theme/Theme'

// import { Theme } from 'teaset';

//全局Theme
global.Theme = Theme
// 系统是iOS
global.iOS = Platform.OS === 'ios';
// 系统是安卓
global.Android = Platform.OS === 'android';
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取顶部状态栏高度
global.STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : Theme.statusBarHeight;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;
// 适配字体
// global.FONT_SIZE = FontSize;
// 屏幕适配
// global.px2dp = Px2Dp;
// ApiConfig
// global.ApiConfig = ApiConfig;
//画布背景色
global.isNotBackground = '#F5F5F5'
//项目主色 应用场景：强调色，页面主 button等
global.isBtnBgColor = '#2173E4'
global.isBackgroundColor = '#FFFFFF'

// global.Config = Config;
// global.isIPhoneX = Theme.isIPhoneX;

// global.Theme = Theme;

//toast提示背景颜色
global.toastBacKColor = '#333'
//toast 字体色
global.toastTextColor = '#ffffff'
//toast 图片大小
global.toastImgSize = 40
//loading 背景色
global.LoadingColor = '#DEDEDD'

// 全局黑色
global.blackColor = '#000000'
// 标题文字灰色
global.gray = '#333333'
//一级灰色
global.grayColor = '#666666'
//二级灰色
global.subGrayColor = '#999999'


/**
|--------------------------------------------------
| 获取设备信息
|--------------------------------------------------
*/
// // 获取APP版本号
// global.version = DeviceInfo.getVersion();
// // 获取设备唯一标识
// global.deviceID = getUniqueId()


/**
|--------------------------------------------------
| 通用URL地址
|--------------------------------------------------
*/

// 腾讯cos

global.COS_URL = 'https://3d-design-prod-1305072137.cos.ap-shanghai.myqcloud.com/'//正式环境
// global.COS_URL = 'https://3d-design-uat-1305072137.cos.ap-shanghai.myqcloud.com/'//预发环境
// global.COS_URL = 'https://3d-design-test-1305072137.cos.ap-shanghai.myqcloud.com/'//测试环境
global.CALCULATE_URL = 'https://cloud.51xpx.com/'//正式环境
// global.CALCULATE_URL = 'http://172.16.1.82:8080/'测试环境
// global.CALCULATE_URL = 'https://uatcloud.51xpx.com/'//UAT
// global.RENDER_URL = "http://172.16.1.82/" //渲染UAT环境
global.RENDER_URL = "https://yunzhuang.51xpx.com/" //渲染UAT环境
// global.RENDER_URL = "https://uatyunzhuang.51xpx.com/" //渲染UAT环境

global.IsRegister = 'null'
global.isEnvs = true //切换环境环境


[
    {
        "id": 1608,
        "name": "客厅",
        "list": [
            {
                "id": 1,
                "name": "客厅"
            },
            {
                "id": 2,
                "name": "餐厅"
            },
            {
                "id": 3,
                "name": "客餐厅"
            },
            {
                "id": 21,
                "name": "门厅"
            },
            {
                "id": 23,
                "name": "影音室"
            },
            {
                "id": 26,
                "name": "茶室"
            },
            {
                "id": 27,
                "name": "棋牌室"
            },
            {
                "id": 29,
                "name": "玄关"
            },
            {
                "id": 30,
                "name": "起居室"
            },
            {
                "id": 35,
                "name": "休闲区"
            },
            {
                "id": 36,
                "name": "多功能室"
            }
        ]
    },
    {
        "id": 1609,
        "name": "卧室",
        "list": [
            {
                "id": 4,
                "name": "卧室"
            },
            {
                "id": 5,
                "name": "主卧"
            },
            {
                "id": 6,
                "name": "次卧"
            },
            {
                "id": 7,
                "name": "儿童房"
            },
            {
                "id": 8,
                "name": "老人房"
            },
            {
                "id": 9,
                "name": "书房"
            },
            {
                "id": 10,
                "name": "衣帽间"
            },
            {
                "id": 22,
                "name": "储藏室"
            },
            {
                "id": 24,
                "name": "设备间"
            },
            {
                "id": 25,
                "name": "健身房"
            },
            {
                "id": 33,
                "name": "保姆房"
            }
        ]
    },
    {
        "id": 1610,
        "name": "厨房",
        "list": [
            {
                "id": 11,
                "name": "厨房"
            },
            {
                "id": 12,
                "name": "中厨"
            },
            {
                "id": 13,
                "name": "西厨"
            },
            {
                "id": 31,
                "name": "酒窖"
            }
        ]
    },
    {
        "id": 1611,
        "name": "卫生间",
        "List": [
            {
                "id": 14,
                "name": "卫生间"
            },
            {
                "id": 15,
                "name": "主卫"
            },
            {
                "id": 17,
                "name": "公卫"
            },
            {
                "id": 32,
                "name": "桑拿房"
            },
            {
                "id": 16,
                "name": "次卫"
            }
        ]
    },
    {
        "id": 1612,
        "name": "阳台",
        "list": [
            {
                "id": 18,
                "name": "过道"
            },
            {
                "id": 34,
                "name": "洗衣房"
            },
            {
                "id": 20,
                "name": "露台"
            },
            {
                "id": 19,
                "name": "阳台"
            }
        ]
    },
    {
        "id": 2608,
        "name": "全屋",
        "list": [
            {
                "id": 28,
                "name": "楼梯"
            }
        ]
    }
]