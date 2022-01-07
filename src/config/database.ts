import mongoose from "mongoose"

export default function connectToDB(){
    mongoose.connect(`${process.env.MONGODB_URL}`)
        .then(conn=>console.log("Connected to DB..."))
        .catch(err=>{
            console.log("Db not connected")
            console.log(err)
            process.exit(1)
        })
}

