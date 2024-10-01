import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View,TouchableOpacity, Modal, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import globalStyle from '../styles/globalStyle';
import InputComponent from '../components/InputComponent';
import TitleConponent from '../components/TitleConponent';
import RowComponent from '../components/RowComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SpaceComponent from '../components/SpaceComponent';
import TextComponent from '../components/TextComponent';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { Marquee } from '@animatereactnative/marquee';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { Level, SubLevel } from '../dataModel/DataModel';
import SubQuestComponent from '../components/SubQuestComponent';
import ButtonComponent from '../components/ButtonComponent';
import SubtaskCardComponent from '../components/SubtaskCardComponent';
import { app, storage, db } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const initLevel: Level = {
    level: 0,
    title: '',
    backgroundImage: '',
    backgroundMusic: 0,
    subLevel: [],
}

const AddNewTaskScreen = () => {
    const [taskName, settaskName] = useState('');
    const [sound, setsound] = useState<Audio.Sound | null>(null);
    const [fileName, setfileName] = useState('');
    const [isPlaying, setisPlaying] = useState(false);
    const [level, setlevel] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [levelDetail, setlevelDetail] = useState<Level>(initLevel);
    const [isEditing, setisEditing] = useState(false);
    const [selectedSubTask, setselectedSubTask] = useState<SubLevel | undefined>(undefined);
    const [isLoading, setisLoading] = useState(false);
    //Thêm và tải nhạc lên firebase
    const pickAudio = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['audio/*'],
            });

            if(result.canceled) {
                console.log("Error!! No file selected");
                return;
            }
            if(result.assets) {
                console.log('Audio file has selected')
                setisLoading(true);
                const uri = result.assets[0].uri;
                const response = await fetch(result.assets[0].uri);

                const blob = await response.blob();

                const fileRef = ref(storage, `audios/${result.assets[0].name}`);
                if(fileName) {
                    try{
                        const filePath = ref(storage,`audios/${fileName}`);
                        await deleteObject(filePath);
                    }catch(err) {
                        console.error(err);
                    }
                }
                const snapshot = await uploadBytes(fileRef,blob);
                if(snapshot) {
                    setisLoading(false);
                }
                const downloadURL = await getDownloadURL(snapshot.ref);
                setfileName(result.assets[0].name);
                handleChangeValue('backgroundMusic', result.assets[0].name);
                await playSound(uri);
            }
        } catch(error) {
            console.error('Error picking document:', error);
        }
    }
    //Chạy nhạc
    const playSound = async (uri: string) => {
        try{
            const {sound} = await Audio.Sound.createAsync({uri});
            setsound(sound);
        }catch(error) {
            console.log(error);
        }
    }

    const handlePlaySound = () => {
        if(isPlaying) {
            sound?.pauseAsync();
            setisPlaying(!isPlaying);
        }else {
            if(sound) {
                sound.playAsync();
                setisPlaying(!isPlaying);
            }else {
                alert("Bạn chưa chọn nhạc nền !");
                return;
            }
        }
    }
    //Thay đổi giá trị
    const handleChangeValue = (id: string, value: any) => {
        const item: any = {...levelDetail};
        if(id == 'subLevel') {
            item[`${id}`].push(value);
        }else {
            item[`${id}`] = value;
        }
        setlevelDetail(item);
    }
    //Chọn hình ảnh
    const handleImagePicked = (imageUri: string) => {
        handleChangeValue('backgroundImage', imageUri);
      };
      //Lưu miền khám phá
      const handleSaveSubtask = (subtask: SubLevel) => {
        const index = levelDetail.subLevel.findIndex(s => s.season === subtask.season);
        if(index !== -1) {
            const updateSubTask = [...levelDetail.subLevel];
            updateSubTask[index] = subtask;
            levelDetail.subLevel = updateSubTask;
            setlevelDetail(levelDetail);
        } else {
            handleChangeValue('subLevel', subtask);
        }
        if(isEditing) {
            setisEditing(false);
            setselectedSubTask(undefined);
        }
        
      }
      // Xóa vùng đất
      const handleDeleteSubTask = useCallback((index: number) => {
        console.log("Handle Delete");
        const updatedSubtask = [...levelDetail.subLevel];
        updatedSubtask.splice(index, 1);
        const updateSubTaskId = updatedSubtask.map((item, idx) => ({
            ...item,
            id: idx + 1,
            season: idx + 1,
        }));
        console.log(updateSubTaskId);
        setlevelDetail(prevState => ({
          ...prevState,
          subLevel: updateSubTaskId, // Cập nhật subLevel mới
        }));
      }, [levelDetail]);
      //Chỉnh sửa vùng đất
      const handleEditSubTask = (item: SubLevel) => {
        setisEditing(true);
        setselectedSubTask(item);
        setisVisible(true);
      }
      //Lưu vào cơ sở dữ liệu 
      const saveLevelToFirestore = async (levels: Level) => {
            try {
                const docRef = doc(db, "levels", levels.level.toString());
                await setDoc(docRef, levels);
            }catch(error) {
                console.error(error);
            }
      }

    return (
        <View style={globalStyle.container}>
            <ScrollView showsVerticalScrollIndicator ={false}>
                <InputComponent 
                    onChange={(val) => {
                        settaskName(val);
                        handleChangeValue('title', val);
                    }} 
                    value={taskName} 
                    placeHolder='Nhập level ở đây' 
                    title='Tiêu đề'
                    allowClear 
                />
                {/* Chọn level và chọn nhạc */}
                <RowComponent justify='space-between'>
                    <View>
                        <TitleConponent text='Level: '></TitleConponent>
                        <InputComponent onChange={(val) => {setlevel(val);
                                                            handleChangeValue('level', parseInt(val));
                        }} value={level} styles={{height: 40, marginTop: 10}} align='center' textalign='center'></InputComponent>
                    </View>
                    <SpaceComponent width={50}></SpaceComponent>
                    <View style={{flex: 1}}>
                        <TitleConponent text='Chọn nhạc nền'></TitleConponent>
                        <View style={{marginTop: 10}}>
                            <RowComponent>
                                <TouchableOpacity 
                                    style={[globalStyle.inputContainer, {height: 40, flex: 1}]}
                                    onPress={() => pickAudio()}
                                >
                                    {isLoading ? <ActivityIndicator size='small'></ActivityIndicator> : fileName && fileName.length <= 40 ? <TextComponent text={fileName} flex={0}></TextComponent> : <Marquee spacing={20} speed={1}>
                                        <TextComponent text={fileName} flex={0}></TextComponent>
                                    </Marquee> }
                                </TouchableOpacity>
                                <SpaceComponent width={10}></SpaceComponent>
                                <TouchableOpacity 
                                    style={{width: 40, height: 40, backgroundColor: 'white', borderRadius: 35, borderWidth: 2, borderColor: 'white', justifyContent: 'center', alignItems: 'center'}}
                                    onPress={() => handlePlaySound()}
                                >
                                    {isPlaying ? <Icon name='pause' size={17}></Icon> : <Icon name='play' size={17}></Icon>}
                                </TouchableOpacity>


                            </RowComponent>
                        </View>
                    </View>
                </RowComponent>
                <TitleConponent text='Chọn hình nền' styles={{marginBottom: 10}}></TitleConponent>
                {/* Chọn hình ảnh */}
                <ImagePickerComponent onImagePicked={handleImagePicked}></ImagePickerComponent>
                <TitleConponent text='Các tiểu mục' styles={{marginBottom: 10, marginTop: 10}}></TitleConponent>
                {/* Các địa điểm */}
                <View>
                    {levelDetail.subLevel.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleEditSubTask(item)}>  
                            <SubtaskCardComponent subtask={item} isDelete={() => handleDeleteSubTask(index)}></SubtaskCardComponent>
                        </TouchableOpacity>
                    ))}
                </View>
                <RowComponent onPress={() => setisVisible(true)} styles={{alignItems: 'center'}}>
                    <Icon name='plus' size={20} color='rgba(146, 235, 244, 0.8)'></Icon>
                    <SpaceComponent width={5}></SpaceComponent>
                    <TextComponent text='Thêm' size={20} flex={0} color='rgba(146, 235, 244, 0.8)'></TextComponent>
            </RowComponent>
            <ButtonComponent text='Lưu' onPress={() => saveLevelToFirestore(levelDetail)}></ButtonComponent>
            </ScrollView>
            <Modal visible={isVisible} animationType='slide'>
                <SubQuestComponent closeModal={() => setisVisible(false)} saveSubTask={handleSaveSubtask} subTaskSeason={selectedSubTask ? selectedSubTask.season : levelDetail.subLevel.length} isEditing={isEditing} SubTask={selectedSubTask}></SubQuestComponent>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AddNewTaskScreen;
