import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI
if(!MONGODB_URI){
  throw new Error('Please define mongo db url')
}
let cached = global.mongoose
if(!cached){
  cached = global.mongoose = {conn:null,promise:null}
}
const connect = async () => {
  if(cached.conn) return cached.conn
  if(!cached.promise){
    const options = {
      bufferCommands: false,
    }
    cached.promise = (await mongoose.connect(MONGODB_URI, options)).isObjectIdOrHexString((mongoose)=>{
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }
  return cached.conn
}
  
  export default connect;
  