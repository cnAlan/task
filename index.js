#!/usr/bin/env node
console.log(__dirname)
const {
  getAll, close, createTask, updateTask, removeTask, doneTask, find
} = require('./Model')
const yargs = require('yargs')
const taskExist = argvs=> {
    if(!argvs.task) {
      console.log('请您提交正确的任务！');
      return false;
    }
    return true;
}
const getTime = time=> {
  const dateObj = new Date(time)
  return `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDay()}|${dateObj.getHours()}-${dateObj.getMinutes()}-${dateObj.getSeconds()}`
}

yargs
  .command('add [task]', 'add task', yarg=> {
    yargs
      .positional('task', {
        default: null
      })
  }, argv=> {
    if(!taskExist(argv)) return;
    createTask(argv.task)
      .then(doc=> {
        console.log('创建任务成功')
        close();
      })
      .catch(err=> {
        console.log('已经存在此任务！')
        close();
      })
  })

  .command('remove [task]', 'remove the task', yargs=> {
    yargs.positional('task', {
      default: null
    })
  }, argv=> {
    if(!taskExist(argv)) return;
    removeTask(argv.task)
      .then(doc=> {
        if(doc.ok) {
          console.log('删除成功')
        }
        close();
      })
  })

  .command('update [task] [oldTask]', 'update the task', yargs=> {
    yargs.option('task', {
      default: null
    })
  }, argv=> {
    if(!argv.task || !argv.oldTask) {
      console.log('请提交任务名以及新的任务')
      return false;
    }
    updateTask(argv.task, argv.oldTask)
      .then(doc=> {
        if(doc.ok) {
          console.log('修改成功')
        }
        close();
      })
      .catch(err=> {
        console.log('当前已经存在新的任务名，请更换')
        close();
      })
  })
  .command('done [task]', 'done task', yargs=> {
    yargs.positional('task', {
      default: null
    })
  }, argv=> {
    if(!taskExist(argv)) return;
    doneTask(argv.task)
      .then(doc=> {
        if(doc.ok) {
          console.log('已完成')
        }else {
          console.log('失败！')
        }
        close();
      })
  })
  .command('list', 'get all list', yargs=>false, argv=> {
    getAll()
      .then(doc=> {
        // if(parseInt(process.version.split('.')[0].substr(1)) >= 10) {}
        // const box = {}
        doc.forEach(task=> {
          console.log()
          console.log(`${task.task} => ${task.done ? '已完成':'未完成'} 创建时间：${getTime(task.create_date)} 完成时间：${task.done_date ? getTime(task.done_date) : '还未完成'}`)
        })
        close();
      })
  })
  .command('get [task]', 'get list', yargs=> {
    yargs.positional('task', {
      default: null
    })
  }, argv=> {
    if(!taskExist(argv)) return false;
    find(argv.task)
      .then(doc=> {
        if(doc){
          console.log(`${doc.task} => ${doc.done ? '已完成':'未完成'} 创建时间：${getTime(doc.create_date)} 完成时间：${doc.done_date ? getTime(doc.done_date) : '还未完成'}`)
        } else {
          console.log('没有找到任务')
        }
        close();
      })
  })
  .argv
