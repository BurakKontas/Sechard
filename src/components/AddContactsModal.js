import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, Button, Divider, IconButton } from 'react-native-paper';
import sendNewContact from '../functions/sendNewContact';
import { useToast } from "react-native-toast-notifications";



export function AddContactsModal({visible, onDismiss}) {
    const [name,setName] = React.useState("")
    const [company,setCompany] = React.useState("")

    var phones = [""];
    const [phoneList, setPhoneList] = React.useState(1)

    var mails = [""];
    const [mailList, setMailList] = React.useState(0)
    var address = [""];
    const [addressList, setAddressList] = React.useState(1)

    const toast = useToast();
    return(
        <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{flex:1,backgroundColor:"#F3F2F7",justifyContent:"flex-start",alignItems:"baseline",flexDirection:"column"}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",marginTop:10}}>
                <Button labelStyle={{fontSize:20, color:"#117CDE"}} onPress={() => {onDismiss()}}>Cancel</Button>
                <Text style={{fontSize:25, fontWeight:"bold"}}>New Contact</Text>
                <Button labelStyle={{fontSize:20, color:"#117CDE"}}  onPress={async () => {
                    var result = await sendNewContact(name,company,phones,mails,address);
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
                        onDismiss();
                    }
                    //burda direk api ye göndericez api den gelen cevapta error false ise devam edecek değil ise hata vericez
                }}>Done</Button>
            </View>
            <View style={{paddingHorizontal:"2.5%", backgroundColor:"white",marginTop:20}}>
                <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Name"} onChangeText={(text) => {setName(text)}} />
                <Divider />
                <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Company"} onChangeText={(text) => setCompany(text)} />
            </View>
            <View style={{paddingHorizontal:"2.5%", backgroundColor:"white",marginTop:20,width:"100%"}}>
                {[...Array(phoneList)].map((phone,i) => {
                    return <View style={{flexDirection:"row",alignItems:"center",height:45}}>
                    {
                    (phoneList != 1) ? 
                    <IconButton
                        icon={"minus"}
                        iconColor="white"
                        size={20}
                        style={{height:20,marginLeft:-3,marginRight:5,backgroundColor:"red",width:20}}
                        onPress={() => {phones.splice(i,1);setPhoneList(phoneList-1)}}
                    />  : null
                    }
                    <TextInput keyboardType='numeric' style={{height:50,minWidth:"100%"}} placeholder={"Phone"} onChangeText={(text) => {
                        phones[i] = text;
                    }} />
                    </View>
                })}
                <Divider style={{height:1}}/>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setPhoneList(phoneList+1)
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
                {[...Array(mailList)].map((phone,i) => {
                    return <View style={{flexDirection:"row",alignItems:"center",height:45}}>
                    <IconButton
                        icon={"minus"}
                        iconColor="white"
                        size={20}
                        style={{height:20,marginLeft:-3,marginRight:5,backgroundColor:"red",width:20}}
                        onPress={() => {mails.splice(i,1);setMailList(mailList-1)}}
                    />
                    <TextInput keyboardType='email-address' style={{height:50,minWidth:"100%"}} placeholder={"Mail"} onChangeText={(text) => {
                        mails[i] = text;
                    }} />
                <Divider />
                    </View>
                })}
                {mailList != 0 ? <Divider style={{height:1}}/> : null}
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setMailList(mailList+1)
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
                {[...Array(addressList)].map((phone,i) => {
                    return <View style={{flexDirection:"row",alignItems:"center",height:45}}>
                    {
                    (addressList != 1) ? 
                    <IconButton
                        icon={"minus"}
                        iconColor="white"
                        size={20}
                        style={{height:20,marginLeft:-3,marginRight:5,backgroundColor:"red",width:20}}
                        onPress={() => {address.splice(i,1);setAddressList(addressList-1)}}
                    />  : null
                    }
                    <TextInput style={{height:50,minWidth:"100%"}} placeholder={"Address"} onChangeText={(text) => {
                        address[i] = text;
                    }} />
                <Divider />
                    </View>
                })}
                {addressList != 0 ? <Divider style={{height:1}}/> : null}
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",height:45}} 
                onPress={() => {
                    setAddressList(addressList+1)
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