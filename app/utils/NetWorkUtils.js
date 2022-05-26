/*
 * @Author: Jonson 
 * @Date: 2022-05-21 15:38:56 
 * @Last Modified by:   Jonson 
 * @Last Modified time: 2022-05-21 15:38:56 
 */


import { Component } from 'react'
import {
    SvgIcon, iconPath, RouteHelper
} from '../components'
import {
    MToast, LoadingUtil
} from '../utils'
import React from 'react';
import { InteractionManager } from 'react-native'
import store from 'react-native-simple-store'
// import { uploadFiles } from 'react-native-fs';
// import { RuleTester } from 'eslint';
import {ConfigStore} from '../stores/ConfigStore'


/**
* fetch 网络请求的header，可自定义header 内容
* @type Accept: string, Content-Type: string, accessToken: *
*/
let token = '';

let headers = {
    'Accept': 'text/html',
    'Content-Type': 'text/html',
};
let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};
let uploadHeader = {
    'Accept': '*/*',
    // 'Content-Type': 'multipart/form-data;charset=UTF-8;',
};

// let tokenVal = {
//     Authorization: global.tokenVal
// }
/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @params params 请求参数
 * @returns {*}
 */
const handleUrl = url => params => {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            typeof (params) === 'object' ? url += '?' + paramsArray.join('&') : url
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return url
};


/**
 * fetch 网络请求超时处理
 * @param original_fetch
 * @param removeM 是否显示请求加载提示
 * @param timeout 超时时间 5s
 * @returns {Promise.<*>}
 */
let toastKey = null;
const timeoutFetch = (original_fetch, loading = true, timeout = 30000) => {
    loading ? LoadingUtil.showLoading() : null
    // let timeoutBlock = () => { };
    let timeout_promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            LoadingUtil.dismissLoading()
            reject('请求超时,请重新请求')
        }, timeout);
        /*timeoutBlock = () => {
            // 请求超时处理
            Portal.remove(toastKey);
            reject('请求超时,请重新请求')
        }*/
    });
    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    /*setTimeout(() => {
        timeoutBlock();
    }, timeout);*/
    return Promise.race([
        original_fetch,
        timeout_promise
    ])
};

/**
 * 网络请求工具类
 */
class HttpUtils extends React.Component {
    /**
     * get
     * 基于fetch 封装的GET 网络请求
     * @param url 请求URL
     * @param params 请求参数
     * @param bools  请求返回数据的解析方式 true json格式解析，false text格式解析
     * @param loading 是否显示请求加载提示
     * @param token 是否有token值
     * @returns {Promise}
     */
    static getRequest = async (url, params = {}, loading = true, token = true) => {
        console.log('网络请求URL', url);
        console.log('请求的参数', params);
        console.log('请求的参数', ConfigStore);
        // if(!tokenVal){
        //     tokenVal = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJBcHBJZCI6MSwiUG9ydElkIjoyLCJMb2dpbkV4cFRpbWVzdGFtcCI6MTYyODIxMzY1NTAwMCwiVXNlclR5cGUiOjEsIlVzZXJJZCI6NDU0LCJVc2VyTmFtZSI6IjU2NzgiLCJSb2xlTGlzdCI6WzFdLCJEZXBhcnRtZW50SWQiOjgyNywiRGVwYXJ0bWVudE5hbWUiOiLmgLvnu4_lip4iLCJEdXR5SWQiOjEsIkR1dHlOYW1lIjoi5oC757uP55CGIiwiRGVwYXJ0bWVudFR5cGVJZCI6MSwiT3BlbklkIjpudWxsLCJPcGVuVHlwZSI6MCwiU3lzdGVtVHlwZUlkIjowLCJJc0dyb3VwTGVhZGVyIjowLCJDZW50ZXJBY2NvdW50IjoiTUpfSlNaWF8zOTMifQ.Q8p8VOhibzj-1-iQE6_e0IlxaFiQS0EXiL6pl1du260'
        // }
        try {
            return timeoutFetch(fetch(handleUrl(url)(params), {
                method: 'GET',
                headers: {
                    ...header,

                    "Authorization": tokenVal,
                    // ...tokenVal
                    //:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJBcHBJZCI6MSwiUG9ydElkIjoyLCJMb2dpbkV4cFRpbWVzdGFtcCI6MTYyODIxMzY1NTAwMCwiVXNlclR5cGUiOjEsIlVzZXJJZCI6NDU0LCJVc2VyTmFtZSI6IjU2NzgiLCJSb2xlTGlzdCI6WzFdLCJEZXBhcnRtZW50SWQiOjgyNywiRGVwYXJ0bWVudE5hbWUiOiLmgLvnu4_lip4iLCJEdXR5SWQiOjEsIkR1dHlOYW1lIjoi5oC757uP55CGIiwiRGVwYXJ0bWVudFR5cGVJZCI6MSwiT3BlbklkIjpudWxsLCJPcGVuVHlwZSI6MCwiU3lzdGVtVHlwZUlkIjowLCJJc0dyb3VwTGVhZGVyIjowLCJDZW50ZXJBY2NvdW50IjoiTUpfSlNaWF8zOTMifQ.Q8p8VOhibzj-1-iQE6_e0IlxaFiQS0EXiL6pl1du260'
                },
            }), loading)
                .then(response => {
                    console.log("解析", response);
                    if (response.ok) {
                        return response.json()
                    } else {
                        LoadingUtil.dismissLoading()
                        // if (response.status == 502) {
                        //     Toast.fail('服务器已关闭，无法连接到网络', 1);
                        // } else {
                        //     Toast.fail('您当前的网络不佳，请稍后再试', 1);
                        //     console.log(response.status);
                        // }
                    }
                }).then(response => {
                    LoadingUtil.dismissLoading()
                    console.log('get网络请求返回数据:', response)
                    if (response.StateCode === 101) {
                        // tokenVal = null
                         MToast.show({
                            data: response.Msg,
                            icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                        })
                        return response
                    } else if (response.StateCode === 102) {
                        RouteHelper.navigate('Login')
                        return
                    }
                    // response.status：是与服务器端约定status：200表示请求成功，非200表示请求失败，message：请求失败内容
                    return response
                }).catch(error => {
                    LoadingUtil.dismissLoading()
                    console.log(error);
                    MToast.show({
                        data: '网络已中断，请检查您的网络连接',
                        icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                    })
                })
        } catch (error) {
            console.log("get请求抛出异常:", error)
        }


    };


