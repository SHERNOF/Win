const usersCollections = require('../db').collection("users")
const validator = require('validator')
let User = function(data) {
    this.data = data
    this.errors = []
}
User.prototype.cleanUp = function (){
    if(typeof(this.data.username) != 'string') {this.data.username = ""}
    if(typeof(this.data.password) != 'string') {this.data.password = ""}
    if(typeof(this.data.email) != 'string') {this.data.email = ""}

this.data = {
     username: this.data.username.trim().toLowerCase(),
     email: this.data.email.trim().toLowerCase(),
     password: this.data.password
     }                
        
}
User.prototype.validate = function() {
    if (this.data.username == "") {this.errors.push("You must input a username")}
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username should only be letters and numbers")}
    if (this.data.username.length > 0 && this.data.username < 8) {this.errors.push("Username should not be more than 8 characters")}
    if (this.data.username.length > 30) {this.errors.push("USername must not be more than 30 characters")}
    if (this.data.password == "") {this.errors.push("You must input a password")}
    if (this.data.password.length > 0 && this.data.username < 12) {this.errors.push("Password should not be more than 12 characters")}
    if (this.data.password.length > 100) {this.errors.push("Password must not be more than 100 characters")}
    if (this.data.email == "") {this.errors.push("You must input a email")}
    if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address")}
    }
User.prototype.register = function() {
        this.cleanUp()
        this.validate()
        if(!this.errors.length) {
            usersCollections.insertOne(this.data)}
            
}    
    
module.exports = User