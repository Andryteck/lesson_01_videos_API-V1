import {Request, Response, Router} from 'express'
import {authMiddleware} from "../middlewares/auth-middleware";
import {body} from "express-validator";
import {inputValidatorMiddleware} from "../middlewares/input-validator-middleware";
import {videosService} from "../domain/videos-servise";

export const videosRouter = Router({})

videosRouter
    //Get all videos
    .get('/', async (req: Request, res: Response) => {
        res.send(await videosService.getVideos())
    })
    //Create new video
    .post('/',
        body('title').isString().withMessage('Name should be a string')
            .trim().not().isEmpty().withMessage('Name should be not empty').isLength({ min: 1, max: 40 }).withMessage('Name should be between 1 and 40 symbols'),
        inputValidatorMiddleware,
        authMiddleware,
        async (req: Request, res: Response) => {
            const createdVideo = await videosService.createVideo(req.body.title)
            res.status(201).send(createdVideo)
        })
    //Return video by id
    .get('/:videoId', async (req: Request, res: Response) => {
        const id = +req.params.videoId
        const video = await videosService.getVideoById(id)
        if (video) {
            res.send(video)
        } else {
            res.sendStatus(404)
        }
    })
    //Update existing video by id with InputModel
    .put('/:videoId',
        body('title').isString().withMessage('Name should be a string')
            .trim().not().isEmpty().withMessage('Name should be not empty').isLength({ min: 1, max: 40 }).withMessage('Name should be between 1 and 40 symbols'),
        inputValidatorMiddleware,
        authMiddleware,
        async (req: Request, res: Response) => {
            const id = +req.params.videoId
                const isComplete = await videosService.updateVideoById(id, req.body.title)
                if (isComplete) {
                    res.sendStatus(204)
                } else {
                    res.sendStatus(404)
                }
        })
    //Delete video specified by id
    .delete('/:id',
        authMiddleware,
        async (req: Request, res: Response) => {
            const id = +req.params.id
            const isComplete = await videosService.deleteVideoById(id)
            if (isComplete) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        })

