//a POST routes /api/friends - this handles incoming survey results. will also used to handle the compatibility logic
//Load Data
var friend = require('../data/friend.js');

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friend);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in friendList array
    var array = req.body.scores;
    var scorelist = [];
    var greatmatch = 0;

    //runs through all current friends in list
    for(var i=0; i<friend.length; i++){
      var scoresDiff = 0;
      //run through scores to compare friends
      for(var j=0; j<array.length; j++){
        scoresDiff += (Math.abs(parseInt(friend[i].scores[j]) - parseInt(array[j])));
      }

      //push results into scorelist
      scorelist.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(var i=0; i<scorelist.length; i++){
      if(scorelist[i] <= scorelist[greatmatch]){
        greatmatch = i;
      }
    }

    //return bestMatch data
    var bestfrnd = friend[greatmatch];
    res.json(bestfrnd);

    //pushes new submission into the friendsList array
    friend.push(req.body);
  });
};