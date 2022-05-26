/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:39:07 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:39:07 
 */

import { FormatTime } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from 'react-native-simple-store';
//对obj对象调用Object最原始的toString方法
const toStr = (obj) => {
  return Object.prototype.toString.call(obj);
};

//判断当前数据的类型
//是数字或者是数字对象时当算作数字
export const isNumber = (obj) => { return typeof obj === 'number' || toStr(obj) === '[object Number]'; };
//是字符串或者是字符串对象时当算作字符串
export const isString = (obj) => { return typeof obj === 'string' || toStr(obj) === '[object String]'; };
export const isBool = (obj) => { return typeof obj === 'boolean' };
export const isArray = (obj) => { return Array.isArray(obj) };
export const isObj = (obj) => { return toStr(obj) === '[object Object]' };
export const isDate = (obj) => { return toStr(obj) === '[object Date]' };
export const isRegExp = (obj) => { return toStr(obj) === '[object RegExp]' };

/**
 * 根据传入的参数返回布尔值
 *          自动转布尔值的情况:0,NaN,null,undefined,''为false,其他情况为true
 *          该方法将空数组[],空对象{},数值为0的字符串'0',空白字符串'  ',也列入false中
 * @param obj
 * @returns {boolean}
 */
export const getBool = (obj) => {
  if (isObj(obj)) { let keyArr = Object.keys(obj); return !!keyArr.length }
  if (isArray(obj)) { return !!obj.length }
  if (isString(obj)) {
    let reg = /^\s*$/;
    let reg1 = /^\s*0*(\.0*)?\s*$/;
    if (reg.test(obj) || reg1.test(obj)) { return false }
  }
  return !!obj;
};

//判断是否是数字还是对象
export const isNumberObj =(val)=> {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if(regPos.test(val) || regNeg.test(val)) {
      return true;
      } else {
      return false;
      }
  }

/**
* 验证是否为手机号
* @param {*} str
*/
export const isPhoneAvailable = (str) => {
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (str.length == 0 || str == null) {
    return false;
  } else if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}
export const Utf8ArrayToStr = (array) => {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
};

/**
 * 数组分成多个数组
 * @param {*} data 数据
 * @param {*} senArrLen  分成几个数组
 * 使用方式  splitArr([1,2,3,4,5,6,7,8] , 3);
 */
export const splitArr = (data, num, nsday) => {
  var newArr = []
  for (let i = 0; i < data.length; i += num) {
    newArr.push(data.slice(i, i + num))
  }
  var dateArr = []
  for (let index = 0; index < newArr.length; index++) {
    var datajon = {}
    dateArr.push({ 'wordList': newArr[index], 'beginDate': FormatTime.fun_date(index * nsday) })

  }
  console.log('~~~~~~~~newArr', dateArr)
  return dateArr
};
/**
 * 计算天数+几天后返回日期
 * @param {*} data 数据
 * @param {*} senArrLen  分成几个数组
 * 
 */
export const addSumDate = (n) => {
  var nn = new Date();
  nn.setDate(nn.getDate() + n);
  year1 = nn.getYear();
  mon1 = nn.getMonth() + 1;
  date1 = nn.getDate();
  var monstr1;
  var datestr1
  if (mon1 < 10)
    monstr1 = "0" + mon1;
  else
    monstr1 = "" + mon1;

  if (date1 < 10)
    datestr1 = "0" + date1;
  else
    datestr1 = "" + date1;
  console.log('~~~~~~~N天时间', year1 + "-" + monstr1 + "-" + datestr1)
  return year1 + "-" + monstr1 + "-" + datestr1;
};

// 计算年龄
export const getAge = (str) => {
  let r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (r == null) return "0岁";
  let d = new Date(r[1], r[3] - 1, r[4]);
  if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
    let Y = new Date().getFullYear();
    if (d.getFullYear() > Y) {
      return '0岁'
    } else {
      return ((Y - r[1]) + "岁");
    }
  }
  return ("0岁");
}


