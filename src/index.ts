import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
const app = express()
const port = 5000
app.use(cors())
app.use(bodyParser());

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!')
})

app.get('/videos', (req: Request, res: Response ) => {
    res.send(videos)
})

app.get(`/videos/:id`, (req: Request, res: Response ) => {
    const id = +req.params.id
    const video = videos.find(i => i.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }

})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(200)
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const filteredVideos = videos.filter(i => i.id !== +req.params.id)
    res.send(filteredVideos)
})

app.put('/videos/:id', (req: Request, res: Response) => {
   const id = +req.params.id
   const video = videos.find(i => i.id === id)
  if (video) {
      video.title = req.body.title
      res.send(200)
  } else {
      res.send(404)
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
