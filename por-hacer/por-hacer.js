const fs = require('fs')
const colors = require('colors')

let toDoList = []

const crear = (description) => {
    loadDB()
    let toDo = {
        description,
        completed: false,
    }

    toDoList.push(toDo)
    saveDB()

    return toDo
}

const loadDB = () => {
    try {
        toDoList = require('../db/data.json')
    } catch (error) {
        toDoList = []
    }
}

const saveDB = () => {
    const data = JSON.stringify(toDoList)
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    })
}

const list = () => {
    try {
        loadDB()
        const toDoItems = (toDoList || []).map((task) => {
            console.log('============= To do ============='.green)
            console.log(task.description)
            console.log(task.completed)
            console.log('================================='.green)
        })

        return toDoItems ? toDoItems : 'No tasks to do'
    } catch (err) {
        throw 'Error at listing to do tasks: ' + err
    }
}

const updateTask = (description, completed = true) => {
    loadDB()
    let index = (toDoList || []).findIndex(task => task.description === description)
    if (index >= 0) {
        toDoList[index].completed = completed
        saveDB()
    }
    return index >= 0
}

const removeTask = description => {
    loadDB()
    const remain = (toDoList || []).filter(task => task.description !== description)

    if (remain.length !== toDoList.length) {
        toDoList = remain
        saveDB()
        return true
    }
    return false
}

module.exports = {
    crear,
    saveDB,
    list,
    updateTask,
    removeTask
}