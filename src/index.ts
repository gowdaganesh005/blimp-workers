import {  Worker } from "bullmq";
import { Like } from "./Like";

import { Redis } from "ioredis";
import { Follow } from "./Follow";
import { Comment } from "./Comment"
import dotenv from "dotenv"

dotenv.config()


const redis=new Redis()



const worker=new Worker('WorkerQueue', async (job)=>{
        const queue=job.name
        switch(queue){
            case "likesQueue":
                console.log("running")
                await Like(job.data)
                return
            case "followQueue":
                console.log("got the follow request")
                await Follow(job.data)
                return
            case "commentQueue":
                console.log("got the comment reques")
                await Comment(job.data)
                return

        }
    },
    {connection:{
        port:6379
    }}
)
