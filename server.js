const express = require("express"); //proporciona un sólido conjunto de características para aplicaciones web y móviles --- construir las apis Rest
const bodyParser = require("body-parser"); //proporciona una API para analizar los datos de los formularios --- ayuda a analizar la solicitud y crear el objetoreq.body
const cors = require("cors"); //proporciona una API para permitir que los clientes de una aplicación web puedan acceder a los recursos de otra aplicación web --- proporciona middleware Express para habilitar CORS

const app = express(); //crea una instancia de express

var corsOptions = {
    origin: 'http://localhost:8081' //permite que una aplicación web pueda acceder a los recursos de otra aplicación web
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); //analiza los datos de los formularios
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models"); //importar el modelo de la base de datos
const Role = db.role;

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome" }); //responde con un objeto JSON
});

//ROUTES
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/*db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});*/


function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}