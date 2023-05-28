import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [4, "Name should be atleast 4 characters long"],
        maxLength: [30, "Name should be less than 30 characters"]
    },
    phone: {
        type: String,
        required: [true, "Phone, is required"],
        match: [/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/, "Invalid phone number"]
    }
})

const User = models.User || model("User", UserSchema)

export default User