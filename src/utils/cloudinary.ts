export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData()
  const uniqueId = Date.now()

  formData.append("file", file)
  formData.append("upload_preset", "pet_love_upload")
  formData.append("public_id", `pet-love/${uniqueId}`)

  const response = await fetch("https://api.cloudinary.com/v1_1/dwccgh4vu/image/upload", {
    method: "POST",
    body: formData,
  })

  const data = await response.json()
  return data.secure_url as string
}
