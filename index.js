const request = require('request');
const fs = require('fs');

var userWorking = []
// In this function, in for(var i = 0; i < 5; i++) you can change the value for the characters you want the name have.
getUserTiktok = function() {
    let user = '';
    let dict = 'abcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < 5; i++) {
        user = user + dict.charAt(Math.floor(Math.random() * dict.length));
    }
    return user;
}
///////////////////////////////////////////////////////////////////
checkUser = function(user) {
    request(`https://www.tiktok.com/@${user}?`, (error, res, body) => {
        console.log("Checking....")

        if (error) {
            console.log(error)
            return;
        }
        try {
            if (res.statusCode == 200) {
                userWorking.push(user)
                fs.writeFileSync(__dirname + '/user.json', JSON.stringify(userWorking, null, 4));
            } else {
                console.log(`${user} is not working`);
            }
        } catch (error) {
            console.log(error)
            return;
        }
    });
}
console.log(`User checker by Skitt. https://github.com/Sz15-pl`);

console.log(`-------------------------------------\n`);

checkUser(getUserTiktok());
setInterval(() => {
    checkUser(getUserTiktok());
}, 1000);
