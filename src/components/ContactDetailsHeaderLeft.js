import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function ContactDetailsHeaderLeft({onPress,editMode}) {
    var navigation = useNavigation();
    if(editMode)
    return (
        <Button labelStyle={{fontSize:20, color:"#117CDE"}} onPress={onPress}>Cancel</Button>
    )
    else return (
        <Button labelStyle={{fontSize:20, color:"#117CDE"}} onPress={() => {navigation.goBack()}}>Back</Button>
    )
}