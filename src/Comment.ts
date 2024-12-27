import { client } from "./db";

export async function Comment(data:{postId:string,userId:string,comment:string}){
    console.log(data)
    
    try {
        
            await client.comments.create({
                data:{
                    postId:data.postId,
                    userId:data.userId,
                    comment:data.comment
                }
            })
            await client.post.update({
                where:{
                    postId:data.postId,

                },
                data:{
                    Num_Comments:{
                        increment:1
                    }
                }
            })
            
            console.log("comment")
            return
        
        
    } catch (error) {
        console.log(error)
        return
    }
}