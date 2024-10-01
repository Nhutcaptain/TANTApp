import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import globalStyle from '../styles/globalStyle';
import TitleConponent from '../components/TitleConponent';
import InputComponent from '../components/InputComponent';
import Icon from 'react-native-vector-icons/Fontisto';
import ButtonComponent from '../components/ButtonComponent';

const AuthScreen = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    return (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Image 
                source={require('../../assets/images/background/background3.jpg')} 
                style={[globalStyle.backgroundStyle]}
            ></Image>
            <View style={{padding: 10, marginBottom: 32}}>
                <TitleConponent text='ĐĂNG NHẬP' styles={{textAlign: 'center'}} size={30}></TitleConponent>
                <InputComponent
                    prefix={<Icon name='email' size={20} color={'white'}></Icon>}
                    value={email}
                    onChange={(val) => setemail(val)}
                    placeHolder='Địa chỉ Email'
                    textColor='#d1d1d1'
                ></InputComponent>
                <InputComponent
                    prefix={<Icon name='locked' size={20} color={'white'}></Icon>}
                    value={password}
                    onChange={(val) => setpassword(val)}
                    placeHolder='Mật khẩu'
                    textColor='#d1d1d1'
                ></InputComponent>
                <View style={{alignItems: 'center'}}>
                    <ButtonComponent 
                        text='Đăng nhập' 
                        onPress={() => {}}
                        backgroundColor='#24bdd8'
                    ></ButtonComponent>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AuthScreen;
