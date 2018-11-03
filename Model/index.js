const mongoose = require('mongoose')
const taskSchema = require('./task')
const db = mongoose.connect('mongodb://127.0.0.1:27017/task', { useNewUrlParser: true })

const taskModel = mongoose.model('task', taskSchema)

exports.getAll = ()=> taskModel.find({})

exports.find = task=> taskModel.findOne({task})

exports.createTask = task=> {
    return new Promise((resolve, reject)=> {
        exports.find(task).then(doc=> {
            if(doc) {
                reject({message: 'the task it\'s exist!!!'})
            } else {
                taskModel.create({task})
                    .then(doc=> resolve(doc))
                    .catch(err=> reject(err))
            }
        })
    })
}
exports.updateTask = (old, val)=> {
    return new Promise((resolve, reject)=> {
        exports.find(val).then(doc=> {
            if(doc) {
                reject({message: 'the task it\'s exist!!!'})
            } else {
                taskModel.updateOne({task: old}, {$set: {task: val}})
                    .then(doc=> resolve(doc))
                    .catch(err=> reject(err))
            }
        })
    })
}



exports.removeTask = task=> taskModel.deleteOne({task})

exports.doneTask = task=> taskModel.updateOne({task}, {$set: {
    done: true,
    done_date: Date.now()
}})

exports.close = ()=> mongoose.disconnect();
