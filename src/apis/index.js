import axios from 'axios'

//const BASE_URL = import.meta.env.VITE_API_URL || 'https://swasthika-florals-backend.onrender.com/api/vi/'
const BASE_URL ='http://localhost:3000/api/v1/'

const api = axios.create({ baseURL: BASE_URL })

export const categoryApi = {
    getAllMainCategories: (type)=> api.get("/categories", {
        params: type ? {type} :{}
    }),

    getCategory:      (id)=> api.get(`/categories/${id}`),
    getEngagementCat:()=> api.get('/categories/engagement'),
    getBridalCats:()=> api.get('/categories/bridal-bouquets'),
    getOtherCats:()=> api.get('/categories/others'),
}

export const imageApi = {
    getImagesByCategory: (id)=> api.get(`/images/category/${id}`)
}

export const contactApi = {
    getContactDetails: (id)=> api.get(`/contact/`)
}
export const emailApi = {
    sendEnquiry:(data)=> api.post("/emails/send-enquiry", data)
}