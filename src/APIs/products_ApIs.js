import axios from "axios";

export function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
export function getSpecificProduct(productId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
}


export function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
export function getSpecificCategories(categoryId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
}


export function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}
export function getSpecificBrand(brandId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
}

