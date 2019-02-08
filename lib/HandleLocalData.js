const path = require('path')
const fs = require('fs');
const promisify = require('util').promisify
const dataPath = path.resolve(__dirname, '../.data/data.json')
const writeFile = promisify(fs.writeFile)
const data = require(dataPath)
const dataKeys = Object.keys(data)
const hasData = dataKeys.length

const getDate = function(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const day = dateObj.getDay()
    const Hours = dateObj.getHours()
    const Minutes = dateObj.getMinutes()
    const Seconds = dateObj.getSeconds()

    return `${year}/${month}/${day} ${Hours}:${Minutes}:${Seconds}`;
}

exports.get = function() {
    let string = ``;

    if(hasData) {
        string += `编号 : 任务 => 创建时间 => 完成情况\n`
        for(let val in data) {
            string += `\n${val} : ${data[val].task} => ${getDate(data[val].date)} => ${data[val].done}\n`
        }
    } else {
        string = `您还未添加任何任务，请进行添加！`
    }
    return string;
}

exports.select = function(task) {
    if(data[task]) {
        return `\n${task} : ${data[task].task} => ${getDate(data[task].date)} => ${data[task].done}\n`;
    }
    return false;
}

exports.remove = function(task) {
    if(data[task]) {
        let str = `\n${task} : ${data[task].task} => ${getDate(data[task].date)} => ${data[task].done}\n`;
        delete data[task]
        exports.save();
        return str;
    }
    return false;
}

exports.update = function(task, newTask) {
    if(data[task]) {
        data[task].task = newTask;
        data[task].date = Date.now();
        exports.save();

        return `\n${task} : ${data[task].task} => ${getDate(data[task].date)} => ${data[task].done}\n`;
    }
    return false;
}

exports.add = function(task) {
    const id = hasData ? parseInt(dataKeys[dataKeys.length-1]) + 1 : 0;
    data[id] = {
        task,
        date: Date.now(),
        done: false
    }
    exports.save();
    return `\n${id} : ${data[id].task} => ${getDate(data[id].date)} => ${data[id].done}\n`;
}

exports.done = function(task) {
    data[task].done = true;
    exports.save();
    return `\n${task} : ${data[task].task} => ${getDate(data[task].date)} => ${data[task].done}\n`;
}

exports.save = function() {
    writeFile(dataPath, JSON.stringify(data));
}
