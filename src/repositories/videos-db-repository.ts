export type VideoType = {
    id: number;
    title: string;
    author: string;
}

import {videosCollection} from "./db";

export const videosRepository = {
    async getVideos() {
        const videosFromDB = await videosCollection
            .find({projection: {_id: 0}})
            .toArray()
        return videosFromDB
    },
    async getVideoById(id: number) {
        const videoFromDB = await videosCollection.findOne({id: id})
        if(videoFromDB){
            return {
                id: videoFromDB.id,
                author: videoFromDB.author,
                title: videoFromDB.title
            }
        }else{
            return false
        }

    },
    async deleteVideoById(id: number) {
        const result = await videosCollection.deleteOne({id})
            return result.deletedCount === 1
    },
    async updateVideoById(id: number, title: string) {
        const result = await videosCollection
            .updateOne({id}, {$set: {title}})
        return result.modifiedCount === 1
    },
    async createVideo(newVideo: VideoType) {
        await videosCollection.insertOne(newVideo)
        return {
            id: newVideo.id,
            title: newVideo.title,
            author: newVideo.author
        }
    }
}