const express = require('express');

const path = require('path');

require('./modle/connect')

const todos = require('./modle/connect')

const bodyparser = require('body-parser')
const pagination = require('mongoose-sex-page')
const app = express();

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'todo')))

app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'todo'));
app.set('view engine', 'art')

app.get('/todolist', async(req, res) => {
    res.render('./index')
})


app.post('/todolist/active', async(req, res) => {
    var todosValue = await todos.find({ status: true });
    res.send(todosValue)
})

app.post('/todolist/all', async(req, res) => {
    var todosValue = await todos.find();
    res.send(todosValue)
})

app.post('/todolist/completed', async(req, res) => {
    var todosValue = await todos.find({ status: false });
    res.send(todosValue)
})

app.post('/todolist/clearCompleted', async(req, res) => {
    await todos.deleteMany({ status: false });
    var todosValue = await todos.find();
    res.send(todosValue)
})


app.post('/todolist', async(req, res) => {
    var todosValue = await todos.find();
    res.send(todosValue)
})

app.post('/todolist/upload', async(req, res) => {
    var params = req.body;
    await todos.create(params)
    var todosValue = await pagination(todos).find().page(1).size(50).display(5).exec();
    res.send({
        todosValue: todosValue.records
    })
})

app.post('/todolist/status', async(req, res) => {
    var { id, thisStatus } = req.body;
    console.log(id)
    try {
        await todos.updateOne({ _id: id }, { status: thisStatus });
        let todosValue = await todos.find()
        res.send(todosValue)
    } catch (error) {
        res.send(error)
    }
})

app.post('/todolist/delete', async(req, res) => {
    var { id } = req.body;
    console.log(id)
    try {
        await todos.findOneAndDelete({ _id: id });
        let todosValue = await todos.find()
        res.send(todosValue)
    } catch (error) {
        res.send('错误' + error)
    }

})

app.post('/todolist/edit', async(req, res) => {
    var { thisValue, thisID } = req.body;
    try {
        await todos.updateOne({ _id: thisID }, { todo: thisValue });
        let todosValue = await todos.find()
        res.send(todosValue)
    } catch (error) {
        res.send(error)
    }

})



app.listen(3000);
console.log('server create success')