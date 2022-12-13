import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text, Button, Divider, IconButton } from 'react-native-paper';
import deleteContact from '../functions/deleteContact';
import { useNavigation } from '@react-navigation/native';
import getAllContacts from '../functions/getAllContacts';


export function ContactDetailsEdit({contact, list,setContacts}) {
    const [name,setName] = React.useState(contact.name)
    const [company,setCompany] = React.useState((contact.company != null) ? contact.company : null)

    const [phoneList, setPhoneList] = React.useState(contact.phones)
    const [mailList, setMailList] = React.useState((contact.emails) ? contact.emails : []);
    console.log(contact)
    const [addressList, setAddressList] = React.useState(contact.addresses) 
    
    const [phoneListLength, setPhoneListLength] = React.useState(contact.phones.length)
    const [mailListLength, setMailListLength] = React.useState(contact.emails ? contact.emails.length : 0)
    const [addressListLength, setAddressListLength] = React.useState(contact.addresses.length)
    
    const navigation = useNavigation();

    React.useEffect(() => {
        list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
    },[])

    return (
        <View>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",marginTop:10}}>
            </View>
            <View style={{paddingHorizontal:"2.5%", backgroundColor:"white",marginTop:20}}>
                <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Name"} value={name} onChangeText={(text) => {
                    setName(text);
                list({name:text,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})}} 
                />
                <Divider />
                <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Company"} value={company} onChangeText={(text) => {setCompany(text);
                list({name:name,company:text,phones:phoneList,mails:mailList,address:addressList,contact:contact})}} />
            </View>
            <View style={{paddingHorizontal:"2.5%", backgroundColor:"white",marginTop:20,width:"100%"}}>
                {[...Array(phoneListLength)].map((phone,i) => {
                    return <View style={{flexDirection:"row",alignItems:"center",height:45}}>
                    {
                    (phoneListLength != 1) ? 
                    <IconButton
                        icon={"minus"}
                        iconColor="white"
                        size={20}
                        style={{height:20,marginLeft:-3,marginRight:5,backgroundColor:"red",width:20}}
                        onPress={() => {
                            var phones = phoneList;
                            phones.splice(i,1);
                            setPhoneListLength(phoneListLength-1);
                            setPhoneList(phones)
                            list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})}}
                    />  : null
                    }
                    <TextInput keyboardType='numeric' style={{height:50,minWidth:"100%"}} placeholder={"Phone"} value={contact.phones[i]} onChangeText={(text) => {
                        var phones = phoneList;
                        phones[i] = text;
                        setPhoneList(phones)
                        list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                    }} />
                    </View>
                })}
                <Divider style={{height:1}}/>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setPhoneListLength(phoneListLength+1)
                    list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                }}
                >
                <IconButton
                    icon={"plus"}
                    iconColor="white"
                    size={20}
                    style={{height:20,marginLeft:-3,backgroundColor:"limegreen",width:20}}
                />
                <Text>Add Phone</Text>
            </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal:"2.5%", backgroundColor:"white",marginTop:20,width:"100%"}}>
                {[...Array(mailListLength)].map((mail,i) => {
                    return <View style={{flexDirection:"row",alignItems:"center",height:45}}>
                    <IconButton
                        icon={"minus"}
                        iconColor="white"
                        size={20}
                        style={{height:20,marginLeft:-3,marginRight:5,backgroundColor:"red",width:20}}
                        onPress={() => {
                            var mails = mailList;
                            mails.splice(i,1);
                            setMailListLength(mailListLength-1);
                            setMailList(mails)
                            list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                        }}
                    />
                    <TextInput keyboardType='email-address' style={{height:50,minWidth:"100%"}} value={contact.emails[i]} placeholder={"Mail"} onChangeText={(text) => {
                        var mails = mailList;
                        mails[i] = text;
                        setMailList(mails);
                        list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                    }} />
                <Divider />
                    </View>
                })}
                {mailListLength != 0 ? <Divider style={{height:1}}/> : null}
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setMailListLength(mailListLength+1)
                    list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                }}
                >
                <IconButton
                    icon={"plus"}
                    iconColor="white"
                    size={20}
                    style={{height:20,marginLeft:-3,backgroundColor:"limegreen",width:20}}
                />
                <Text>Add Mail</Text>
            </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal:"2.5%", backgroundColor:"white",marginTop:20,width:"100%"}}>
                {[...Array(addressListLength)].map((addrss,i) => {
                    return <View style={{flexDirection:"row",alignItems:"center",height:45}}>
                    {
                    (addressListLength != 1) ? 
                    <IconButton
                        icon={"minus"}
                        iconColor="white"
                        size={20}
                        style={{height:20,marginLeft:-3,marginRight:5,backgroundColor:"red",width:20}}
                        onPress={() => {
                            var address = addressList;
                            address.splice(i,1);
                            setAddressListLength(addressListLength-1);
                            setAddressList(address);
                            list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                        }}
                    />  : null
                    }
                    <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Address"} value={contact.addresses[i]} onChangeText={(text) => {
                        var address = addressList;
                        address[i] = text;
                        setAddressList(address);
                        list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                    }} />
                <Divider />
                    </View>
                })}
                {addressListLength != 0 ? <Divider style={{height:1}}/> : null}
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setAddressListLength(addressListLength+1)
                    list({name:name,company:company,phones:phoneList,mails:mailList,address:addressList,contact:contact})
                }}
                >
                <IconButton
                    icon={"plus"}
                    iconColor="white"
                    size={20}
                    style={{height:20,marginLeft:-3,backgroundColor:"limegreen",width:20}}
                />
                <Text>Add Address</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"#FFF",paddingTop:15,paddingHorizontal:15,paddingBottom:10,marginHorizontal:10,borderRadius:10,marginTop:20}}>
                <TouchableOpacity onPress={() => {
                    deleteContact(contact.name,setContacts)
                    navigation.goBack();
                }}>
                    <Text style={{color:"red",marginBottom:10,fontSize:18,alignSelf:"center"}}>Delete Contact</Text>
                </TouchableOpacity>               
            </View>
        </View>
    )
}