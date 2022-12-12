import { groupContacts } from './groupContacts';
import { getData } from './asyncstorage';

export default async function getContactDetails(setContact = (value) => {}, setIsContactsLoaded = (value) => {},name = "") {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;
    var userid = await getData("uid");

    var raw = JSON.stringify(
    {
        "userid": userid,
        "name":name
    }
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://sechard-contacts.herokuapp.com/contact/getcontact", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result;
    })
    setContact(res[0]);
    setIsContactsLoaded(true);
    console.log(res[0])
}