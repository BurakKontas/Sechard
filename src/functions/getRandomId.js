export default async function getRandomId(setuid) {
    var requestOptions = {
        method: 'GET',
    };
    var res;
    await fetch("https://sechard-contacts.herokuapp.com/randomid", requestOptions)
    .then(response => response.json())
    .then(result => {
        res = result;
    })
    setuid(res)
    return res;
}