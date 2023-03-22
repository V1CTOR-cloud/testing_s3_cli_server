require('dotenv').config();
const fs = require('fs');
const {
    S3Client,
    AbortMultipartUploadCommand,
    PutObjectCommand,
    GetObjectCommand,
} = require('@aws-sdk/client-s3')

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }

});

async function uploadFile(file) {
    const stream = fs.createWriteStream(file.tempFilePath);
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command);
}


async function readFile(fileName) {
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: fileName
    })
    const result = await client.send(command);
    result.Body.pipe(fs.createWriteStream('./files/206929f96ffaec4c3e067bed111117f4.json'));
}

module.exports = {
    uploadFile,
    readFile
}