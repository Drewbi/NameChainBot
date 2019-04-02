const fs = require('fs');
const util = require('util')

fs.readFile('./Data/friend1k.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const friends = parseFriends(data);
    for(var i in friends) {
        var matches = [];
        var results = matchName(friends[i], matches, friends);
        if(results.length >= 2){
            //console.log(util.inspect(results, false, null, true))
        }
    }
});

function parseFriends(data) {
    const friendData = JSON.parse(data).friends;
    const friendNum = friendData.length;
    const friendArray = [friendNum];
    for(var i in friendData){
        const friend = { 
            first: friendData[i].name.split(" ")[0],
            last: friendData[i].name.split(" ")[1]
        };
        friendArray[i] = friend;
    }
    return friendArray;
}

function matchName(friend, matches, allFriends) {
    console.log("Testing: ", friend.first, friend.last);
    matches.push(friend);
    //console.log("Matches: ", matches)
    var result = allFriends.filter(candidate => {
        return candidate.first === friend.last && candidate !== friend && !matches.includes(candidate);
    })
    var chainList = [];
    for (var i in result) {
        //console.log("Checking:", result[i]);
        var newMatches = matchName(result[i], matches, allFriends);
        if(newMatches && newMatches.length === 0){
            chainList.push(matches);
        }
    }
    return chainList;
}