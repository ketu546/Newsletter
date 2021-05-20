const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { response } = require("express");
// const fs = require("file-system")



const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));





app.get("/", function (req, res) {
    res.sendFile(__dirname + "/singup.html")
});


app.post("/", function (req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const eMail = req.body.eMail;

    const data = {
        members: [{
            email_address: eMail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: eMail,
            }
        }]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/51149d79fe"; 

// url format =  httpa://us{enter your last number api key like "sdfs5f443d-us7"}.api.mailchimp.com/3.0/lists/{Enter your list code}

    const options = {
        method: 'POST',
        auth: "kiron2:02d421d0e214dd0487e58dd1c142943a-us6", // Enter yor API key.
    }

    const request = https.request(url, options, function (response) {

        // response.on("data", function (data) {
        //     console.log(JSON.parse(data));

        // })

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
   })

    request.write(jsonData);
    request.end();

})


app.post("/success", function (req,res) {
     res.redirect("/") ; //Enter Your Redirect File Puth.
});

app.post("/failure",function (req,res) {
    res.redirect("/") ;   
});









app.listen(process.env.PORT ||3000, function () {
    console.log("Server Raning on port 3000");
})
