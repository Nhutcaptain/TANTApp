import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../HomeScreen';
import AddNewTaskScreen from '../AddNewTaskScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig';
import AuthScreen from '../AuthScreen';


const Router = () => {
    const [isLogin, setisLogin] = useState(false);
    const Stack = createNativeStackNavigator();
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setisLogin(true)
            } else {
                setisLogin(false);
            }
        })
    },[])

    const MainRouter = (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
            <Stack.Screen name='AddNewTaskScreen' component={AddNewTaskScreen}></Stack.Screen>
        </Stack.Navigator>
    )

    const AuthRouter = (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='AuthScreen' component={AuthScreen}></Stack.Screen>
        </Stack.Navigator>
    )

    return isLogin ? MainRouter : AuthRouter
}

const styles = StyleSheet.create({})

export default Router;
