import React from 'react';
import { Button, IconButton } from 'react-native-paper';

export function ContactDetailsHeaderLeft({onPress}) {
    return (
        <Button labelStyle={{fontSize:20, color:"#117CDE"}} onPress={onPress}>Cancel</Button>
    )
}