import { client } from "./db";

export async function Like(data:{userId:string,postId:string,liked:boolean}){
    console.log(data)
    try {
        const exists=await client.likes.findFirst({
            where:{
                userId:data.userId,
                postId:data.postId
            }
        })
        if(exists){
            await client.likes.delete({
                where:{
                    likeId:exists.likeId
                }
            })
            await client.post.update({
                where:{
                    postId:data.postId
                },
                data:{
                    Num_Likes:{
                        decrement:1
                    }
                }
            })
            console.log("Liked the comment")
            return 
        }
        else{
            await client.likes.create({
                data:{
                    userId:data.userId,
                    postId:data.postId
                }
            })
            await client.post.update({
                where:{
                    postId:data.postId,

                },
                data:{
                    Num_Likes:{
                        increment:1
                    }
                }
            })
            return
        }
        
    } catch (error) {
        console.log(error)
        return
    }
}