import { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse, v2 } from "cloudinary";
import { v2 as cloudinary } from 'cloudinary';


export class CloudinaryService {
    constructor(){
        v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })
        
    }
    async uploadImage(filePath: string,options?: UploadApiOptions): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            v2.uploader.upload(filePath,{folder:'Primechase Studios',options}, (error,result)=>{
                if(error){
                    return reject(error)
                }
                if (!result) {
                    return reject(new Error('Upload result is undefined'));
                }
                const optimizedUrl = cloudinary.url(result.public_id, {
                transformation: [
                    { width: 800, crop: 'limit' },
                    { quality: 'auto' },
                    { fetch_format: 'auto' }
                ],
                secure:true
                });

                (result as any).optimized_url = optimizedUrl;
                
                resolve(result)
            })
        })
    }
}