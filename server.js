import express from 'express'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import productRoutes from './src/routes/products.routes.js'
import viewsRoutes from './src/routes/views.router.js'
import chatRoutes from './src/routes/chat.routes.js'
import handlebars from 'express-handlebars'
import cartRoutes from './src/routes/carts.routes.js'
import mongoose from 'mongoose'
import __dirname from './dirname.js'
import chatDao from './src/dao/chatDao.js'
import Handlebars from 'handlebars'
import path from 'path'
import { Server } from 'socket.io'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import routes from './src/routes/index.js';
import { configurePassport } from './src/config/passport.config.js';
import passport from 'passport';
import * as dotenv from "dotenv"
dotenv.config({ path: "./.env" })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.mongo_url,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15,
    }),
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
  })
);
configurePassport()
app.use(passport.initialize())
app.use(passport.session())

// websocket
const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const io = new Server(httpServer)

// hbs
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('views', __dirname + '/src/views')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/src/public')));

// routes
app.use('/', viewsRoutes)
app.use('/chat', chatRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api', routes);



// bd
mongoose.set('strictQuery', false)
mongoose.connect(process.env.mongo_url, (error) => {
  if (error) {
    console.log('Cannot connect to database' + error)
    process.exit()
  }
})

// socket io
io.on('connection', async (socket) => {
  socket.emit("historialChat", await chatDao.getMessages())
  socket.on("mensajeNuevo", async (data) => {
    let message = {
      user: data.user,
      message: data.message
    }
    await chatDao.registerMessage(message)
    io.emit("historialChat", await chatDao.getMessages())
  })
})