/**
   * 密码校验工具
   *
   * @param {*} s:number  校验密码几个元素 
   * @return {*} 返回值ls  
   *          0——>默认密码不小于6  
   *          1——>密码包含字母且不小于6
   *          2——>密码包含字母数字且不小于6
   *          3——>密码包含大小写字母数字且不小于6
   *          4——>密码包含大小写字母数字特殊字符且不小于6
   *          
   * @memberof LoginStore
   */
export const checkPass = (s) => {
  if (s.length < 6) {
    return 0;
  }
  var ls = 0;
  if (s.match(/([a-z])+/)) {
    ls++;
  }
  if (s.match(/([0-9])+/)) {
    ls++;
  }
  if (s.match(/([A-Z])+/)) {
    ls++;
  }
  if (s.match(/[^a-zA-Z0-9]+/)) {
    ls++;
  }
  return ls
}


/**
   * 存储历史记录
   *
   */
export const localStorage = async (text, callBack: Object) => {
  // if(searchHistoryArray.length === 0){
  //   // AsyncStorage.setItem('searchHistory', []);
  //   return
  // }
//这里再 App.js 里获取了 searchHistoryArray  定义了 gloab 属性
  if (text !== '') {
    //判断当前历史记录是否有当前搜索的内容，有则删除旧的数据，将搜索记录移到第一位
    if (searchHistoryArray.indexOf(text) != -1) {
      // 本地历史 已有 搜索内容
      let index = searchHistoryArray.indexOf(text);
      let tempArr = arrDelete(searchHistoryArray, index);
      tempArr.unshift(text);
      AsyncStorage.setItem('searchHistory', JSON.stringify(tempArr));
      callBack();
    } else if (searchHistoryArray.length >= 5) {
      //超过最大存储记录，删除最早的搜索记录，添加新的历史记录
      let index = searchHistoryArray.length - 1;
      let tempArr = arrDelete(searchHistoryArray, index);
      tempArr.unshift(text);
      AsyncStorage.setItem('searchHistory', JSON.stringify(tempArr));
      callBack()
    } else {//存储新的历史记录
      let tempArr = searchHistoryArray;
      tempArr.unshift(text);
      AsyncStorage.setItem('searchHistory', JSON.stringify(tempArr));
      callBack()
    }
  }


}

// 数组删除一个或多个 index:从第几个开始 length:删除几个,默认为1,可不传
const arrDelete = (arr, index, length = 1) => {
  let tempArr = arr;
  arr.splice(index, length);
  return tempArr;
}


//计算字符串中大写数字转小写方法
// var chnStr='三万五千六百四十三';
// var aa=cnnumtonum(chnStr);
// console.log(aa);
export const cnnumtonum = (chnStr) => {
  var chnNumChar = {
    零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9
  };
  var chnNameValue = {
    十: { value: 10, secUnit: false },
    百: { value: 100, secUnit: false },
    千: { value: 1000, secUnit: false },
    万: { value: 10000, secUnit: true },
    亿: { value: 100000000, secUnit: true }
  };
  var expNumChar = { 十: 10, 十一: 11, 十二: 12, 十三: 13, 十四: 14, 十五: 15, 十六: 16, 十七: 17, 十八: 18, 十九: 19 };
  if (chnStr === 999) {
    return ''
  }
  if (expNumChar[chnStr]) { return expNumChar[chnStr]; }
  var rtn = 0;
  var section = 0;
  var number = 0;
  var secUnit = false;
  var str = chnStr.split('');
  for (var i = 0; i < str.length; i++) {
    var num = chnNumChar[str[i]];
    if (typeof num !== 'undefined') {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      var cunit = chnNameValue[str[i]];
      if (typeof cunit == 'undefined') {
        return false;
      }
      var unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += (number * unit);
      }
      number = 0;
    }
  }
  return rtn + section;
}

//关于页面跳转的状态
export const navigationTitleType =(title)=>{
  if (title === '一键报价') {
    global.titleType = 2
  }else if(title === '新建项目'){
    global.titleType = 3
  }else if (title === '智能量房') {
    global.titleType = 1
  }
}

