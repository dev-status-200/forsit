export default async function uploadImage(x){
    let value = ''
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "fy9voxjt");
    data.append("cloud_name", "ddkosqihs");
    value = await fetch(`https://api.cloudinary.com/v1_1/ddkosqihs/image/upload`, {
        method: "post",
        body: data
    })
      .then(resp => resp.json())
      .then(data => data.url)

    return value
};