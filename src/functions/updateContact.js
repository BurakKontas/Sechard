import { getData } from './asyncstorage';

export default async function updateContact(name,company,phones,mails,address,contact) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;
    var userid = await getData("uid");
    var raw = JSON.stringify(
    {
        newContact:{
            user: userid,
            phones:phones,
            emails:mails,
            company:company,
            name:name,
            addresses:address
        },
        oldName:contact.name,
    }
    );
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://sechard-contacts.herokuapp.com/contact/updateContact", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result
    })
    return res;
}