    /**
 * post
 * 基于fetch 的 POST 请求
 * @param url 请求的URL
 * @param params 请求参数
 * @param bools 是否json格式解析返回数据
 * @param removeM 是否移除加载弹框
 * @returns {Promise}
 */
    static postRequrst = async (url, params = {}, loading = true) => {
        console.log("url参数：", url);
        console.log("参数：", params);
        // if(!tokenVal){
        //     tokenVal = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJBcHBJZCI6MSwiUG9ydElkIjoyLCJMb2dpbkV4cFRpbWVzdGFtcCI6MTYyODIxMzY1NTAwMCwiVXNlclR5cGUiOjEsIlVzZXJJZCI6NDU0LCJVc2VyTmFtZSI6IjU2NzgiLCJSb2xlTGlzdCI6WzFdLCJEZXBhcnRtZW50SWQiOjgyNywiRGVwYXJ0bWVudE5hbWUiOiLmgLvnu4_lip4iLCJEdXR5SWQiOjEsIkR1dHlOYW1lIjoi5oC757uP55CGIiwiRGVwYXJ0bWVudFR5cGVJZCI6MSwiT3BlbklkIjpudWxsLCJPcGVuVHlwZSI6MCwiU3lzdGVtVHlwZUlkIjowLCJJc0dyb3VwTGVhZGVyIjowLCJDZW50ZXJBY2NvdW50IjoiTUpfSlNaWF8zOTMifQ.Q8p8VOhibzj-1-iQE6_e0IlxaFiQS0EXiL6pl1du260'
        // }
        try {
            return timeoutFetch(fetch(url, {

                method: 'POST',
                headers: {
                    ...header,
                    // ...tokenVal
                    "Authorization": tokenVal,
                },
                credentials: 'include',
                mode: "cors",
                body: JSON.stringify(params)
            }), loading).then(response => {
                // console.log('请求头', headers)
                console.log('请求头', tokenVal)
                console.log("解析", response);
                if (response.ok) {
                    return response.json()
                } else if (response.StateCode === 400) {
                    return MToast.show({
                        data: '网络错误,请重试!',
                        icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                    })
                } else {
                    LoadingUtil.dismissLoading()

                }
            }).then(response => {
                console.log("post接口返回数据", response);
                LoadingUtil.dismissLoading()
                ConfigStore.isLoading = false
                if (response) {
                    if (response.StateCode === 101) {
                        // tokenVal = null
                         MToast.show({
                            data: response.Msg,
                            icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                        })
                    return response
                    } else if (response.StateCode === 102) {
                        // setTimeout(() => {
                        //     InteractionManager.runAfterInteractions(() => {
                        //         console.log('动画执行完了')
                        //         // ...耗时较长的同步执行的任务...
                        //         console.log(this.props)
                               
                                
                        //         return
                        //     });
                        // }, 500);
                        Nav.navigate('Login')
                       
                    }

                    return response
                }

            }).catch(error => {
                LoadingUtil.dismissLoading()
                console.log(error);
                MToast.show({
                    data: '网络已中断，请检查您的网络连接',
                    icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                })
            })
        } catch (e) {
            console.log("post请求抛出异常:", e)
        }
    };




