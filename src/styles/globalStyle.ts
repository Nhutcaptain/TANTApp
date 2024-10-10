import { Dimensions, StyleSheet } from "react-native" 

const {width: windowWidth, height:windowHeight} = Dimensions.get('window');

const globalStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'rgba(21, 20, 20, 0.8)',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    text: {

    },
    inputContainer: {
        backgroundColor: '#6666',
        padding: 10,
        borderRadius: 8,
    },
    card: {
        height: 200,
        width: '100%',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        borderColor: '#6669'
    },
    questionCard: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#6669',
        marginBottom: 10,
    },
    selectQuestionType: {
        paddingVertical: 10, 
        borderWidth: 1, 
        borderColor: 'gray', 
        borderRadius: 15, 
        width: '50%', 
        marginTop: 10,
    },
    backgroundStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    headerStyle: {
        height: 180,
        borderRadius: 15,
        alignItems: 'flex-end',
    },
})

export default globalStyle