const fs = require('fs');
const util = require('util')

fs.readFile('./Data/myfriends.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const friends = parseFriends(data);
    for(const friend of friends) {
        console.log("Started:", friend.first, friend.last);
        let matches = [];
        var results = matchName(friend, matches, friends, 1);
        console.log("end:", util.inspect(results, false, null, true /* enable colors */))
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
    var newMatches = [...matches];
    newMatches.push(friend);
    const results = allFriends.filter(candidate => {
        return candidate.first === friend.last && candidate !== friend && !newMatches.includes(candidate);
    });
    var chainList = [];
    if(results.length === 0) {
        let baseMatch = {
            chain: newMatches,
            depth: layerNum
        }
        chainList.push(baseMatch);
    } else { 
        for (const result of results) {
            let additions = matchName(result, newMatches, allFriends, layerNum + 1);
            for (const addition of additions) {
                chainList.push(addition);
            }
        }
    }
    return chainList;
}
