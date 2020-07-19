const options = (completed) => {
    return {
        description: {
            alias: 'd',
            demand: true,
            desc: 'Descripcion de la tarea por hacer',
        },
        ...(completed && {
            completed: {
                alias: 'c',
                default: true,
                desc: 'Estado de la tarea por hacer',
            },
        }),
    }
}

const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', options())
    .command(
        'actualizar',
        'Actualiza el estado de completado de una tarea',
        options(true)
    )
    .command('borrar', 'Borra una tarea por hacer', options())
    .help().argv

module.exports = {
    argv,
}