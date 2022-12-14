import { getData } from './asyncstorage';

export default async function sendNewContact(name,company,phones,mails,address) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;
    var userid = await getData("uid");

    var raw = JSON.stringify(
        {
            user: userid,
            phones:phones,
            emails:mails,
            company:company,
            name:name,
            addresses:address
        }
    );
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://sechard-contacts.herokuapp.com/contact/addContact", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result
    })
    return res;
}
