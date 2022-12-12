import getAllContacts from "./getAllContacts";
import { getData } from './asyncstorage';


export default async function deleteContact(name,setContacts) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;
    var userid = await getData("uid");
    var raw = JSON.stringify(
    {
        userid: userid,
        name:name,
    }
    );
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://sechard-contacts.herokuapp.com/contact/deleteContact", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result
    })
    getAllContacts(setContacts)
    return res;
}
