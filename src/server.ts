import express from 'express'
import { routes } from './routes' 
import './database'
import bodyParser from 'body-parser'

const app = express()

//body parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json())

app.use(routes)



app.listen(3333, () => {
  console.log('server running in port 3333')
})
