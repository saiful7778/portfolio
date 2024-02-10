export default async function imageUpload(imgData, imgName) {
  try {
    const formData = new FormData();
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_APIKEY);
    formData.append("image", imgData);
    formData.append("name", imgName);
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    if (!resData.success) {
      throw new Error("Image not uploaded!");
    }
    return resData;
  } catch (err) {
    throw new Error(err);
  }
}
