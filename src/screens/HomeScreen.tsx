import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import globalStyle from '../styles/globalStyle';
import ButtonComponent from '../components/ButtonComponent';
import RowComponent from '../components/RowComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import SpaceComponent from '../components/SpaceComponent';
import TextComponent from '../components/TextComponent';
import { app, storage, db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { Level } from '../dataModel/DataModel';
import LevelCardComponent from '../components/LevelCardComponent';

const HomeScreen = ({navigation} : any) => {
    const [levelData, setlevelData] = useState<Level[]>([]);
    const handleAddNewTask = () => {
        navigation.navigate('AddNewTaskScreen');
    }

    useEffect(() => {
        const getData = async() => {
            try {
                const levelsCollection = collection(db, 'levels');
                const snapShot = await getDocs(levelsCollection);
                const levels = [];
                for (const doc of snapShot.docs) {
                    const data = doc.data();
                    const uri = await getDownloadURL(ref(storage, `images/${data.backgroundImage}`));
                    levels.push({
                      id: doc.id,
                      level: data.level,
                      title: data.title,
                      backgroundImage: uri, // Sử dụng URL của hình ảnh
                      subLevel: data.subLevel,
                      backgroundMusic: data.backgroundMusic,
                    });
                  }
                setlevelData(levels);

            }catch(err) {
                console.error(err);
            }
        }
        getData();
    },[])

    const renderLevel = () => {
        return (
           levelData && levelData.map((data, index) => {
                return (
                    <View key={index}>
                        <LevelCardComponent data={data} index={index}></LevelCardComponent>
                    </View>
                )
           })
        );
    }

    return (
        <View style={[globalStyle.container]}>
            <View style={{flex: 0}}>
            {renderLevel()}
           <RowComponent onPress={() => handleAddNewTask()} styles={{alignItems: 'center'}}>
                <Icon name='plus' size={20} color='rgba(146, 235, 244, 0.8)'></Icon>
                <SpaceComponent width={5}></SpaceComponent>
                <TextComponent text='Thêm' size={20} flex={0} color='rgba(146, 235, 244, 0.8)'></TextComponent>
           </RowComponent>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
      },
      textInput: {
        height: 180,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        color: 'black',
      },
})

export default HomeScreen;
