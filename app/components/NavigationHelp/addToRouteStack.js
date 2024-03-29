/*
 * @Author: Jonson 
 * @Date: 2022-05-13 12:26:16 
 * @Last Modified by: Jonson
 * @Last Modified time: 2022-05-21 15:41:08
 */
import React, {Component} from 'react'
import {RouteHelper} from './RouteHelper'
import hoistNonReactStatics from '../hoistNonReactStatics'

export const addToRouteStack = (OldComponent) => {
    class NewComponent extends Component {
        static displayName = `${OldComponent.displayName || OldComponent.name}`;

        componentDidMount() {
            const {navigation} = this.props
            RouteHelper.addStack(navigation);
            const componentDidFocus =
                this.pageComponent && this.pageComponent.componentDidFocus &&
                typeof this.pageComponent.componentDidFocus === 'function' &&
                this.pageComponent.componentDidFocus.bind(this.pageComponent);
            const componentWillBlur =
                this.pageComponent && this.pageComponent.componentWillBlur &&
                typeof this.pageComponent.componentWillBlur === 'function' &&
                this.pageComponent.componentWillBlur.bind(this.pageComponent);
            this.subscriptions = [];
            componentDidFocus && this.subscriptions.push(navigation.addListener('didFocus', componentDidFocus))
            componentWillBlur && this.subscriptions.push(navigation.addListener('willBlur', componentWillBlur))
        }

        componentWillUnmount() {
            RouteHelper.remove(this.props.navigation);
            this.subscriptions.forEach(sub => sub.remove());
        }

        _bindRef = (ref) => this.pageComponent = ref;

        render() {
            return <OldComponent
                ref={this._bindRef}
                {...this.props}
                {...this.props.navigation.state.params}
            />
        }
    }

    return hoistNonReactStatics(NewComponent, OldComponent)
};

export function configRoute(routeConfig) {
    for (let name in routeConfig) {
        let Component = routeConfig[name].screen;
        routeConfig[name].screen = addToRouteStack(Component)
    }
    return routeConfig
}