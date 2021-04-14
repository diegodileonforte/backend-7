import fs from 'fs'
import express from 'express';

const app = express()
const port = 8080

const path = './archivos/productos.txt'

const items = fs.readFileSync(path, 'utf8')

const randomItem = () => {

    const itemsArray = JSON.parse(items)

    return JSON.stringify(itemsArray[Math.floor(Math.random() * (itemsArray.length - 0)) + 0])

}

let visitasRuta1 = 0
let visitasRuta2 = 0

app.get('/items', (req, res) => {
    visitasRuta1++
    res.send(`{items: ${items}, cantidad: ${JSON.parse(items).length}}`)
})

app.get('/items-random', (req, res) => {
    visitasRuta2++
    res.send(`{item: ${randomItem()}`)
})

app.get('/visitas', (req, res) => {

    res.send(`{visitas: {items: ${visitasRuta1}, item: ${visitasRuta2}}`)
})


const server = app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`)
})

server.on('error', err => console.log(`Error message: ${err}`))