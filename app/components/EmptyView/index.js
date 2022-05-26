

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScaleSize, ScaleText } from '../../utils';

type Props = {
    title?: string,
    width?:any,
    height?:any
};
export default class EmptyView extends React.Component<Props> {
    static defaultProps = {
        title: '暂无数据',
        width:100,
        height:100
       
    };

    render() {
        const {
            title,
            width,
            height
        } = this.props;

        return (
            <View style={styles.EmptyProject}>
                <Image source={xpxImg.EmptyProject} width={ScaleSize(width)} height={ScaleSize(height)} />
                <Text style={styles.EmptyDesc}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    EmptyProject: {
        alignItems: 'center',
        marginTop: ScaleSize(180)
    },
    EmptyDesc: {
        color: gray,
        fontSize: ScaleSize(14)
    }

});
