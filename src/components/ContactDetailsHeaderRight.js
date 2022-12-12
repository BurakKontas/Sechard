import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import updateContact from '../functions/updateContact';

import { useToast } from 'react-native-toast-notifications';
import getAllContacts from '../functions/getAllContacts';
import getContactDetails from '../functions/getContactDetails';

export function ContactDetailsHeaderRight({setEditMode,editMode,list,setContacts,setName,setContact}) {
    const toast = useToast()
    return (
            (!editMode) ? 
            <Button labelStyle={{fontSize:20, color:"#117CDE"}} onPress={() => {
                setEditMode(true)
            }}
            >Edit</Button>
            :
            <Button labelStyle={{fontSize:20, color:"#117CDE"}} onPress={async () => {
                var result = await updateContact(list.name,list.company,list.phones,list.mails,list.address,list.contact)
                console.log(result)
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
                    setName(list.name)
                    getAllContacts(setContacts)
                    getContactDetails(setContact,(val) => {},list.name)
                    setEditMode(false);
                }
            }}
            >Done</Button>
    )
}