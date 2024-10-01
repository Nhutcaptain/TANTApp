import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import TextComponent from './TextComponent';
import globalStyle from '../styles/globalStyle';
import TitleConponent from './TitleConponent';
import { ArrowLeft } from 'iconsax-react-native';
import RowComponent from './RowComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import SpaceComponent from './SpaceComponent';
import { Question, SubLevel } from '../dataModel/DataModel';
import InputComponent from './InputComponent';
import ImagePickerComponent from './ImagePickerComponent';
import ButtonComponent from './ButtonComponent';
import QuestionCardComponent from './QuestionCardComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const initSubLevel: SubLevel = {
    subname: '',
    subtitle: '',
    subdescription: '',
    subbackgroundImage: '',
    season: 0,
    questions: [],
}

interface Props {
    closeModal: () => void;
    saveSubTask: (subtask: SubLevel) => void;
    subTaskSeason: number;
    isEditing?: boolean;
    SubTask?: SubLevel;
}

const SubQuestComponent = (props: Props) => {
    const {closeModal, saveSubTask, subTaskSeason, isEditing, SubTask} = props;
    const [subtaskDetail, setsubtaskDetail] = useState<SubLevel>(initSubLevel);
    const [qnumberString, setqnumberString] = useState('');
    const [numberOfQuest, setnumberOfQuest] = useState(SubTask ? SubTask.questions.length :  0);
    const [errorText, seterrorText] = useState(false);
    const resetSubLevel: SubLevel = {
        subname: '',
        subtitle: '',
        subdescription: '',
        subbackgroundImage: '',
        season: 0,
        questions: [],
    }
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if(isEditing && SubTask) {
            setsubtaskDetail(SubTask);
            setnumberOfQuest(SubTask.questions.length);
        }
    },[])

    useEffect(() => {
        seterrorText(false)
    },[qnumberString])
    
    const handleAddQuest = () => {
        if(qnumberString) {
            const qnumber = parseInt(qnumberString) || 0;
        setnumberOfQuest(prevNumber => prevNumber + qnumber);
        setqnumberString(''); // Clear the input field after adding
        } else {
            seterrorText(true);
        }
    }

    const handleChangeValue = (id: string, value: any) => {
        const item: any = {...subtaskDetail};
        if(id == 'questions') {
            item[`${id}`].push(value);
        } else {
            item[`${id}`] = value;
        }
        setsubtaskDetail(item);
    }

    const handleImagePicker = (imageUri: string) => {
        handleChangeValue('subbackgroundImage', imageUri);
    }

    const handleSaveSubtask = () => {
        if(!SubTask) {
            subtaskDetail.season = subTaskSeason + 1;
        }
        if(subtaskDetail.subtitle) {
            if(subtaskDetail.subbackgroundImage) {
                saveSubTask(subtaskDetail);
                setsubtaskDetail(resetSubLevel);
                closeModal();
            } else {
                alert('Hãy thêm ảnh nền !');
            }
        } else {
            alert('Hãy nhập tên');
        }
    }

    const handleSaveQuestion = (question: Question) => {
        const index = subtaskDetail.questions.findIndex(i => i.id === question.id)
        if(index !== -1) {
            console.log(question);
            const updateQuestion = [...subtaskDetail.questions];
            updateQuestion[index] = question;
            subtaskDetail.questions = updateQuestion;
            setsubtaskDetail(subtaskDetail);
        }else {
            handleChangeValue('questions', question);
        }
    }
    //Lướt màn hình lên trên
    const scrollToPosition = (value: number, index: number | undefined) => {
                scrollViewRef.current?.scrollTo({ y: value, animated: true }); // Cuộn lên 100 điểm từ đầu ScrollView
      };
    
    //Xóa question
    const handleDeleteQuestion = useCallback((index: number) => {
        const updatedQuestions = [...subtaskDetail.questions];
        updatedQuestions.splice(index, 1);
        setnumberOfQuest(prevNumber => prevNumber - 1);
        const updateQuestionIds = updatedQuestions.map(item => {
            if(item.id > index + 1) {
                return {...item, id: item.id - 1};
            }
            return item;
        })
        setsubtaskDetail(prevState => ({
            ...prevState,
            questions: updateQuestionIds,
        }));
    },[subtaskDetail]);
    return (
        <View style={[globalStyle.container]}>
            <ScrollView showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
                <TouchableOpacity onPress={handleSaveSubtask}>
                    <ArrowLeft size={30} color='white'></ArrowLeft>
                </TouchableOpacity>
                <TitleConponent text='Thêm các tiểu mục'></TitleConponent>
                <View style={{marginTop: 20}}>
                    {/* Đặt tên và season */}
                    <RowComponent>
                        <View style={{flex: 1}}>
                        <TitleConponent text='Tên tiểu mục' styles={{marginBottom: 10}}></TitleConponent>
                            <InputComponent 
                                onChange={(val) => {handleChangeValue('subtitle', val)}}
                                value={subtaskDetail.subtitle}
                                placeHolder='Nhập tên tiểu mục'
                                allowClear
                            ></InputComponent>
                        </View>
                        <SpaceComponent width={10}></SpaceComponent>
                        <View>
                            <TitleConponent text='Season' styles={{marginBottom: 10}}></TitleConponent>
                            <View style={[globalStyle.inputContainer, {height: 50, justifyContent: 'center', alignItems: 'center'}]}>
                                <TextComponent text={`${SubTask ? SubTask.season : subTaskSeason + 1}`} size={20}></TextComponent>
                            </View>
                        </View>
                    </RowComponent>
                    {/* Chọn hình */}
                    <ImagePickerComponent onImagePicked={handleImagePicker} onHasImageUri={SubTask?.subbackgroundImage}></ImagePickerComponent>
                    {/* Thêm câu hỏi */}
                    
                    <TitleConponent text='Thêm Số lượng câu hỏi' styles={{marginTop: 15}}></TitleConponent>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                        style={{flex: 1}}
                        keyboardVerticalOffset={58}
                    >
                    <View style={{position: 'relative', paddingBottom: 10}}>
                        <RowComponent styles={{alignItems: 'center', marginTop: 12}}>
                            <View style={{flex: 1}}>
                                <InputComponent value={qnumberString} onChange={setqnumberString}></InputComponent>
                            </View>
                            <SpaceComponent width={10}></SpaceComponent>
                            <View style={{flex: 4}}>
                                <RowComponent justify='flex-start' onPress={() => handleAddQuest()} >
                                    <Icon name='plus' size={20} color='rgba(146, 235, 244, 0.8)'></Icon>
                                    <SpaceComponent width={5}></SpaceComponent>
                                    <TextComponent text='Thêm' size={20} flex={0} color='rgba(146, 235, 244, 0.8)'></TextComponent>
                                </RowComponent>
                            </View>
                        </RowComponent>
                                {errorText && 
                                <RowComponent styles={{alignItems: 'center', position: 'absolute', bottom: 0}} justify='flex-start'>
                                    <Icon name='exclamationcircle' size={15} color={'coral'}></Icon>
                                    <SpaceComponent width={10}></SpaceComponent>
                                    <TextComponent text='Hãy nhập số câu trước !' color='coral' flex={0}></TextComponent>
                                </RowComponent>}
                    </View>
                    </KeyboardAvoidingView>
                    <View>
                        {Array.from({length: numberOfQuest}, (_, index) => (
                            <QuestionCardComponent key={index} index={index+1} saveQuestion={handleSaveQuestion} questions={subtaskDetail.questions ? subtaskDetail.questions[index] : null} isSaved={subtaskDetail.questions ? true : false} autoScroll={(val, i) => scrollToPosition(val, i)}
                            deleteQuestion={() => handleDeleteQuestion(index)}
                            ></QuestionCardComponent>
                        ))}
                    </View>
                    <ButtonComponent text='Lưu' onPress={() => handleSaveSubtask()}></ButtonComponent>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
      },
      textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        color: 'black',
      },
})

export default SubQuestComponent;
