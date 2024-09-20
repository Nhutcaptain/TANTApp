import React, { ReactNode, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleProp, ViewStyle } from 'react-native';
import TitleConponent from './TitleConponent';
import RowComponent from './RowComponent';
import globalStyle from '../styles/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Eye, EyeSlash } from 'iconsax-react-native';

interface Props {
    value: string ;
    onChange: (val: string) => void;
    placeHolder?: string;
    title?: string;
    affix?: ReactNode;
    prefix?: ReactNode;
    allowClear?: boolean;
    multible?: boolean,
    numberOfLine?: number;
    isPassword?: boolean;
    textColor?: string;
    isEditable?: boolean;
    align?: 'center' | 'flex-start' | 'flex-end' | undefined;
    fontSize?: number;
    fontWeight?: 'bold' | undefined ;
    textalign?: 'left' | 'center' | 'right' | 'justify' | undefined;
    styles?: StyleProp<ViewStyle>;
}

const InputComponent = (props: Props) => {

    const {value, onChange, placeHolder, title, affix, prefix, allowClear, multible, numberOfLine, isPassword, textColor, align, fontSize, fontWeight, textalign, isEditable, styles} = props;
    const [showPass, setshowPass] = useState(false);

    const localStyles: StyleProp<ViewStyle> = {
        position: 'absolute',
        top: '20%',
        right: 0,
    }
    return (
        
            <View style={{marginBottom: 16}}> 
            {title && <TitleConponent text={title}></TitleConponent>}
            <RowComponent styles={[globalStyle.inputContainer, 
                    {marginTop: title ? 8 : 0, 
                    minHeight: multible && numberOfLine ? 32 * numberOfLine : 32, 
                    paddingVertical: 10, 
                    paddingHorizontal: 10}, styles]}>
                {prefix && prefix}
                <View style={{flex: 1, paddingLeft: prefix ? 8 : 0, alignItems: align ?? 'flex-start'}}>
                    <TextInput 
                        style={[globalStyle.text,{paddingVertical: 1, textAlignVertical: multible ? 'top' : 'center', color: 'white', fontSize: fontSize ?? 16 , fontWeight: fontWeight ?? 'normal', textAlign: textalign ?? 'left',width: '100%' }]}
                        placeholder={placeHolder ?? ''} 
                        value={value} 
                        editable={isEditable}
                        onChangeText={val => onChange(val)}
                        placeholderTextColor = {textColor ? textColor : '#676767'}
                        multiline={multible}
                        numberOfLines={numberOfLine}
                        secureTextEntry={isPassword ? !showPass : false}
                        autoCapitalize='none'
                    ></TextInput>
                </View>
                {affix && affix}
                {allowClear && value &&  (
                    <TouchableOpacity onPress={() => onChange('')} >
                        <AntDesign name='close' size={20} color={'white'} style={localStyles}></AntDesign>
                    </TouchableOpacity>
                )}
                {
                    isPassword && <TouchableOpacity onPress={() => setshowPass(!showPass)}>
                        {showPass ? <EyeSlash size={20} color='white'></EyeSlash> : <Eye size={20} color='white'></Eye>}
                    </TouchableOpacity>
                }
            </RowComponent>
        </View>
       
        
    );
}

const styles = StyleSheet.create({})

export default InputComponent;
