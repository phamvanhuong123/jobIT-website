import axios from "axios";

export const uploadFile =async (file : File) =>{
    if (!file) return 

    const data = new FormData();

    data.append("file",file);
    data.append("upload_preset","job-website");
    data.append("api_key", "478336913517739");

  try{
      const res = await axios.post("https://api.cloudinary.com/v1_1/dj5i0dfhk/auto/upload",data,{
         headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log(res.data.secure_url)
    return res.data.secure_url;
  }catch(e){
    console.log(`upload file thất bại ${e}` )
  }

    
}