import express, { Request, Response } from 'express'
import { routes } from './routes'
import { createServer } from 'http';
import { Server, Socket } from 'socket.io'
import path from 'path';

import './database'
import bodyParser from 'body-parser'

const app = express()

app.use(express.static(path.join(__dirname, '..', "public")))
app.set("views", path.join(__dirname, '..', 'public'))
app.engine("html", require('ejs').renderFile);
app.set("view engine", 'html')

app.get('/', (req: Request, res: Response) => {
  return res.render('html/client.html')
})

const http = createServer(app);
const io: Server = new Server(http)

io.on('connection', (socket: Socket) => {
  console.log('se conectou ' + socket.id)
})

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

app.use(routes)

export { http, io }