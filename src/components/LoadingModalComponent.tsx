import React from 'react';
import { StyleSheet, View } from 'react-native';
import globalStyle from '../styles/globalStyle';
import LottieView from 'lottie-react-native';
import TextComponent from './TextComponent';
import {useHomeContext} from '../contex/HomeContext'

const LoadingModalComponent = () => {
    const { userInfo } = useHomeContext()
    return (
        <View style={[globalStyle.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{alignItems: 'center'}}>
                <TextComponent text={`Xin chào ${userInfo??''}` } size={30} flex={0}></TextComponent>
                <LottieView
                    source={require('../../assets/images/LottieFile/loadingLottie.json')}
                    style={{width: 300, height: 200}}
                    autoPlay
                    loop
                ></LottieView>
                <TextComponent text='Xin chờ trong giây lát....' flex={0} styles={{position: 'absolute', bottom: 30}} size={20}></TextComponent>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default LoadingModalComponent;
