import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import globalStyle from '../styles/globalStyle';
import ButtonComponent from '../components/ButtonComponent';
import RowComponent from '../components/RowComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import SpaceComponent from '../components/SpaceComponent';
import TextComponent from '../components/TextComponent';

const HomeScreen = ({navigation} : any) => {

    const handleAddNewTask = () => {
        navigation.navigate('AddNewTaskScreen');
    }

    return (
        <View style={[globalStyle.container]}>
           <RowComponent onPress={() => handleAddNewTask()} styles={{alignItems: 'center'}}>
                <Icon name='plus' size={20} color='rgba(146, 235, 244, 0.8)'></Icon>
                <SpaceComponent width={5}></SpaceComponent>
                <TextComponent text='Thêm' size={20} flex={0} color='rgba(146, 235, 244, 0.8)'></TextComponent>
           </RowComponent>
        </View>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
