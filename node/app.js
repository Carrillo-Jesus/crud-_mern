import express from "express";

import cors from "cors";

import db from "./database/db.js";

import router from "./routes/routes.js";
process.env.TZ = 'America/Bogota';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/blogs', router);

app.get('/', (req, res) => {
    res.send('Bienvenido a la api blogs');
});

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
    // db.sync();
    console.log('Database synced successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.listen(8000, () => {
    console.log('Server is running on port http://localhost:8000/');
});