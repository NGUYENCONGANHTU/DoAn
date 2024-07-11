
export const convertFormData = (model)  => {
    const formData = new FormData()
    formData.append("id_sub_product_attributes[]", String(model.id_sub_product_attributes))
    formData.append("product_id", Number(model.product_id))
    
    if (model.id) {
        formData.append("id", String(model.id))
        formData.append("_method", "PUT")
    }
    return formData
}