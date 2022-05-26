/*
 * @Version: 1.0
 * @Autor: Jonson
 * @LastEditors: pliybird
 * 全局唯一的Loading显示隐藏工具类
 * @Date: 2021-07-12 10:34:31
 * @LastEditTime: 2020-06-15 17:44:32
 * use:
 * 导入：import LoadingUtil from "./LoadingUtil";
 * 显示：LoadingUtil.showLoading();
 * 隐藏：LoadingUtil.dismissLoading();
 */
let LoadingUtil = {
    showLoading(timeOut = 10000){
        global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
        this.timerLoading = setTimeout(() => {
            this.dismissLoading();
        }, timeOut);

    },
    dismissLoading(){
        global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
        this.timerLoading && clearTimeout(this.timerLoading);

    },
};

export default LoadingUtil;