const postCollection = require('../db').collection('posts')
const ObjectID = require('mongodb').ObjectID

let Post = function(data, userid){
    this.data = data
    this.errors= []
    this.userid = userid
}


Post.prototype.cleanUp = function() {
    if(typeof(this.data.title) != "string"){this.data.title = ""}
    if(typeof(this.data.body) != "string"){this.data.body = ""}

    // get rid of bogus info
    this.data = {
    title: this.data.title.trim(),
    body: this.data.body.trim(),
    createdDate: new Date(),
    author: ObjectID(this.userid)
}
}

Post.prototype.validate = function() {
    if(this.data.title == "") {this.error.push("You must provide a title")}
    if(this.data.body == "") {this.error.push("You must post a content")}
}

Post.prototype.create = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
            //save post in db
            postCollection.insertOne(this.data).then(function(){
                resolve()
            }).catch(function(){
                this.errors.push("Pls try again")
                reject(this.errors)
            })
            
        }else{
            reject(this.errors)
        }
    })
}

module.exports = Post