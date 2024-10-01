import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextComponent, ActivityIndicator } from 'react-native';
import globalStyle from '../styles/globalStyle';
import { Level } from '../dataModel/DataModel';
import TitleConponent from './TitleConponent';
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { storage } from '../firebase/firebaseConfig';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface Props {
    data: Level;
    index: number,
}

const LevelCardComponent = (props: Props) => {
    const {data, index} = props;
    const [imageUri, setimageUri] = useState('');

    return (
        <View style={[globalStyle.questionCard]}>
            <RowComponent>
                <View style={{height: 150, width: 100, borderRadius: 15}}>
                   <Image
                        source={{uri: data.backgroundImage}}
                        style={{height: '100%', width: '100%', borderRadius: 15}}
                    ></Image>
                </View>
                <SpaceComponent width={20}></SpaceComponent>
                <View style={{flex: 2}}>
                    <TitleConponent text={data.title}></TitleConponent>
                    <SpaceComponent height={10}></SpaceComponent>
                   
                </View>
            </RowComponent>

        </View>
    );
}

const styles = StyleSheet.create({})

export default LevelCardComponent;
