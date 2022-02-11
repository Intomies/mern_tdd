import express from 'express'
import 'dotenv/config'
import MessageApp from './lib/model.js'

const app = express()
const port = process.env.PORT || 5000

const messageApp = new MessageApp('./lib/json/testMessages.json')

app.get('/', async (req, res) => {
    const result = messageApp.getAll()
    res.json(result)
})

app.listen(port, () => { 
    console.log(`App running at http://localhost:${port}`)
})
export default app;

