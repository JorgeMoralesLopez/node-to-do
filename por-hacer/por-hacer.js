const fs = require('fs');

let listadoPorHacer = [];

//Guardar eb DB
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error(err);
        /*else 
            resolve(`data.json`)*/
        
    });
}
//Cargar en DB
const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');
    }
    catch (err) {
        listadoPorHacer = [];
    }
}

//Crear tarea
const crear = descripcion => {

    cargarDB()
  
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB(listadoPorHacer)

    return porHacer;

}
//Listar tarea
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

//Actualizar tarea
const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        //asignamos
        listadoPorHacer[index].completado = completado;
        guardarDB()
        return true;
    }
    else {
        return false
    }
    
}

const borrar = (descripcion) => {

    cargarDB();
    
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    console.log('nuevoListado', nuevoListado)

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    }
    else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

        // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    // if (index) {
    //     console.log('index', index)
    //     listadoPorHacer.splice(index, 1);
    //     console.log('listadoPorHacer', listadoPorHacer)
    //     guardarDB()
    //     return true
    // }
    // else {
    //     return false
    // }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}