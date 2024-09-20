import React from 'react';
import { StyleSheet, View, Text, TextStyle, StyleProp } from 'react-native';
import globalStyle from '../styles/globalStyle';
interface Props {
    text: string | undefined,
    size?: number,
    fontwieght?: TextStyle['fontWeight'],
    color?: string,
    flex?: number,
    styles?: StyleProp<TextStyle>,
}

const TextComponent = (props: Props) => {
    const { text, size, fontwieght, color, flex, styles} = props;
    return (
        <Text style={[globalStyle.text,
        { fontSize: size ?? 14 },
        { color: color ?? '#fff' },
        { flex: flex ?? 1 },
        {fontWeight: fontwieght ?? 'normal'},
        styles,
        ]}>{text}</Text>
    );
}

const styles = StyleSheet.create({})

export default TextComponent;
