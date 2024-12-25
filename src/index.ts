import {  Worker } from "bullmq";
import { Like } from "./Like";

import { Redis } from "ioredis";


const redis=new Redis()



const worker=new Worker('WorkerQueue', async (job)=>{
        const queue=job.name
        switch(queue){
            case "likesQueue":
                console.log("running")
                await Like(job.data)
                return

        }
    },
    {connection:{
        port:6379
    }}
)
