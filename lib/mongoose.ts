import mongoose from 'mongoose';
let isConnected = false; //this will chedck whether it is connectd to mongoose

export const connectToDB = async () => {

mongoose.set('strictQuery', true);
if(!process.env.MONGODB_URL) return console.log('MongoDB URL NOT FOUND !');
if(isConnected) return console.log('Already connected to MONGODB !');
try{await mongoose.connect(process.env.MONGODB_URL);
    isConnected=true;
     console.log("Connected to Mongoose");

} catch(error){

}
    
}
