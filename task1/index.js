import express from 'express'
import fs from 'fs';
import morgan from 'morgan'


const PORT = 8080;
const app = express()

app.use(express.json())
app.use(morgan('combined'))
// app.post('/', (request, response) => {
//     //FOR APP.GET
//     // console.log(request.query)
//     // response.status(200).json(`${JSON.stringify(request.query)}`)
//
//     //FOR APP.POST
//     console.log(request.body)
//
//     response.status(200).json('YAAAY')
//
// })

const extensions = ['log', 'txt', 'yaml', 'json', 'xml', 'js']

const checkExtension = (filename) => {
    return extensions.includes(filename.substr((filename.lastIndexOf('.') + 1)));
}


//CREATE AND SAVE FILE
app.post('/api/files', (req, res) => {
    try {
        if (!req.body.filename || !req.body.content) {
            res.status(400).json({message: "Please specify 'content' parameter"})
        }
        if (!checkExtension(req.body.filename)) {
            res.status(400).json({message: "Please specify 'content' parameter"})
        }
        if(fs.existsSync(`api/files/${req.body.filename}`)) {
            res.status(400).json({message: "Please specify 'content' parameter"})
        }

        fs.writeFile(`api/files/${req.body.filename}`, req.body.content, function (err) {
            // console.log('content > filename');
            if(err) {
                res.status(400).json({message: "Please specify 'content' parameter"})
            }
        });

        res.status(200).json({message: "File created successfully"})
    }
    catch (e) {
        // console.log(`error is ${e}`)
        res.status(500).json({message: "Server error"});
    }
})

//GET LIST OF FILES
app.get('/api/files', (req, res) => {
    try {

        let files = fs.readdirSync('api/files');

        if(!files) {
            res.status(400).json({message: "Client error"})
        }

        res.status(200).send({message: "Success", files: files})
    }
    catch (e) {
        res.status(500).json({message: "Server error"});
    }
})


//SHOW FILE CONTENT
app.get('/api/files/:filename', (request, response) => {
    try {
        const {filename} = request.params;
        if(!fs.readdirSync('api/files').includes(filename)) {
            response.status(400).json({message: `No file with ${filename} filename found`})
        }
        if (!filename) {
            response.status(400).json({message: `No file with ${filename} filename found`})
        }


        fs.readFile(`api/files/${filename}`, 'utf8', async function(err, data){
            if(err) {
                response.status(400).json({message: `No file with ${filename} filename found`})
            }
            const uploadedDate = (await fs.promises.stat(`api/files/${filename}`)).mtime;

            response.status(200).send({
                message: "Success",
                filename: filename,
                content: data,
                extension: filename.split('.').reverse()[0],
                uploadedDate: uploadedDate
            })
        });
    }
    catch(e) {
        response.status(500).json({message: "Server error"});
    }
})

//CHANGE FILE CONTENT
app.put('/api/files/:filename', async (request, response) => {
    try {
        const {filename} = request.params;
        const newContent = request.body.content;
        if(!fs.readdirSync('api/files').includes(filename)) {
            response.status(400).json({message: "Please specify 'content' parameter"})
        }
        if (!filename) {
            response.status(400).json({message: "Please specify 'content' parameter"})
        }

        await fs.promises.writeFile(`api/files/${filename}`, newContent)

        response.status(200).json({message: "File edited successfully"})
    } catch (e) {
        response.status(500).json({message: "Server error"});
    }
})


app.delete('/api/files/:filename', (request, response) => {
    try {
        const {filename} = request.params;
        if(!fs.readdirSync('api/files').includes(filename)) {
            response.status(400).json({message: `No file with ${filename} filename found`})
        }
        if (!filename) {
            response.status(400).json({message: `No file with ${filename} filename found`})
        }

        fs.unlinkSync(`api/files/${filename}`)

        response.status(200).json({message: "File deleted successfully"})
    } catch (e) {
        response.status(500).json({message: "Server error"});
    }
})

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
