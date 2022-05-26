/*
 * @Descripttion: 工具类
 * @Author: pliybird
 * @Date: 2020-06-12 17:56:07
 * @LastEditors: pliybird
 * @LastEditTime: 2021-09-23 14:24:14
 */ 

import { ScaleSize, ScaleSizeHeight, ScaleText }from './Scale'
import  LoadingUtil from './LoadingUtil'
import MToast from './toast/Toast';
import { getBool,Utf8ArrayToStr,splitArr,getAge,checkPass,localStorage,cnnumtonum,navigationTitleType,isNumberObj,toDecimal,localStorageMet , localStorageMat,toThousands}from './CommonUtils'
import {_downloadFile,_mkdir} from './DownLoad'

export {
    ScaleSize,
    ScaleText,
    LoadingUtil,
    isNumberObj,
    MToast,
    getBool,
    splitArr,
    Utf8ArrayToStr,
    getAge, // 计算年龄
    checkPass, // 检查密码
    localStorage,//历史记录存储
    cnnumtonum,//数字大写转小写
    navigationTitleType,//用来判断是哪个入口进来的
    toDecimal,//尾数是小数点(.)补0
    localStorageMet,//施工配置项存储
    localStorageMat,//施工配置项材料存储
    toThousands, // 每隔三位加逗号
    _downloadFile,//下载文件
    _mkdir,//创建文件夹
};