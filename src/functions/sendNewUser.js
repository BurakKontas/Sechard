
export default async function sendNewUser() {
    var res;
    var requestOptions = {
        method: 'GET',
    };

    await fetch("http://sechard-contacts.herokuapp.com/user/adduser", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        res = result
    })
    return res;
}
