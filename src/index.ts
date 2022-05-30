import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videosRouter} from "./routes/videos-routes";
import {authMiddleware} from "./middlewares/auth-middleware";
import {runDb} from "./repositories/db";

const jsonBodyMiddleware = bodyParser.json()
const app = express()
const port = process.env.PORT || 5000

app.use(jsonBodyMiddleware)
app.use(cors())
app.use(authMiddleware)
app.use('/videos', videosRouter)

//Home
app.get('/', (req: Request, res: Response) => {
    res.send('use endpoint: /videos')
})

async function startServer() {
    await runDb()
    await app.listen(port, () => {
        console.log(`Videos app listening on port ${port}`)
    })
}

startServer()



