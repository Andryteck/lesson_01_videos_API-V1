export type VideoType = {
    id: number;
    title: string;
    author: string;
}

import {videos} from "./db";

export const videosRepository = {
    getVideos() {
        return videos
    },
    getVideoById(id: number) {
        const video = videos.find(v => v.id === id)
        return video
    },
    deleteVideoById(id: number) {
        const videoToDel = videos.find(v => v.id === id)
        if (videoToDel) {
            videos.splice(videos.indexOf(videoToDel), 1)
            return true
        } else return false
    },
    updateVideoById(id: number, title: string) {
        const video = videos.find(v => v.id === id)
        if (video) {
            video.title = title
            return true
        } else return false
    },
    createVideo(newVideo: VideoType) {
        videos.push(newVideo)
        return newVideo
    }
}