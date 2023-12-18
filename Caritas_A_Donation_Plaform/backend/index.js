const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const twilio= require('twilio')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes

app.get('/', ()=>{console.log("backend successfully launched")})

app.get('/api/auth', require('./routes/auth'))



app.use('/api/auth', require('./routes/auth'))

app.post('/api/sendMessage', async (req, res) => {
  const {message,phoneNo} =req.body ; // You can customize the message here
  if (!message) {
    return res.status(400).json({ error: "Message is missing in the request body" });
  }
  try {
      await sendSMS(message,phoneNo);
      res.status(200).json({ message: "SMS sent successfully" });
  } catch (error) {
      res.status(500).json({ error: "Failed to send SMS" });
  }
});


app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`)
})


const accountSid="ACf07f77989171eb9c914a60aef367a8a1"
const authToken ="8d9d9438f54607926764b1af5ea7b3b0"

const client = require('twilio')(accountSid,authToken);


const sendSMS = async (body) =>{
  console.log(body)
  
  let msgOptions = {
    from : "+16076693621",
    to : "+919989964650",
    
    body
  }
  try{
    
    await client.messages.create(msgOptions);
    
  }catch(error){
    console.error(error);
  }

}

