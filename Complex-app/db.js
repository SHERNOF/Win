const mongodb = require('mongodb')
const connectionString = 'mongodb+srv://shernof:Shernof78@cluster0-xnirm.mongodb.net/WinDB?retryWrites=true&w=majority'
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)
})