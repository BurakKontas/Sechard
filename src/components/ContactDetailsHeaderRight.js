import React from 'react';
import { Button, IconButton } from 'react-native-paper';

export function ContactDetailsHeaderRight({setEditMode,editMode,doneOnPress}) {
    console.log(editMode)
    return (
            (!editMode) ? 
            <Button onPress={() => {
                setEditMode(true)
            }}
            >Edit</Button>
            :
            <Button onPress={() => {
                setEditMode(false);
                doneOnPress();
            }}
            >Done</Button>
    )
}