var name;
var dest;
var firsttime;
var freq;
var tdnt;
var nexttime;
var firebaseConfig = {
    apiKey: "AIzaSyCBGDxJy0k7tWA0YgG1fA7FMlPX94J_8g8",
    authDomain: "trainscheduler-4ef21.firebaseapp.com",
    databaseURL: "https://trainscheduler-4ef21.firebaseio.com",
    projectId: "trainscheduler-4ef21",
    storageBucket: "",
    messagingSenderId: "472024285091",
    appId: "1:472024285091:web:e2709b478ccd7d5d"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected");
  connectedRef.on("value", function(snap) {

    if (snap.val()) {
  
      var con = connectionsRef.push(true);
  
      con.onDisconnect().remove();
    }
  });
$("#submit").on("click", function(){
    event.preventDefault();
    name = $("#name").val();
    dest = $("#dest").val();
    firsttime = $("#firsttime").val();
    freq = $("#frequency").val();
    console.log(name);
    console.log(dest);
    console.log(firsttime);
    console.log(freq);
    var firstTimeConverted = moment(firsttime, "HH:mm").subtract(0, "years");
    console.log(firstTimeConverted.format("hh:mm A"));
    var currentTime = moment();
    console.log(currentTime.format("hh:mm A"));
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(timeDiff);
    if (timeDiff >= 0){
        var remainder = freq - (timeDiff % freq);
        console.log(remainder);
        nexttime = moment().add(remainder, "minutes").format("hh:mm A");
        console.log(nexttime);
        var tdminutestill = remainder;
    }
    else if (timeDiff < 0){
        var tdminutestill = timeDiff * -1;
        nexttime = moment(firsttime, "hh:mm A").format("hh:mm A");
        console.log(nexttime);
    }
    var row = $("<tr>");
    database.ref().push({
        name: name,
        dest: dest,
        nexttime: nexttime,
        freq: freq,
        tdminutestill: tdminutestill
    });
    row.append("<td>"+name+"</td>");
    row.append("<td>"+dest+"</td>");
    row.append("<td>"+freq+"</td>");
    row.append("<td>"+nexttime+"</td>");
    row.append("<td>"+tdminutestill+"</td>");
    $("#table").append(row);
    $("#table").append()
    $("#name").val("");
    $("#dest").val("");
    $("#firsttime").val("");
    $("#frequency").val("");
});