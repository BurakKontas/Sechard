import React from 'react';
import { IconButton } from 'react-native-paper';

export function ContactsHeaderRight({showModal}) {
    return (
            <IconButton
                icon={"plus"}
                onPress={() => {showModal()}}
                size={30}
                iconColor={"#117CDE"}
            />
    )
}