import { client } from "./db";

export async function Follow(data:{followerId:string,followeeId:string}){
    console.log(data.followeeId)
    try {
        const exists=await client.following.findFirst({
            where:{
                followerId:data.followerId,
                followeeId:data.followeeId
            }
        })
        if(exists){
            await client.following.delete({
                where:{
                    followId:exists.followId
                }
            })
            await client.user.update({
                where:{
                    userId:data.followeeId
                },
                data:{
                    followerCount:{
                        decrement:1
                    }
                }
            })
            await client.user.update({
                where:{
                    userId:data.followerId
                },
                data:{
                    followingCount:{
                        decrement:1
                    }
                }
            })
            
            return 
        }
        else{
            await client.following.create({
                data:{
                    followeeId:data.followeeId,
                    followerId:data.followerId
                }
            })
            await client.user.update({
                where:{
                    userId:data.followeeId,

                },
                data:{
                    followerCount:{
                        increment:1
                    }
                }
            })
            await client.user.update({
                where:{
                    userId:data.followerId
                },
                data:{
                    followingCount:{
                        increment:1
                    }
                }
            })
            console.log("follow")
            return
        }
        
    } catch (error) {
        console.log(error)
        return
    }
}