import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import globalStyle from '../styles/globalStyle';
import TitleConponent from '../components/TitleConponent';
import InputComponent from '../components/InputComponent';
import Icon from 'react-native-vector-icons/Fontisto';
import * as WebBrowser from 'expo-web-browser';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';
import SpaceComponent from '../components/SpaceComponent';
import RowComponent from '../components/RowComponent';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'
import {useHomeContext} from '../contex/HomeContext'
import {GoogleSignin} from '@react-native-google-signin/google-signin'

//Expo client id: 225301072332-c9t428bto2umc62jsb7blai03smlauqd.apps.googleusercontent.com

const AuthScreen = () => {

    // GoogleSignin.configure({
    //     webClientId: '225301072332-28nsn1r8o0b3s3t31n91grn3n89oh00q.apps.googleusercontent.com',
    // })
    const { setuserInfo } = useHomeContext();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
   
    //Đăng nhập với Google, không dùng được cho Expo Go do nó yêu cầu native.
    // const signIn = async () => {
      
    //   try {
    //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    //     const userInfo = await GoogleSignin.signIn();
    //     const idToken = userInfo.data?.idToken;
    //     setuserInfo(userInfo.data?.user.name);
    //     const googleCredentials = GoogleAuthProvider.credential(idToken);
    //     await signInWithCredential(auth, googleCredentials);
    //   }catch(error) {
    //     console.log(error);
    //   }
    // }

   
    return (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Image 
                source={require('../../assets/images/background/background3.jpg')} 
                style={[globalStyle.backgroundStyle]}
            ></Image>
            <View style={{padding: 10, marginBottom: 42}}>
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
                    <RowComponent>
                        <ButtonComponent 
                            text='Đăng nhập' 
                            onPress={() => console.log('Handle login')}
                            backgroundColor='#24bdd8'
                            width={100}
                            height={40}
                        ></ButtonComponent>
                        <SpaceComponent width={10}></SpaceComponent>
                    </RowComponent>
                </View>
                <SpaceComponent height={10}></SpaceComponent>
                <View style={{alignItems: 'center'}}>
                    <ButtonComponent
                        text='Đăng nhập với Google'
                        onPress={() => {}}
                        width={200}
                        radius={10}
                        height={40}
                    ></ButtonComponent>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AuthScreen;
