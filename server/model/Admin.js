import mongoose from "mongoose";
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const AdminSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "please Provide a valid Id"],
        unique: [true, "Id already exist"]
    },
    email: {
        type: String,
        required: [true, "please Provide a valid email"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    role: {
        type: String,
        default: 'Staff',
        eunm: ['Staff', 'Manager', 'Admin']
    },
    blocked: {
        type: Boolean,
        default: false
    },
    username: {
        type: String, 
    },
    firstName: {
        type: String, 
    },
    lastName: {
        type: String, 
    },
    profile: {
        type: String, 
    },
    dob: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    },
    country: {
        type: String
    }
},
{ timestamps: true}
)

AdminSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        return next();
    };
  
    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

AdminSchema.methods.matchPasswords = async function(password){
    return await bcryptjs.compare(password, this.password)
}

AdminSchema.methods.getSignedToken = function(){
    return jsonwebtoken.sign({ id: this._id, isAdmin: true, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

const AdminModel =  mongoose.model('adminUser', AdminSchema);
export default AdminModel