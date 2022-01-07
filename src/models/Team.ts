import mongoose, { Schema } from "mongoose"

const schema:Schema = new mongoose.Schema({
    uuid: {
        type:String,
        unique: true,
        required:true
    },
    company_id:{
        type:String,
        ref:'Company',
        required:true
    },
    team_lead_name:{
        type:String,
        required:true
    }
})

export default mongoose.model("Team",schema)