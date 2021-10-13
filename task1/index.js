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
            throw new Error("Incorrect name of parameters!");
        }
        if (!checkExtension(req.body.filename)) {
            throw new Error("Incorrect extension!")
        }
        if(fs.existsSync(`api/files/${req.body.filename}`)) {
            throw new Error("File already exists!:(")
        }

        fs.writeFile(`api/files/${req.body.filename}`, req.body.content, function (err) {
            // console.log('content > filename');
            if(err) {
                throw new Error(`${err}`)
            }
        });

        res.status(200).json('File saved')
    }
    catch (e) {
        // console.log(`error is ${e}`)
        res.status(400).json(`${e}`);
    }
})

//GET LIST OF FILES
app.get('/api/files', (req, res) => {
    try {
        // if(req.query.path !== 'api/files' || !req.query.path) {
        //     throw new Error('Incorrect path to files!')
        // }
        let files = fs.readdirSync('api/files');

        res.status(200).send(files)
    }
    catch (e) {
        res.status(400).send(`${e}`);
    }
})


//SHOW FILE CONTENT
app.get('/api/file', (request, response) => {
    try {
        if(!fs.readdirSync('api/files').includes(request.query.filename)) {
            throw new Error(`File doesn't exist!`)
        }
        if (!request.query.filename) {
            throw new Error("Incorrect name of parameter!");
        }

        fs.readFile(`api/files/${request.query.filename}`, 'utf8', function(err, data){
            if(err) {
                throw new Error('error happened')
            }

            response.status(200).send(data)
        });
    }
    catch(e) {
        response.status(400).send(`${e}`);
    }
})

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
