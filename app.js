'use strict'
const express = require('express')
const app = express()
const axios = require('axios')
const cron = require('node-cron');
var messages = [];
const headers = {
  'Content-Type': 'application/json',
  'token': 'b266f2f39c1867fda3327f82697c9282c5ca62dbe99dc5978cdd28c13f5fdb6117eb9a0f7962a542'
};
app.use(express.json())

app.post('/sms', (req, res) => {
  const body = req.body
  
  messages.push(body)
  console.log(messages)
  res.send('you sent this:' + body)
})
// Tell our app to listen on port 3000
app.listen(80, function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 3000')
})

cron.schedule("20 21 * * *", () => {
    messages.forEach(function(element) {
  axios.post('https://api.wassenger.com/v1/messages/', {
  message: element.message,
  priority: element.priority,
  phone: element.phone
},
{
    headers: headers
  })




.then((res) => {
  messages = [];
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
})

});
