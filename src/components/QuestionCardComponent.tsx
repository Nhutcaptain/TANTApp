import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, LayoutAnimation, ScrollView } from 'react-native';
import globalStyle from '../styles/globalStyle';
import TitleConponent from './TitleConponent';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import  Icon  from 'react-native-vector-icons/AntDesign';
import InputComponent from './InputComponent';
import { Option, Question } from '../dataModel/DataModel';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import OptionsComponent from './OptionsComponent';

interface itemData {
    label?: string;
    id?: number;
}

const initQuestion: Question = {
    question: '',
    id: 0,
    type: '',
    options: [],
    answer: '',
    expand:'',
    rightEssayAnswer: '',
}

interface Props {
    index: number;
    saveQuestion: (question: Question) => void;
    questions: Question | null;
    isSaved: boolean; 
    autoScroll: (value: number, i: number | undefined) => void;
}

const QuestionCardComponent = (props: Props) => {
    const {index, saveQuestion, questions, isSaved, autoScroll} = props;
    const [showOption, setshowOption] = useState(false);
    const [typeQuest, settypeQuest] = useState([
        {
            id: 1, label: 'Trắc nghiệm',
        },
        {
            id: 2, label: 'Tự luận',
        }
    ]);
    const [typeQuestSelected, settypeQuestSelected] = useState<itemData | null>(null);
    const [questData, setquestData] = useState<Question>(initQuestion);
    const [onSaved, setonSaved] = useState(isSaved);
    const [saveOption, setsaveOption] = useState(false);
    const [resetOption, setresetOption] = useState(false);

    const handleTypeSelected = (item: any) => {
        settypeQuestSelected(item);
        setshowOption(false);
    }

    useEffect(() => {
        questData.type = typeQuestSelected?.label ?? '';
        questData.id = index;
        setquestData(questData);
    },[typeQuestSelected?.label])

    useEffect(() => {
        if(saveOption) {
            handleSaveQuestion();
            setresetOption(!resetOption);
        }
    },[saveOption])

    const handleChangeValue = (id: string, value: any) => {
        const item: any = {...questData};
        item[`${id}`] = value;
        setquestData(item);
    }

    const handleSaveQuestion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setonSaved(true) 
        saveQuestion(questData);
    }

    return (
            <View style={[globalStyle.questionCard]}>
           {!onSaved ? <View>
            <RowComponent>
                <TitleConponent text={`Câu ${index}`}></TitleConponent>
                <SpaceComponent width={50}></SpaceComponent>
                <TouchableOpacity 
                    style={{justifyContent: 'center',flex: 1}}
                    onPress={() => {
                        setonSaved(true);
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    }}
                    >
                     <Icon name='up' color={'white'} size={20}></Icon>
                </TouchableOpacity>
            </RowComponent>
            <TouchableOpacity style={[globalStyle.selectQuestionType, {position: 'relative'}]}
                    onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                        setshowOption(!showOption);}}
                >
                <RowComponent styles={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
                    <TextComponent text={questions?.type ? questions.type : (typeQuestSelected?.label ? typeQuestSelected.label : 'Chọn dạng câu hỏi')}></TextComponent>
                    <Icon name='down' color={'white'}></Icon>
                </RowComponent>
                {showOption && (
                    <View style={{marginTop: 10}}>
                        {typeQuest.map((item, index) => (
                            <TouchableOpacity 
                                key={item.id} 
                                onPress={() => {handleTypeSelected(item);
                                    autoScroll(650, undefined);
                                }}
                                style={{backgroundColor: typeQuestSelected?.id == index+1 ? "rgba(12, 216, 64, 0.61)" : 'transparent', borderRadius: 10}}  

                                >
                                <View style={{ paddingVertical: 10, borderRadius: 15, paddingHorizontal: 10}}>
                                    <TextComponent text={item.label}></TextComponent>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </TouchableOpacity>
            <View>
                {(questions?.type == 'Tự luận' || typeQuestSelected?.label == 'Tự luận') ?
                    <View style={{marginTop: 10}}>
                        <InputComponent 
                            onChange={(val) => handleChangeValue('question',val)}
                            value={questions?.question ? questions.question : questData.question} 
                            allowClear
                            numberOfLine={5}
                            placeHolder='Nhập câu hỏi tại đây'
                            multible
                        ></InputComponent>
                        <TitleConponent text='Trả lời'></TitleConponent>
                        <InputComponent 
                            onChange={(val) => handleChangeValue('rightEssayAnswer', val)}
                            value={questions?.rightEssayAnswer ? questions.rightEssayAnswer : questData.rightEssayAnswer ? questData.rightEssayAnswer : ''}
                            placeHolder='Nhập câu trả lời ở đây'
                            allowClear
                        ></InputComponent>
                        <TitleConponent text='Giải thích'></TitleConponent>
                        <InputComponent 
                            onChange={(val) => handleChangeValue('expand',val)} 
                            value={questions?.expand ? questions.expand : questData?.expand ?? ''}
                            allowClear
                            multible
                            numberOfLine={3}
                            placeHolder='Nhập lời giải thích của câu hỏi'
                            ></InputComponent>
                    </View> : (questions?.type == 'Trắc nghiệm' || typeQuestSelected?.label == 'Trắc nghiệm') ? 
                    (<View>
                        <TitleConponent text='Nhập câu hỏi' styles={{marginBottom: 10}}></TitleConponent>
                        <InputComponent 
                            onChange={(val) => handleChangeValue('question',val)}
                            value={questions?.question ? questions.question : questData.question} 
                            allowClear
                            numberOfLine={3}
                            placeHolder='Nhập câu hỏi tại đây'
                            multible
                        ></InputComponent>
                        {/* Option Component */}
                        <OptionsComponent 
                            saveOptions={(val) => {
                                handleChangeValue('options', val);
                                setsaveOption(true); // Kích hoạt lưu câu hỏi sau khi options thay đổi
                            }} 
                            currentOptions={questions?.options ?? undefined}
                            resetOption
                        />
                    </View>) : 
                    <View></View>
                }
            </View>
            {(questions?.type == 'Tự luận' || typeQuestSelected?.label == 'Tự luận') && 
            <View style={{marginTop: 10}}>
                <ButtonComponent text='Save' onPress={() => handleSaveQuestion()}></ButtonComponent>
            </View> }
            
            </View> : 
            <View>
                <TouchableOpacity onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setonSaved(false);
                    autoScroll(((questions && index >=2) ? 1800 : questions ? 600 : 200), index);
                    
                   }}>
                    <TitleConponent text={questions?.question ? `Câu ${index}: ${questions.question}` : `Câu ${index}: ${questData.question}`}></TitleConponent>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({})

export default QuestionCardComponent;
