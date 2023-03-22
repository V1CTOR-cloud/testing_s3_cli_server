const { Router } = require('express');
const { uploadFile, readFile } = require('./s3');
const router = Router();

router.get('/', (req, res) => res.send('<h1> Welcome to the server! </h1>'));
/* UPLOAD */
router.post('/upload', async(req, res) => {
    const result = await uploadFile(req.files['photo']); /* JSON */
    console.log(result);
    res.send('File Uploaded');
});


/* GET FILE */
router.get('/file', async(req, res) => {
    try {
        const result = await readFile(req.params.fileName)
        res.send('file saved');
    } catch (error) {
        res.send(error.message);
        console.log(error);
    }
});

module.exports = router;