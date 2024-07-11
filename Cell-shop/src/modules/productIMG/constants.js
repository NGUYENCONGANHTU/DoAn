
export const convertFormData = (model)  => {
    const formData = new FormData()
    formData.append("file_name", model.file_name[0])
    formData.append("product_id", model.product_id)
    formData.append("status", model.status)
    if (model.id) {
        formData.append("id", Number(model.id))
        formData.append("isUpload", Number(model.isUpload))
        formData.append("_method", "PUT")
    }
    return formData
}