import 'dotenv/config'
const {MongoClient} = require('mongodb');

const mongoUri =
    process.env.mongoURI

const client = new MongoClient(mongoUri)
export const videosCollection = client.db().collection("videos")

export async function runDb() {
    try {
        await client.connect()
        await client.db("videosApi").command({ping: 1})
        console.log("Connection complete")
    } catch (e) {
        await client.close()
        console.log("no connection")
    }
}

export let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'}
]
