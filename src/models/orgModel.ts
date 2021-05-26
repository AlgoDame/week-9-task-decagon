import mongoose from "mongoose";

const schema = new mongoose.Schema({
    organization: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        required: true
    },
    marketValue: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ceo: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    noOfEmployees: {
        type: Number,
        required: true
    },
    employees: {
        type: [String],
        required: true
    }
},
    {
        timestamps: true
    }


);

const orgModel = mongoose.model("organization", schema);
export default orgModel;
