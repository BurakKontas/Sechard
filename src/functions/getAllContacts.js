import { groupContacts } from './groupContacts';
import { getData } from './asyncstorage';

export default async function getAllContacts(setContacts = (value) => {}, setIsContactsLoaded = (value) => {}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;
    var userid = await getData("uid");

    var raw = JSON.stringify(
    {
        "userid":userid
    }
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://sechard-contacts.herokuapp.com/contact/getallcontacts", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result;
    })
    var contacts = groupContacts(res);
    setContacts(contacts);
    setIsContactsLoaded(true);
}