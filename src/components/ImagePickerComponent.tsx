import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import TextComponent from './TextComponent';
import * as DocumentPicker from 'expo-document-picker';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import RowComponent from './RowComponent';

interface Props {
    onImagePicked: (imageUri: string) => void;
    onHasImageUri?: string;
}

const ImagePickerComponent = (props: Props) => {
    const {onImagePicked, onHasImageUri} = props;

    const [imageUri, setimageUri] = useState('');
    const [subtaskUri, setsubtaskUri] = useState(onHasImageUri);

    const pickImage = async() => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(permissionResult.granted === false) {
                alert("Cần có quyền truy cập vào thư viện để chọn ảnh!!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false, //cho phép chỉnh sửa ảnh
                aspect:[3 , 4], // tỉ lệ cắt ảnh
                quality: 1, // chất lượng ảnh
            })

            if(!result.canceled) {
                setimageUri(result.assets[0].uri) //Lưu ảnh
                onImagePicked(result.assets[0].uri);
            }
        }catch(error) {
            console.log(error);
        }
    }

    return (
        (imageUri || subtaskUri) ? 
        (<RowComponent justify='space-between'>
            <View style={[styles.image]}>
                <Image source={{uri: imageUri ? imageUri : subtaskUri}} style={{height: '100%', width: '100%', borderRadius: 35,}}></Image>
            </View>
            <View style={{width: 120, height: 300, justifyContent: 'center'}}>
                <View>
                    <TouchableOpacity style={{width: 60, height: 60, backgroundColor: '#6666', borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginTop: 10}}
                        onPress={() => {onHasImageUri ? setsubtaskUri('') : setimageUri('')}}
                    >
                        <Icon name='trash-alt' size={30} color='rgba(36, 35, 35, 0.8)'></Icon>
                    </TouchableOpacity>
                    <TextComponent text='Xóa ảnh' flex={0} styles={{marginLeft: 5, marginTop: 5}} fontwieght='bold'></TextComponent>
                </View>
                
            </View>
        </RowComponent>) : (
            <TouchableOpacity
              style={styles.emptyImage}
              onPress={() => pickImage()}
            >
              <Icon name="plus" size={60} color="#6668" />
            </TouchableOpacity>
          )
    );
}

const styles = StyleSheet.create({
    emptyImage: {
        height: 300,
        width: 200,
        backgroundColor: '#6666',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#6668'
    },
    image: {
        height: 300,
        width: 200,
        borderRadius: 35,
        overflow: 'hidden',
    }
})

export default ImagePickerComponent;
