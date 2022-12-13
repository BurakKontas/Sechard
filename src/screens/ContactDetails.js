import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IconButton, Title, ActivityIndicator, MD2Colors, Divider, Button } from 'react-native-paper';
import getContactDetails from '../functions/getContactDetails';
import { ContactDetailsEdit } from '../components/ContactDetailsEdit';

export function ContactDetailsScreen({editMode,setEditMode,setContact,contact,list,setName,name,setContacts}) {
    var route = useRoute();
    var navigation = useNavigation();
    var params = route.params;

    const [isContactsLoaded, setIsContactsLoaded] = React.useState(false);

    React.useLayoutEffect(() => {
        setName(params.name)
        getContactDetails(setContact,setIsContactsLoaded,params.name);
        setEditMode(false)
    }, []);

    return (
        (!isContactsLoaded) ?
        <View style={{ flex:1, justifyContent:"center" ,alignItems:"center", }}>
            <ActivityIndicator animating={true} style={{alignSelf:"center"}} color={MD2Colors.red800} />
        </View>
        :
        (editMode) ? //edit mode yapılacak
        <View>
            <ContactDetailsEdit setContacts={setContacts} setEditMode={setEditMode} list={list} contact={contact} />
        </View> 
        :
        <ScrollView style={{backgroundColor:"#F3F2F7",flex:1}}>
            <View style={{alignItems:"center"}}>
                <Title style={{color:"black"}}>{name}</Title>
                <Text style={{marginBottom:10}}>{(contact.company != null) ? contact.company : null}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                <View style={{height:60,width:75,backgroundColor:"white",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                    <IconButton size={20}
                        icon={"message"}
                        iconColor="#117CDE"
                        style={{height:20,width:30}}
                    />
                    <Text style={{color:"#117CDE"}}>message</Text>
                </View>
                <View style={{height:60,width:75,backgroundColor:"white",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                <IconButton size={20}
                        icon={"phone"}
                        iconColor="#117CDE"
                        style={{height:20,width:30}}
                    />
                    <Text style={{color:"#117CDE"}}>call</Text>
                </View>
                <View style={{height:60,width:75,backgroundColor:"white",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                <IconButton size={20}
                        icon={"video"}
                        iconColor="#117CDE"
                        style={{height:20,width:30}}
                    />
                    <Text style={{color:"#117CDE"}}>video</Text>
                </View>
                <View style={{height:60,width:75,backgroundColor:"white",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                <IconButton size={20}
                        icon={"mail"}
                        iconColor="#117CDE"
                        style={{height:20,width:30}}
                    />
                    <Text style={{color:"#117CDE"}}>mail</Text>
                </View>
            </View>
            <View style={{marginTop:20}}>
                {contact.phones.map((value) => {
                    return (
                        <View style={{backgroundColor:"#FFF",padding:20,marginHorizontal:10,borderRadius:10,marginBottom:20}}>
                            <Text style={{fontSize:20}}>phone</Text>
                            <Text style={{fontSize:20,color:"#117CDE"}}>{value}</Text>
                        </View>
                    )
                })}
            </View>
            <View>
                {contact.emails.map((value) => {
                    return (
                        <View style={{backgroundColor:"#FFF",padding:20,marginHorizontal:10,borderRadius:10,marginBottom:20}}>
                            <Text style={{fontSize:20}}>e-mail</Text>
                            <Text style={{fontSize:20,color:"#117CDE"}}>{value}</Text>
                        </View> 
                    )
                })}
            </View>
            <View>
                {contact.addresses.map((value) => {
                    return (
                        <View style={{backgroundColor:"#FFF",padding:20,marginHorizontal:10,borderRadius:10,marginBottom:20}}>
                            <Text style={{fontSize:20}}>address</Text>
                            <Text style={{fontSize:20,color:"#117CDE"}}>{value}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={{backgroundColor:"#FFF",padding:15,marginHorizontal:10,borderRadius:10}}>
                <TouchableOpacity>
                    <Text style={{color:"#117CDE",marginBottom:10,fontSize:18}}>Send Message</Text>
                </TouchableOpacity>
                <Divider style={{height:1}} /> 
                <TouchableOpacity>
                    <Text style={{color:"#117CDE",marginBottom:10,fontSize:18,marginVertical:10}}>Share Contact</Text>
                </TouchableOpacity>                
                <Divider style={{height:1}} /> 
                <TouchableOpacity>
                    <Text style={{color:"#117CDE",marginBottom:10,fontSize:18,marginTop:10}}>Add to Favourites</Text>
                </TouchableOpacity>                
            </View>
            <View style={{backgroundColor:"#FFF",paddingTop:15,paddingHorizontal:15,paddingBottom:10,marginHorizontal:10,borderRadius:10,marginVertical:20}}>
                <TouchableOpacity>
                    <Text style={{color:"#117CDE",marginBottom:10,fontSize:18}}>Add to Emergency Contacts</Text>
                </TouchableOpacity>               
            </View>
            <View style={{backgroundColor:"#FFF",paddingTop:15,paddingHorizontal:15,paddingBottom:10,marginHorizontal:10,borderRadius:10}}>
                <TouchableOpacity>
                    <Text style={{color:"#117CDE",marginBottom:10,fontSize:18}}>Share My Location</Text>
                </TouchableOpacity>               
            </View>
        </ScrollView>
    )
}