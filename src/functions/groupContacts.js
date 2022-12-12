function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

export function groupContacts(contacts = []) {
    console.log(contacts)
    var contactsSorted = contacts.sort(function (a, b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();
        if (a < b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });
    var map = {
        "*":[]
    };
    contactsSorted.forEach((val) => {
        if(isLetter(val.name[0])) {
            if(!Object.keys(map).includes(val.name[0].toUpperCase())) map[val.name[0].toUpperCase()] = [];
            map[val.name[0].toUpperCase()].push(val);
        } else {
            map["*"].push(val)
        }
    })
    return map;
}