let rc = 0; // Contador de lectores
let writing = false; // Indica si hay un escritor escribiendo
var mensajeDiv = document.getElementById("database");

//Lectores
let numLectores = 0;
let numLectoresF = 0;

//Escritores
let numEscritores = 0;
let numEscritoresF = 0;

//Consola
let globalConsole = [];

function startReader() {
    // El lector intenta entrar
    if (!writing) {
        rc++;
        readDatabase();
    } else {
        alert('No se podra leer hasta que el escritor termine de escribir');
        setTimeout(startReader, 1000); // Intenta nuevamente después de 1 segundo
    }
}

function startWriter() {
    if (!writing && rc === 0) {
        writing = true;
        writeDatabase();
    } else {
        alert('No se puede escribir hasta que terminen de leer u otro escritor halla terminado de escribir');
        setTimeout(startWriter, 1000); // Intenta nuevamente después de 1 segundo
    }
}

function readDatabase() {
    numLectores++;
    var mensaje = `(${numLectores}) Lector leyendo la base de datos...`;
    globalConsole.push(mensaje);
    
    // Actualizar el contenido del textarea con los mensajes
    updateMessageLector(mensaje);
    updateGlobalMessage(globalConsole);

    setTimeout(() => {
        rc--;
        if (rc === 0) {
            writing = false;
        }
        numLectoresF++;
        var mensajeTerminado = `(${numLectoresF}) Lector terminó de leer.`;
        globalConsole.push(mensajeTerminado);
        updateMessageLector(mensajeTerminado);
        updateGlobalMessage(globalConsole);
    }, 5000); // Simulamos que el lector tarda 5 segundos en leer
}

function writeDatabase() {
    numEscritores++;
    var mensaje = `(${numEscritores}) Escritor escribiendo en la base de datos...`;
    globalConsole.push(mensaje);

    updateMessageEscritor(mensaje);
    updateGlobalMessage(globalConsole);

    setTimeout(() => {
        writing = false;

        numEscritoresF++;
        var mensajeTerminado = `(${numEscritoresF}) Escritor terminó de escribir.`;
        globalConsole.push(mensajeTerminado);
        updateMessageEscritor(mensajeTerminado);
        updateGlobalMessage(globalConsole);
        //console.log("Escritor terminó de escribir.");
    }, 5000); // Simulamos que el escritor tarda 5 segundos en escribir
}

function updateGlobalMessage(messages) {
    var mensajeMostrado = document.getElementById("globalMessage");
    mensajeMostrado.innerHTML = messages.join("<br>");
}

function updateMessageLector(messages) {
    mensajeDiv.innerHTML = `${messages}`;
}

function updateMessageEscritor(messages) {
    mensajeDiv.innerHTML = `${messages}`;
}