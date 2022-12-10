import { groupContacts } from './groupContacts';

export default async function getAllContacts(setContacts = (value) => {}, setIsContactsLoaded = (value) => {}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;

    var raw = JSON.stringify(
    {
        "userid": "6392150338d1d848819fc5e8"
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