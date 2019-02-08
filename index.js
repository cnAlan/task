#!/usr/bin/env node
const yargs = require('yargs')
const path = require('path')
const { get, update, remove, select, add, done } = require(path.resolve(__dirname, './lib/HandleLocalData'))
const taskExist = (argvs, isNeedUpdate, message)=> {
    if(argvs.task === null || (isNeedUpdate && !argvs.newTask)) {
      console.log(message)
      return false;
    }
    return true;
}

const argv = yargs
  .command('add [task]', 'add task', yarg=> {
    yargs
      .positional('task', {
        default: null
      })
  }, argv=> {
    if(!taskExist(argv, null, '请输入要添加的任务')) return;
    const adder = add(argv.task)
    if(adder) {
      console.log(`添加成功 \n ${adder}`)
    } else {
      console.log('添加失败')
    }
  })

  .command('remove [task]', 'remove the task', yargs=> {
    yargs.positional('task', {
      default: null
    })
  }, argv=> {
    if(!taskExist(argv, null, '请输入要删除的任务')) return;
    const removed = remove(argv.task)
    if(removed) {
      console.log(`删除成功\n${removed}`)
    } else {
      console.log('删除失败')
    }
  })

  .command('update [task] [newTask]', 'update the task', yargs=> {
    yargs.option('task', {
      default: null
    })
  }, argv=> {
    if(!taskExist(argv, true, '请检查参数(原来任务编号，更新任务的内容)')) return false;
    const updated = update(argv.task, argv.newTask)
    if(updated) {
      console.log(`更新成功\n ${updated}`)
    } else {
      console.log('更新失败')
    }
  })
  .command('done [task]', 'done task', yargs=> {
    yargs.positional('task', {
      default: null
    })
  }, argv=> {
    if(!taskExist(argv, null, '请输入要完成的任务编号')) return;

    const doned = done(argv.task)
    if(doned) {
      console.log(`修改成功\n ${doned}`)
    } else {
      console.log(`修改失败`)
    }
  })

  .command('get [task]', 'get list', yargs=> {
    yargs.positional('task', {
      default: null
    })
  }, argv=> {
    if(!taskExist(argv, null, '请输入要获取的任务编号')) return false;
    const selected = select(argv.task)
    if(selected) {
      console.log(selected)
    } else {
      console.log('不存在该任务')
    }
  })

  .command('$0', 'the default command', () => {}, (argv) => {
      const datas = get();
      console.log(datas);
  })

  .argv

