import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
    backgroundColor?: string;
    onPress: () => void;
    width?: number;
    height?: number;
    styles?: StyleProp<ViewStyle>;
    text: string,
    textColor?: string,
    radius?: number,
    textSize?: number,
    prefix?: ReactNode,
}

const ButtonComponent = (props: Props) => {

    const {backgroundColor, onPress, width, height, styles, text, radius, textColor, textSize, prefix} = props;

    const localStyle: StyleProp<ViewStyle> = [
        styles,
        {
            backgroundColor: backgroundColor ? backgroundColor : 'coral',
            width: width ? width : 100,
            height: height ? height : 30,
            borderRadius: radius ? radius : 12,
            justifyContent: 'center',
            alignItems: 'center',
        }
    ]
    return (
        <View>
            <RowComponent styles={localStyle} onPress={onPress}>
                {prefix && prefix}
                {prefix && <SpaceComponent width={5}></SpaceComponent>}
                <Text style={{color: textColor ? textColor : 'white', fontSize: textSize ? textSize : 15}}>{text}</Text>
            </RowComponent>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ButtonComponent;
