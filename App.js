import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import { ContactsScreen } from './src/screens/Contacts';
import { ContactsHeaderRight } from './src/components/ContactsHeaderRight';
import { Provider } from 'react-native-paper';
import { ContactDetailsScreen } from './src/screens/ContactDetails';
import { ContactDetailsHeaderRight } from './src/components/ContactDetailsHeaderRight';


const Stack = createNativeStackNavigator();


export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <ToastProvider>
    <Provider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerBackgroundColor:"#FFF",
        headerShadowVisible:false,
      }}>
        <Stack.Screen name="Contacts" children={props => (
          <ContactsScreen visible={visible} onDismiss={hideModal} {...props} />
        )}
          options={{
            headerRight:(props) => {
              return <ContactsHeaderRight showModal={showModal} {...props} /> //<ContactsHeaderRight />
            },
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:25
            }
          }}
        />
      <Stack.Screen name="ContactDetails" children={props => (
          <ContactDetailsScreen editMode={editMode} setEditMode={setEditMode} {...props} />
        )}
        options={{
          headerTitle:"",
          headerStyle:{
            backgroundColor:"#F3F2F7",
          },
          headerRight:(props) => {
            return <ContactDetailsHeaderRight editMode={editMode} setEditMode={setEditMode} doneOnPress={() => {}} {...props} /> //<ContactsHeaderRight />
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </ToastProvider>
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
