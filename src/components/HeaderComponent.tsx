import React, { ReactNode } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import globalStyle from '../styles/globalStyle';

interface Props {
    children: ReactNode,
}

const HeaderComponent = (props: Props) => {
    const {children} = props;
    return (
        <View style={[globalStyle.headerStyle]}>
            <Image source={require('../../assets/images/background/header_backgound2.jpg')}
                style={{height: '100%', width: '100%',position: 'absolute'}}
            ></Image>
            <View style={{padding: 10}}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default HeaderComponent;
