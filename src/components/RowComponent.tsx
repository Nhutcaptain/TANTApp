import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import globalStyle from '../styles/globalStyle';

interface Props {
    children: ReactNode,
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined,
    styles?: StyleProp<ViewStyle>,
    onPress?: () => void,
}

const RowComponent = (props: Props) => {
    const { children, justify, styles, onPress } = props;
    const localStyles: StyleProp<ViewStyle> = [
        globalStyle.row,
        {
            justifyContent: justify ?? 'center',
            
        },
        styles
    ]
    return onPress ? (
        <TouchableOpacity onPress={onPress ? () => onPress() : undefined} style={localStyles}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyles}>{children}</View>
    );
}

export default RowComponent;
