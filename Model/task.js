const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    task: {type: String},
    done: {type: Boolean, default: false},
    create_date: {type: Date, default: Date.now},
    done_date: {type: Date, default: null}
})
module.exports = TaskSchema
