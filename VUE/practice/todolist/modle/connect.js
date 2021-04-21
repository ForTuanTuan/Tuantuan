const mongoose = require('mongoose');

mongoose.connect('mongodb://yatou:kuaile520@localhost/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库链接成功')
}).catch(err => {
    console.log('数据库链接失败')
})

const todos = mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        require: true
    }
})

const Todo = mongoose.model('Todo', todos);

module.exports = Todo;