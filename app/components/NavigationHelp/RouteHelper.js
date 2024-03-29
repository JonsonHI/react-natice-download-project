/*
 * @Author: Jonson 
 * @Date: 2022-05-13 12:27:44 
 * @Last Modified by: Jonson
 * react-navigation 跳转的封装
 * @Last Modified time: 2022-05-21 15:41:01
 * 需要使用configRoute包裹
 * export const AppNavigator = StackNavigator(
    configRoute({
      LaunchPage: {screen: LaunchPage},
      Test2Page: {screen: Test2Page},
  }), {
      initialRouteName: 'LaunchPage'
  }
 );

  //在任意地方就可以这样使用
  RouteHelper.navigate('Test2Page', {params: '我是参数'})
  //返回指定页面
  RouteHelper.goBackTo('Test2Page')
 */
import { NavigationActions, StackActions } from 'react-navigation'


export class RouteHelper {
    //app唯一导航组件的实例  修复goBackTo()方法返回是navigation不能继续goBack()的bug
    static get navigation() {
        return this.routeStack.length !== 0 ? this.routeStack[this.routeStack.length - 1] : null
    };

    //上次执行to方法的时间
    static lastActionTime = 0;
    //重复点击判断间隔时间,单位毫秒
    static interval: number = 500;
    //列表保存路由栈信息
    static routeStack: Array = [];
    //路由拦截器
    static routeInterceptor: (routeName: string, params: Object) => boolean;

    /**
     * 添加到导航栈中
     * @param navigation
     */

    static addStack(navigation) {
        if (this.routeStack.findIndex((item) => navigation.state.key === item.state.key) === -1) {
            //将状态保存到本地
            this.routeStack.push(navigation);
        }
    }

    /**
     * 从导航栈中移除
     * @param navigation
     */
    static remove(navigation) {
        let index = this.routeStack.findIndex((item) => navigation.state.key === item.state.key);
        if (index !== -1) {
            this.routeStack.splice(index, 1);
        }
    }

    /**
     *
     * 全局的路由跳转方法,可以在任意地方使用
     * @param routeName
     * @param params
     * @param delay
     */
    static navigate(routeName, params, delay = true) {
        //防止重复点击
        let nowTime = new Date().getTime();
        if ((nowTime - this.lastActionTime) <= this.interval && delay) {
            //重复点击了
            console.warn('间隔时间内重复点击了');
            return
        }
        if (this.routeInterceptor && !this.routeInterceptor(routeName, params)) {
            console.log('路由跳转被拦截');
            return;
        }
        if (!this.navigation) {
            console.error('请先初始化路由');
            return
        }
        this.lastActionTime = nowTime;
        this.navigation.navigate(routeName, params);
    }

    static goBack(key) {
        this.navigation.goBack(key)
    }

    static pop(n: number, params) {
        this.navigation.pop(n, params)
    }

    static popToTop(params) {
        this.navigation.popToTop(params)
    }

    static replace(routeName, params) {
        this.navigation.replace(routeName, params)
    }

    static push(routeName, params, delay = true) {
        let nowTime = new Date().getTime();
        if ((nowTime - this.lastActionTime) <= this.interval && delay) {
            //重复点击了
            console.warn('间隔时间内重复点击了');
            return
        }
        if (this.routeInterceptor && !this.routeInterceptor(routeName, params)) {
            console.log('路由跳转被拦截');
            return;
        }
        if (!this.navigation) {
            console.error('请先初始化路由');
            return
        }
        this.lastActionTime = nowTime;
        this.navigation.push(routeName, params);
    }

    /**
     * 返回第一个routeName 原理。StackNavigation能使用goBack(key)返回指定页面的上一页。
     * 所以根据想回到routeName页面就需要查找路由栈列表有这个routeName第一个的索引。获取索引+1值的key,就能回到第一个routeName的页面
     * @param routeName  声明的组件名
     * @returns {boolean} 正确则表示返回成功
     */
    static goBackTo(routeName) {
        let tag = false;
        this.routeStack.forEach(({ state }, i) => {
            //判断routeName相同并且不是列表最后一个表示匹配成功
            if (state.routeName === routeName && i < this.routeStack.length - 1 && !tag) {
                //获取+1的key
                let key = this.routeStack[i + 1].state.key;
                //需要移除导航栈索引后面的值
                //执行StackNavigation的goBack(key)方法
                this.navigation.goBack(key);
                tag = true;
            }
        });
        return tag;
    }

    /**
     * 重置路由,只重置一页,如需自定义重置路由。参照写法自己写
     * @param routeName
     */
    static reset(routeName) {
        const reset = (NavigationActions && NavigationActions.reset) || StackActions.reset;
        let resetAction = reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        });
        this.navigation.dispatch(resetAction);
    }
    /**
     * 重置路由,只重置一页,如需自定义重置路由。并且带参数
     * @param routeName
     */
    static resetParams(routeName,params) {
        const reset = (NavigationActions && NavigationActions.reset) || StackActions.reset;
        let resetAction = reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName,params })
            ]
        });
        this.navigation.dispatch(resetAction);
    }

     /**
     * 重置路由,只重置二页,直接返回是首页
     * @param routeName
     */
      static resetHome(routeName) {
        const reset = (NavigationActions && NavigationActions.reset) || StackActions.reset;
        let resetAction = reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'MyTab' }),
                NavigationActions.navigate({ routeName: routeName }),
                
            ]
        });
        this.navigation.dispatch(resetAction);
    }
     /**
     * 重置路由,只重置二页,直接返回是首页并且带参数
     * @param routeName
     */
      static resetHomeParams(routeName,params) {
        const reset = (NavigationActions && NavigationActions.reset) || StackActions.reset;
        let resetAction = reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'MyTab' }),
                NavigationActions.navigate({ routeName: routeName,params }),
                
            ]
        });
        this.navigation.dispatch(resetAction);
    }
}