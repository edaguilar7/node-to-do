const argv = require('./config/yargs').argv
const { crear, list, updateTask, removeTask } = require('./por-hacer/por-hacer')

let comando = argv._[0]


let response = ''
switch (comando) {
    case 'crear':
        let task = crear(argv.description)
        console.log("task", task)
        break
    case 'listar':
        list()
        break
    case 'actualizar':
        response = updateTask(argv.description, argv.completed)
        if (response) {
            console.log('Task updated successfully')
        } else {
            console.log('The action wasnt done')
        }
        break
    case 'borrar':
        response = removeTask(argv.description)
        if (response) {
            console.log('Task removed successfully')
        } else {
            console.log('The action wasnt done')
        }
        break
    default:
        console.log('Comando no reconocido')
        break
}