    /**
 * post
 * 基于fetch 的 POST 请求
 * @param url 请求的URL
 * @param params 请求参数
 * @param bools 是否json格式解析返回数据
 * @param removeM 是否移除加载弹框
 * @returns {Promise}
 */
    static uploadFiles = async (url, params = {}, loading = true) => {
        console.log("url参数：", url);
        console.log("参数：", params);
        try {
            // await store.get('salt').then(async data => {
            //     if (data && data.salt) {
            //         token = { Authorization: data.salt }
            //         console.log('data.salt', data.salt)
            //     } else {
            //         token = null
            //     }
            // })
            return timeoutFetch(fetch(url, {

                method: 'POST',
                headers: {
                    ...uploadHeader,
                    ...token
                },
                credentials: 'include',
                mode: "cors",
                body: params
            }), loading).then(response => {

                console.log("解析======", response);
                if (response.ok) {

                    return response.json()
                } else {
                    LoadingUtil.dismissLoading()
                   

                }
            }).then(response => {
                console.log("文件上传接口返回数据", response);
                LoadingUtil.dismissLoading()
                if (response.StateCode === 999) {
                    return MToast.show({
                        data: '户型图无法识别，重新上传试试',
                        icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                    })
                } else if (response.StateCode === 102) {
                    RouteHelper.navigate('Login')
                    return
                } else if(response.StateCode === 101){
                     MToast.show({
                        data: response.Msg,
                        icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                    })
                }
                return response

            }).catch(error => {
                LoadingUtil.dismissLoading()
                console.log(error);
                MToast.show({
                    data: '网络已中断，请检查您的网络连接',
                    icon: <SvgIcon path={iconPath.networkError} fill={['#FFF']} size={toastImgSize} />
                })
            })
        } catch (e) {
            console.log("post请求抛出异常:", e)
        }
    };
}


/**
 * GET/POST
 * 从缓存中读取数据
 * @param isCache: 是否缓存
 * @param type: 请求类型
 * @param isCache 是否缓存
 * @url url 请求url
 * @params params 请求参数
 * @callback callback 是否有回调函数
 * @returns {value || promise}
 * 返回的值如果从缓存中取到数据就直接换行数据，或则返回promise对象
 */
const fetchData = (isCache, type) => (url, params, loading, callback) => {
    let promise
    const fetchFunc = () => {
        if (type === 'uploadFiles') {
            promise = HttpUtils.uploadFiles(url, params, loading)
        } else {
            promise = type === 'get' ? HttpUtils.getRequest(url, params, loading) : HttpUtils.postRequrst(url, params, loading);
        }
        if (callback && typeof callback === 'function') {
            promise.then(response => {
                return callback(response)
            })
        }
        return promise
    };
    return dataCache(url, fetchFunc, isCache)
};

/**
 * @param key：key为url的Path
 * @param fetchFunc：回调函数
 * @param isCache：是否需要缓存
 * @returns {value}
 */
const dataCache = (key, fetchFunc, isCache) => {
    // 不缓存，
    if (!isCache) {
        return fetchFunc()
    }
    // 需要缓存
    return store.get(key).then(value => {
        if (value) {
            // 如果在缓存中找到数据，则返回缓存中的数据
            return value
        } else {
            // 如果在缓存中取不到数据，则从网络请求中获取数据，并将获取到的数据缓存下来
            return fetchFunc().then(value => {
                value ? store.save(key, value) : null;
                return value
            })
        }
    })
};

/**
 * GET 请求
 * @param url
 * @param params
 * @param source
 * @param callback
 * @returns {{promise: Promise}}
 */
const get = fetchData(false, 'get');

/**
 * POST 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const post = fetchData(false, 'post');


/**
 * upload 图片上传
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const upload = fetchData(false, 'uploadFiles');

//全局fecth
global.Fetch = { get, post, upload };