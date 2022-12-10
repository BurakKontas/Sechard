import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import { HomeScreen } from './src/screens/Contacts';



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerBackgroundColor:"#FFF",
        headerShadowVisible:false,
      }}>
        <Stack.Screen name="Contacts" component={HomeScreen} 
          options={{
            headerRight:(props) => {
              return <Text>Hello</Text> //<ContactsHeaderRight />
            },
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:25
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
