import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import globalStyle from '../styles/globalStyle';
import TextComponent from './TextComponent';
import { SubLevel } from '../dataModel/DataModel';
import TitleConponent from './TitleConponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
    subtask: SubLevel;
    isDelete?: () => void;
}

const SubtaskCardComponent = (props: Props) => {
    const {subtask, isDelete} = props;
    return (
        <View style={[globalStyle.card, {justifyContent: 'center'}]}>
            <RowComponent>
                <View style={{height: 150, width: 100, borderRadius: 15}}>
                    <Image
                        source={{uri: subtask.subbackgroundImage}}
                        style={{height: '100%', width: '100%', borderRadius: 15}}
                    ></Image>
                </View>
                <SpaceComponent width={20}></SpaceComponent>
                <View style={{flex: 2}}>
                    <TitleConponent text={subtask.subtitle}></TitleConponent>
                    <SpaceComponent height={10}></SpaceComponent>
                    <TextComponent text={`Số lượng câu hỏi: ${subtask.questions.length}`}></TextComponent>
                </View>
                <TouchableOpacity onPress={isDelete}>
                    <Icon name='trash' size={25} color={'white'}></Icon>
                </TouchableOpacity>
            </RowComponent>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SubtaskCardComponent;
