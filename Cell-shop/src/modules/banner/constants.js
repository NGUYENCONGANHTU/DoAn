
export const convertFormData = (model)  => {
    const formData = new FormData()
    formData.append("images", model.images[0])
    formData.append("name", model.name)
    formData.append("link", model.link)
    formData.append("status", model.status)
    formData.append("description", model.description)
    if (model.id) {
        formData.append("isUpload", 0)
        formData.append("id", model.id)
        formData.append("_method", "PUT")
    }
    return formData
}