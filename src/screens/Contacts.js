import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';
import { responsiveHeight } from '../functions/responsive';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import getAllContacts from '../functions/getAllContacts.js'
import { AddContactsModal } from '../components/AddContactsModal';
import { useNavigation } from '@react-navigation/native';
import searchContact from '../functions/searchContact';

export function ContactsScreen({visible,onDismiss, contacts, setContacts,uid}) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isContactsLoaded, setIsContactsLoaded] = React.useState(false);
    const onChangeSearch = query => {
        setSearchQuery(query);
        searchContact(setContacts,query)
    }

    const navigation = useNavigation();

    React.useEffect(() => {
        getAllContacts(setContacts,setIsContactsLoaded)
    }, []);

    return (
    (!isContactsLoaded && uid != null) ?
    <View style={{ flex:1, justifyContent:"center" ,alignItems:"center", }}>
        <ActivityIndicator animating={true} style={{alignSelf:"center"}} color={MD2Colors.red800} />
    </View>
    :
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <AddContactsModal setContacts={setContacts} visible={visible} onDismiss={onDismiss}/>
        <Searchbar
            style={{
                marginHorizontal:20,
                height:responsiveHeight(45),
                borderRadius:10,
            }}
            placeholderTextColor="grey"
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
        <Divider style={{marginVertical:17,marginHorizontal:17.5}}/>
        <ScrollView>
        {Object.keys(contacts).map(key => {
            if(contacts[key].length && contacts[key].length != 0)
            return (
                <View key={"view" + key} style={{marginBottom:15}}>
                    <Text key={key} style={{marginHorizontal:18, color:"grey",fontSize:18}}>{key}</Text>
                    {contacts[key].map((contact) => {
                        return (
                            <View key={"view"+contact.name} style={{marginHorizontal:17.5}}>
                                <Divider key={"div"+contact.name} style={{marginVertical:5,borderWidth:0.2}}/>
                                <TouchableOpacity key={"to"+contact.name} style={{flex:1}}
                                onPress={() => {
                                    navigation.push("ContactDetails",{
                                        name:contact.name,
                                    })
                                }}
                                >
                                    <Text key={contact.name}>{contact.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            )
        })}
        </ScrollView>
    </View>
    );
  }

/*
contacts[key].map((value) => {
    return <Text>{JSON.stringify(value)}</Text>
})
*/


 