const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");


client.setConfig({
  apiKey: "4486c0f55b0f4a4f00575106a863538b-us6",
  server: "us6",
});


const app = express();
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const firstName = req.body.firstName; 
    const secondName = req.body.secondName;
    const email = req.body.email;

    console.log(firstName + secondName + email);
    

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
        
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/5952ebf770"; 

    const options = {
        method: "POST",
        auth: "kalelov555:4486c0f55b0f4a4f00575106a863538b-us6"
    }

    const request = https.request(url, options, function(response) {
        if(response.statusCode===200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {

            console.log(data);

        })
    });

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
})



//API key
//4486c0f55b0f4a4f00575106a863538b-us6



//list_id
//5952ebf770