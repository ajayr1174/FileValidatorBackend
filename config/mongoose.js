const mongoose = require('mongoose');
const connection_url ='mongodb+srv://validatordb:sXwnG4XBcfJWKnjR@cluster0.2tlaitw.mongodb.net/validatordb?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log(`successfully connected`);
    }).catch((e)=>{
    console.log(`not connected`);
    }); 


module.exports = mongoose;