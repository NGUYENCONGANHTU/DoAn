
export const convertFormData = (model)  => {
    const formData = new FormData()
    formData.append("images", model.images[0])
    for(let i = 0 ; i < model.sub_img_details.length; i++){
        formData.append("sub_img_details[]", model.sub_img_details[i])
    }
    formData.append("id_sub_product_attributes[]", String(model.id_sub_product_attributes))
    formData.append("category_id", String(model.category_id))
    formData.append("trademark_id", String(model.trademark_id))
    formData.append("price", model.price)
    formData.append("sale_price", model.sale_price)
    formData.append("type", String(model.type))
    formData.append("name", model.name)
    formData.append("status", String(model.status))
    formData.append("description", String(model.description))
    if (model.id) {
        formData.append("isUpload", String(model.isUpload))
        formData.append("id", String(model.id))
        formData.append("_method", "PUT")
    }
    return formData
}


export const convertFormDataDetail = (model)  => {
    const formData = new FormData()
    formData.append("images", model.images[0])
    formData.append("category_id", String(model.category_id))
    formData.append("trademark_id", String(model.trademark_id))
    formData.append("price", model.price)
    formData.append("sale_price", model.sale_price)
    formData.append("type", String(model.type))
    formData.append("name", model.name)
    formData.append("status", String(model.status))
    formData.append("description", String(model.description))
    if (model.id) {
        formData.append("isUpload", String(model.isUpload))
        formData.append("id", String(model.id))
        formData.append("_method", "PUT")
    }
    return formData
}