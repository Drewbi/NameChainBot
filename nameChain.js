const fs = require('fs');
const util = require('util')

fs.readFile('./Data/test.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const friends = parseFriends(data);
    for(var i in friends) {
        console.log("Started:", friends[i].first, friends[i].last);
        var matches = [];
        var results = matchName(friends[i], matches, friends, 0);
        console.log(util.inspect(results, false, null, true /* enable colors */))
    }
});

function parseFriends(data) {
    const friendData = JSON.parse(data).friends;
    const friendNum = friendData.length;
    const friendArray = [friendNum];
    for(var i in friendData){
        const friend = { 
            first: friendData[i].name.split(" ")[0],
            last: friendData[i].name.split(" ")[friendData[i].name.split(" ").length -1]
        };
        friendArray[i] = friend;
    }
    return friendArray;
}

function matchName(friend, matches, allFriends, layerNum) {
    console.log(" - ".repeat(layerNum) + "Added: ", friend.first, friend.last);
    matches.push(friend);
    var result = allFriends.filter(candidate => {
        return candidate.first === friend.last && candidate !== friend && !matches.includes(candidate);
    });
    if(result.length >= 1){
        console.log(" - ".repeat(layerNum) + "Testing: ", friend.first, friend.last);
    }
    var chainList = [];
    if(result.length === 0){
        let baseMatch = {
            chain: matches,
            depth: layerNum
        }
        chainList.push(baseMatch);
    }
    for (var i in result) {
        var addition = matchName(result[i], matches, allFriends, layerNum + 1);
        chainList.push(addition);
    }
    return chainList;
}

function parseList(matchList){
    console.log("Parsing");
}