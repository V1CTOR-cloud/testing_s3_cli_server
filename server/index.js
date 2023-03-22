const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./routes.routes')
const app = express();


app.use(cors({
    origin: '*' /* http://localhost:5173 OR http://yourdomain.com */
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './files'
}));

app.use(routes)

app.use(express.static('files'))

app.listen(3000);
console.log(`Server listening on port ${3000}`);