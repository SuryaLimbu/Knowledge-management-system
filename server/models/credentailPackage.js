const mongoose = require("mongoose");
const User = require("./User");

const credentailPackageSchema = new mongoose.Schema({
    title: { type: String },
    users: [User],
    packageDesc: { type: String },
    price: { type: double }
})
const CredentailPackage = mongoose.model("CredentialPackage", credentailPackageSchema)
module.exports = CredentailPackage;