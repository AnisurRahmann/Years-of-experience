import axios from 'axios'
const URL = "https://api.cloudinary.com/v1_1/shakildev/image/upload";

const uploadImageToCloudinary = async (token:string, userId:string, data:any) => {
    const response = await axios.post(URL, data)
    
}

 const utilService = {
    uploadImageToCloudinary,
}

export default utilService;