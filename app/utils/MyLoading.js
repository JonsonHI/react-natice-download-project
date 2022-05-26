/*
 * @Descripttion: 
 * @Author: pliybird
 * @Date: 2020-06-15 17:39:14
 * @LastEditors: pliybird
 * @LastEditTime: 2020-08-19 17:24:34
 */

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Bounc } from '../utils'
import {
    SvgIcon, iconPath
} from '../components'
import {DotsLoader } from 'react-native-indicator';

import { ScaleSize } from "./Scale";

const { width, height } = Dimensions.get('window');
export default class MyLoading extends React.Component {
    constructor(props) {
        super(props);
        this.minShowingTime = 200;
        this.state = {
            isLoading: false,
            setIsLoading: (isLoading) => {
                if (isLoading != this.state.isLoading) {
                    let curTimeLong = new Date().getTime();
                    if (isLoading) {
                        this.startTime = curTimeLong;
                        this.setState({
                            isLoading
                        });
                    } else {
                        let hasShowingTimeLong = curTimeLong - this.startTime;
                        if (hasShowingTimeLong < this.minShowingTime) {
                            setTimeout(() => {
                                this.setState({
                                    isLoading
                                });
                            }, this.minShowingTime - hasShowingTimeLong);

                        } else {
                            this.setState({
                                isLoading
                            });
                        }
                    }

                }
            },
        };
    }

    showLoading = () => {
        this.state.setIsLoading(true);
    };
    dismissLoading = () => {
        this.state.setIsLoading(false);

    };

    render() {
        if (!this.state.isLoading) {
            return null;
        }
        return (
            <View style={{
                flex: 1,
                width: width,
                height: height,
                position: 'absolute',
                backgroundColor: 'red',
                // backgroundColor : 'rgba(52,52,52,alpha)',
                backgroundColor: 'rgba(0,0,0,0)',
            }}>
                <View style={styles.loading}>
                    {/* <ActivityIndicator size="large" color="white" /> */}
                    {/* <Text style={styles.loadingTitle}>加载中...</Text> */}
                    {/* <Bounc
                        icons={[
                            myImg.loading
                            // <SvgIcon path={iconPath.close} fill={['#222']} size={60} />
                        ]}
                        leftDistance={0}
                        rightDistance={0}
                        leftRotation="-2000deg"
                        rightRotation="-4800deg"
                        speed={1000}
                        size={40}
                    /> */}
                    {/* <View style={{backgroundColor: 'rgba(0,0,0,0.1)',}}> */}
                    {/* <Image source={require('./gif/indicator2.gif')} style={{height:ScaleSize(60),width:ScaleSize(60)}}></Image> */}
                    <DotsLoader />
                    {/* <Text style={styles.loadingTitle}>加载中...</Text> */}
                    {/* </View> */}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        // backgroundColor : LoadingColor,
        backgroundColor: 'rgba(0,0,0,0)',
        height: 200,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: (height - 200) / 2,
        left: (width - 80) / 2,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: '#333333'
    }
});