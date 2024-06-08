import { CLOUDINARY_URL } from "./Keys";

export const uploadToCloudinary = async(pics) => {
    if(pics) {
        const data = new FormData();
        data.append("file",pics)
        data.append("upload_preset", "converseSphere")
        data.append("cloud_name","dedin3mih")

        const res = await fetch(`https://api.cloudinary.com/v1_1/dedin3mih/image/upload`,{
            method: "POST",
            body: data
        })

        const fileData = await res.json();
        return fileData.url.toString();
    }
    else console.error("Error from cloudinary")
}