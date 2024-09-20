import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import TextComponent from './TextComponent';
interface Props {
    text: string,
    font?: string,
    size?: number,
    color?: string,
    fontSize?: string,
    styles?: StyleProp<TextStyle>;
}
const TitleConponent = (props: Props) => {
    const { text, font, size, color, styles } = props;
    return (
        <TextComponent text={text} fontwieght={'bold'} color={color} size={size ?? 20} styles={styles} flex={0}></TextComponent>
    );
}

const styles = StyleSheet.create({})

export default TitleConponent;
