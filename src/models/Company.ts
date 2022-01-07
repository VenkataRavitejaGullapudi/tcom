import mongoose, { Schema } from "mongoose"

const schema:Schema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        required: true
    },
    company_name: { 
        type: String,
        required:true
    },
    company_ceo: { 
        type: String,
        required:true
    },
    company_address: { 
        type: String,
        required:true
    },
    inception_date: { 
        type: String,
        required:true
    }
})

export default mongoose.model("Company", schema)