//如果尾数是小数点(.) 补0
export const toDecimal=(x)=> {    
  var f = parseFloat(x);    
  if (isNaN(f)) {    
      return false;    
  }    
  var f = Math.round(x*100)/100;    
  var s = f.toString();    
  var rs = s.indexOf('.');    
  if (rs < 0) {    
      rs = s.length;    
      s += '.';    
  }    
  while (s.length <= rs + 2) {    
      s += '0';    
  }    
  return s;    
}

/**
 *
 *
 * @param {*} text //存储的数据
 * @param {*} storageName 存储对应key的名字
 * @param {*} length //最大存储的长度
 * @param {Object} callBack 回调函数
 */
export const localStorageMet = async (text,storageName,length, callBack: Object) => {
  // if(searchHistoryArray.length === 0){
  //   // AsyncStorage.setItem('searchHistory', []);
  //   return
  // }
  
//这里再 App.js 里获取了 ConstructionArray  定义了 gloab 属性

  if (text !== '') {
    //判断当前历史记录是否有当前搜索的内容，有则删除旧的数据，将搜索记录移到第一位
    if (ConstructionArray.indexOf(text) != -1) {
      // 本地历史 已有 搜索内容
      let index = ConstructionArray.indexOf(text);
      let tempArr = arrDelete(ConstructionArray, index);
      tempArr.unshift(text);
      store.save(storageName, tempArr);
      callBack();
    } else if (ConstructionArray.length >= length) {
      //超过最大存储记录，删除最早的搜索记录，添加新的历史记录
      let index = ConstructionArray.length - 1;
      let tempArr = arrDelete(ConstructionArray, index);
      tempArr.unshift(text);
      store.save(storageName, tempArr);
      callBack()
    } else {//存储新的历史记录
      let tempArr = ConstructionArray;
      tempArr.unshift(text);
      store.save(storageName, tempArr);
      callBack()
    }
  }


}

/**
 *
 *
 * @param {*} text //存储的数据
 * @param {*} storageName 存储对应key的名字
 * @param {*} length //最大存储的长度
 * @param {Object} callBack 回调函数
 */
 export const localStorageMat = async (text,storageName,length, callBack: Object) => {
  // if(searchHistoryArray.length === 0){
  //   // AsyncStorage.setItem('searchHistory', []);
  //   return
  // }
  
//这里再 App.js 里获取了 MaterialArray  定义了 gloab 属性

  if (text !== '') {
    //判断当前历史记录是否有当前搜索的内容，有则删除旧的数据，将搜索记录移到第一位
    if (MaterialArray.indexOf(text) != -1) {
      // 本地历史 已有 搜索内容
      let index = MaterialArray.indexOf(text);
      let tempArr = arrDelete(MaterialArray, index);
      tempArr.unshift(text);
      store.save(storageName, tempArr);
      callBack();
    } else if (MaterialArray.length >= length) {
      //超过最大存储记录，删除最早的搜索记录，添加新的历史记录
      let index = MaterialArray.length - 1;
      let tempArr = arrDelete(MaterialArray, index);
      tempArr.unshift(text);
      store.save(storageName, tempArr);
      callBack()
    } else {//存储新的历史记录
      let tempArr = MaterialArray;
      tempArr.unshift(text);
      store.save(storageName, tempArr);
      callBack()
    }
  }


}


export const toThousands = (num) => {
  let result = '', counter = 0;
  let dot = String(num).indexOf(".");
  if (dot != -1) {
    // 有小数点
    // 获取小数点后面的数字(indexOf和substring都不支持数字，所以要先转字符串才可以用)
    let dotCnt = String(num).substring(dot + 1, num.length);

    // 获取小数点前面的数字
    num = String(num).split('.')[0]
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i != 0) {
        result = ',' + result;
      }
    }
    result = result + '.' + dotCnt;
    return result;

  } else {
    // 没有小数点
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  }


  export const downld = () =>{

  }


