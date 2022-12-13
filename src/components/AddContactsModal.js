import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, Button, Divider, IconButton } from 'react-native-paper';
import sendNewContact from '../functions/sendNewContact';
import { useToast } from "react-native-toast-notifications";
import getAllContacts from '../functions/getAllContacts';


export function AddContactsModal({visible, onDismiss, setContacts}) {
    const [name,setName] = React.useState("")
    const [company,setCompany] = React.useState("")

    const [phoneList, setPhoneList] = React.useState([""])
    const [mailList, setMailList] = React.useState([])
    const [addressList, setAddressList] = React.useState([""])

    const [phoneListLength, setPhoneListLength] = React.useState(1)
    const [mailListLength, setMailListLength] = React.useState(0)
    const [addressListLength, setAddressListLength] = React.useState(1)

    const toast = useToast();
    return(
        <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{flex:1,backgroundColor:"#F3F2F7",justifyContent:"flex-start",alignItems:"baseline",flexDirection:"column"}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",marginTop:10}}>
                <Button labelStyle={{fontSize:20, color:"#117CDE"}} onPress={() => {onDismiss()}}>Cancel</Button>
                <Text style={{fontSize:25, fontWeight:"bold"}}>New Contact</Text>
                <Button labelStyle={{fontSize:20, color:"#117CDE"}}  onPress={async () => {
                    var result = await sendNewContact(name,company,phoneList,mailList,addressList);
                    if(result.error == true) {
                        var errorString = "";
                        result.reason.forEach(reason => {
                            errorString += reason + "\n"
                        })
                        toast.show("Error!\n\n"+errorString, {
                            type: "danger",
                            placement: "top",
                            duration: 2000,
                            offset: 150,
                            swipeEnabled:true,
                            animationType: "slide-in",
                        });
                    } else {
                        getAllContacts(setContacts)
                        onDismiss();
                    }
                    //burda direk api ye göndericez api den gelen cevapta error false ise devam edecek değil ise hata vericez
                }}>Done</Button>
            </View>
            <View style={{paddingHorizontal:"2.5%", backgroundColor:"white",marginTop:20,width:"100vw"}}>
                <TextInput style={{height:50,width:"100%"}} placeholder={"Name"} onChangeText={(text) => {setName(text)}} />
                <Divider />
                <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Company"} onChangeText={(text) => setCompany(text)} />
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
                            setPhoneListLength(phoneListLength-1)
                            setPhoneList(phones)
                            console.log(phoneList)

                        }}
                    />  : null
                    }
                    <TextInput keyboardType='numeric' style={{height:50,minWidth:"100%"}} placeholder={"Phone"} onChangeText={(text) => {
                        var phones = phoneList;
                        phones[i] = text;
                        setPhoneList(phones)
                    }} />
                    </View>
                })}
                <Divider style={{height:1}}/>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setPhoneListLength(phoneListLength+1)
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
                {[...Array(mailListLength)].map((phone,i) => {
                    return <View style={{flexDirection:"row",alignItems:"center",height:45}}>
                    <IconButton
                        icon={"minus"}
                        iconColor="white"
                        size={20}
                        style={{height:20,marginLeft:-3,marginRight:5,backgroundColor:"red",width:20}}
                        onPress={() => {
                            var mails = mailList;
                            mails.splice(i,1);
                            setMailListLength(mailListLength-1)
                            setMailList(mails)
                        }}
                    />
                    <TextInput keyboardType='email-address' style={{height:50,minWidth:"100%"}} placeholder={"Mail"} onChangeText={(text) => {
                        var mails = mailList;
                        mails[i] = text;
                        setMailList(mails);
                    }} />
                <Divider />
                    </View>
                })}
                {mailListLength != 0 ? <Divider style={{height:1}}/> : null}
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setMailListLength(mailListLength+1)
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
                {[...Array(addressListLength)].map((phone,i) => {
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
                            setAddressListLength(addressListLength-1)
                            setAddressList(address)
                            }}
                    />  : null
                    }
                    <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Address"} onChangeText={(text) => {
                        var address = addressList;
                        address[i] = text;
                        setAddressList(address)
                    }} />
                <Divider />
                    </View>
                })}
                {addressListLength != 0 ? <Divider style={{height:1}}/> : null}
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setAddressListLength(addressListLength+1)
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
        </Modal>
        </Portal>
    )
}