
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import globalStyle from './src/styles/globalStyle';
import HomeScreen from './src/screens/HomeScreen';
import {HomeProvider} from './src/contex/HomeContext'
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/screens/routers/Router';

export default function App() {
  return (
    <View style={{flex: 1}}>
        <StatusBar translucent barStyle='light-content' hidden={true} backgroundColor="transparent"/>
          <HomeProvider>
            <NavigationContainer>
                <Router></Router>
            </NavigationContainer>
          </HomeProvider>
    </View>
  );
}

const styles = StyleSheet.create({

});
