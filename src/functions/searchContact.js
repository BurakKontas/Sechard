import { groupContacts } from './groupContacts';
import { getData } from './asyncstorage';

export default async function searchContact(setContact = (value) => {},text = "") {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;
    var userid = await getData("uid");

    var raw = JSON.stringify(
    {
        "userid": userid,
        "text":text
    }
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://sechard-contacts.herokuapp.com/contact/searchcontacts", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result;
    })
    var contacts = groupContacts(res);
    setContact(contacts);
}