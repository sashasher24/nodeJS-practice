import express from 'express'
import fs from "fs";


const PORT = 8080;

const app = express()
app.use(express.json())

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

app.post('/files', (req, res) => {
    try {

        if (!req.body.filename || !req.body.content) {
            throw new Error("Incorrect name of parameters!");
        }
        if (!checkExtension(req.body.filename)) {
            throw new Error("Incorrect extension!")
        }
        console.log(req.body)

        // if(checkExtension(req.body.filename)) console.log('correct extension')
        // else console.log('wrong extension')

        fs.writeFile(req.body.filename, req.body.content, function (err) {
            // if (err) return console.log(err);
            console.log('content > filename');
        });

        res.status(200).json('WORKING')
    }
    catch (e) {
        console.log(`error is ${e}`)
        res.status(400).json(`${e}`);

        // throw new Error(e)
    }

})



app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
