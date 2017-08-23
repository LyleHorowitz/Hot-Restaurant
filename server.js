// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// REstaurant  (DATA)
// =============================================================
var reservation = [{
  name: "name",
  phone_number: "555-5555",
  email: "email",
  unique_id: 123
},{
  name: "name2",
  phone_number: "555-5555",
  email: "email",
  unique_id: 1234
}];

var waitlist = [{
  name: "name",
  phone_number: "555-5555",
  email: "email",
  unique_id: 123
},{
  name: "name2",
  phone_number: "555-5555",
  email: "email",
  unique_id: 1234
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserved", function(req, res) {
  res.sendFile(path.join(__dirname, "reserved.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));

  // var chosen = req.params.;
  //
  // if (chosen) {
  //   console.log(chosen);
  //
  //   for (var i = 0; i < .length; i++) {
  //     if (chosen === [i].routeName) {
  //       return res.json([i]);
  //     }
  //   }
  //   return res.json(false);
  // }
  // return res.json();

});


app.get("/api/tables", function(req, res) {

  var chosen = req.params.reservation;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservation.length; i++) {
      if (chosen === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservation);

});

app.get("/api/waitlist", function(req, res) {
  //res.sendFile(path.join(__dirname, "waitlist.html"));
  var chosen = req.params.waitlist;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < waitlist.length; i++) {
      if (chosen === waitlist[i].routeName) {
        return res.json(waitlist[i]);
      }
    }
    return res.json(false);
  }
  return res.json(waitlist);

});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if (reservation.length > 4){
    waitlist.push(newReservation);
    //window.alert("You've been added to the waitlist!");
  }
  else {
    reservation.push(newReservation);
    //window.alert("Your table is reserved!");
  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
