const dotenv = require("dotenv");
const mongoose = require("mongoose");


const app = require ("./app")



//* Start env dotenv

dotenv.config();
const port = process.env.PORT;
const urlMomgo = process.env.MONGO_URI;

//* END env dotenv




//* Start Mongodb Connect

mongoose.set("strictQuery", false);
(async () => {
  await mongoose.connect(urlMomgo,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(()=>{
    console.log('mongodb connected.');
    
  }).catch(err=>{
    console.log('mongodb Disconnected.');

  })
})();

//* END Mongodb Connect


 



app.listen(port, function () {
  console.log(`Express Started on Port ${port}`);
});



