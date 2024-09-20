import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../HomeScreen';
import AddNewTaskScreen from '../AddNewTaskScreen';

const Router = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
            <Stack.Screen name='AddNewTaskScreen' component={AddNewTaskScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default Router;
