
export default async function sendNewUser(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var res;
    var raw = JSON.stringify(
        {
            _id:id,
        }
    );
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://sechard-contacts.herokuapp.com/user/adduser", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result
    })
    return res;
}
