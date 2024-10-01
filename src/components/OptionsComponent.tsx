import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputComponent from './InputComponent';
import { Option } from '../dataModel/DataModel';
import TitleConponent from './TitleConponent';
import RowComponent from './RowComponent';
import { RadioButton } from 'react-native-paper';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';

const initOptions: Option[] = [
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false },
    { id: 3, text: '', isCorrect: false },
    { id: 4, text: '', isCorrect: false }
];

interface Props {
    saveOptions: (options: Option[]) => void;
    currentOptions?: Option[] | undefined;
    isEditing?: boolean;
    resetOption: boolean;

}

const OptionsComponent = forwardRef((props: Props, ref) => { 
    const {saveOptions, currentOptions, resetOption, isEditing} = props;
    const [options, setoptions] = useState<Option[]>(initOptions);
    const [selectedOption, setselectedOption] = useState<number | null>(null);
    const [errorTextIndex, seterrorTextIndex] = useState<number[]>([]);
    const initOptions2: Option[] = [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
    ];
    const handleChangeValue = (id: string,index: number, value: any) => {
        const item: any = [...options];
        item[index][`${id}`] = value;
        setoptions(item);
        seterrorTextIndex(prevState => {
            const newState = [...prevState];
            newState[index] = -1;
            return newState;

        })
    }
    useImperativeHandle(ref, () => ({
        childFunction() {
            handleSaveOPtion();
        },
      }));

    useEffect(() => {
        setoptions(initOptions2);
        console.log('Hello');
    },[resetOption]);

    useEffect(() => {
        if(isEditing && currentOptions) {
            setoptions(currentOptions);
        }
    },[isEditing])

    const handleSelected = (index: number) => {
        setselectedOption(index);
        const updateOption = options.map((option, i) => ({
            ...option,
            isCorrect: i === index
        }));
        setoptions(updateOption);
    }

    const handleSaveOPtion = () => {
        let yes = true;
        options.map((_,index) => {
            if(options[index].text == ''){
                seterrorTextIndex(prevState => {
                    const newState = [...prevState];  // Sao chép mảng cũ
                    newState[index] = index;  // Cập nhật giá trị tại vị trí index
                    return newState;  // Trả về mảng mới
                  });
                yes = false;
            }
        })
       if(yes) {
        saveOptions(options);
        setoptions(initOptions);
       }
    }

    return (
        <View>
            <View style={{marginTop: 20}}>
                {options.map((option, index) => (
                    <View key={index} style={{justifyContent: 'center', alignItems:'center', marginTop: 10}}>
                        <RowComponent styles={{justifyContent: 'center', alignItems: 'center'}}>
                            <TextComponent text={`Câu ${String.fromCharCode(64+index+1)}: `} size={18} flex={0}></TextComponent>
                            <View>
                            </View>
                            <View style={{flex: 1}}>
                                <InputComponent 
                                    value={(currentOptions !== undefined && !isEditing) ? currentOptions[index].text : option.text} 
                                    onChange={(val) => handleChangeValue('text',index, val)}
                                   isEditable={currentOptions ? isEditing : true}
                                ></InputComponent>
                            </View>
                            <RadioButton
                                    value={`option${index}`}
                                    status={(currentOptions && currentOptions[index].isCorrect && !isEditing) ? 'checked' : (selectedOption === index ? 'checked' : 'unchecked')}
                                    onPress={() => {
                                        handleSelected(index);
                                    }}
                                    uncheckedColor='white'
                                    color='green'
                                />
                        </RowComponent>
                        {(index == errorTextIndex[index]) && <TextComponent text='Hãy nhập câu hỏi !' color='coral' flex={1}></TextComponent>}
                    </View>
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({})

export default OptionsComponent;
