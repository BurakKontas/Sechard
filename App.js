import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import { ContactsScreen } from './src/screens/Contacts';
import { ContactsHeaderRight } from './src/components/ContactsHeaderRight';
import { ActivityIndicator, Provider, MD2Colors } from 'react-native-paper';
import { ContactDetailsScreen } from './src/screens/ContactDetails';
import { ContactDetailsHeaderRight } from './src/components/ContactDetailsHeaderRight';
import { ContactDetailsHeaderLeft } from './src/components/ContactDetailsHeaderLeft';
import { getData, setData, clearData } from './src/functions/asyncstorage';
import getRandomId from './src/functions/getRandomId';
import sendNewUser from './src/functions/sendNewUser';


const Stack = createNativeStackNavigator();

async function getuid(setuid,setGotid){
  const uid = await getData("uid");
  console.log(uid)
  if(uid == null) {
    var id = await getRandomId(setuid);
    var result = await sendNewUser();
    console.log(result)
    await setData("uid",result.user._id);
    setGotid(true);
  } else {
    setuid(uid);
    setGotid(true)
  }
}

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [contacts, setContacts] = React.useState({});
  const [contact, setContact] = React.useState({});
  const [name, setName] = React.useState("")
  const [uid, setuid] = React.useState(null);
  const [gotid, setGotid] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [list, setList] = React.useState({});

  React.useLayoutEffect(() => {
    getuid(setuid,setGotid)
  },[])
  
 return (!gotid) 
  ?
  <View style={{ flex:1, justifyContent:"center" ,alignItems:"center", }}>
    <ActivityIndicator animating={true} style={{alignSelf:"center"}} color={MD2Colors.red800} />
  </View>
  :
    <ToastProvider>
    <Provider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerBackgroundColor:"#FFF",
        headerShadowVisible:false,
      }}>
        <Stack.Screen name="Contacts" children={props => (
          <ContactsScreen visible={visible} uid={uid} contacts={contacts} setContacts={setContacts} onDismiss={hideModal} {...props} />
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
          <ContactDetailsScreen setContacts={setContacts} editMode={editMode} name={name} contact={contact} setContact={setContact} setName={setName} list={setList} setEditMode={setEditMode} {...props} />
        )}
        options={{
          headerTitle:(editMode) ? "Edit Contact" : "",
          headerTitleAlign:"center",
          headerStyle:{
            backgroundColor:"#F3F2F7",
          },
          headerRight:(props) => {
            return <ContactDetailsHeaderRight editMode={editMode} setContact={setContact} setName={setName} setContacts={setContacts} setEditMode={setEditMode} list={list} {...props} /> //<ContactsHeaderRight />
          },
          headerLeft:(props) => {
           return <ContactDetailsHeaderLeft onPress={() => {setEditMode(false)}} editMode={editMode} {...props} />
          }
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </ToastProvider>
}