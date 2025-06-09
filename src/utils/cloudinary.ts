export const uploadAvatarToCloudinary = async (file: File, userId: string) => {
  const formData = new FormData()
  const timestamp = Date.now()
  const uniqueFileName = `avatar_${userId}_${timestamp}`

  formData.append("file", file)
  formData.append("upload_preset", "avatar_upload")
  formData.append("public_id", `pet-love-avatars/${uniqueFileName}`)

  const response = await fetch("https://api.cloudinary.com/v1_1/dwccgh4vu/image/upload", {
    method: "POST",
    body: formData,
  })

  const data = await response.json()
  return data.secure_url as string
}
