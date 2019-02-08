# Task
### 用Node开发一个简单的命令行任务工具

github 地址 : https://github.com/cnAlan/task

安装方法：
```bash
    npm i task-command -g
    yarn global add task-command
```

添加一个任务：
```javascript
    task add [task]
```

修改一个任务：
```javascript
    task update [task id] [task]
```

查找一个任务:
```javascript
    task get [task id]
```

删除一个任务：
```javascript
    task remove [task id]
```

完成一个任务：
```javascript
    task done [task id]
```

获取全部任务：
```javascript
    task
```
