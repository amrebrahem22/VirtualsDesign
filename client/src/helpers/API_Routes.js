export const endpoint = 'http://localhost:5000/';

const apiEndpoint = `${endpoint}api`

export const loginUser = `${apiEndpoint}/auth/login`

export const teamUrl = `${apiEndpoint}/team`
export const teamDetailUrl = (id) => `${apiEndpoint}/team/${id}`

export const portfolioUrl = `${apiEndpoint}/portfolio`
export const portfolioDetailUrl = (id) => `${apiEndpoint}/portfolio/${id}`

export const careerUrl = `${apiEndpoint}/jobs`
export const careerDetailUrl = (id) => `${apiEndpoint}/jobs/${id}`

export const servicesUrl = `${apiEndpoint}/services`
export const servicesCildrenUrl = (id) => `${apiEndpoint}/services/item/${id}`
export const servicesDetailUrl = (id) => `${apiEndpoint}/services/${id}`


export const serviceItemUrl = `${apiEndpoint}/services/item`
export const serviceItemUrlAll = `${apiEndpoint}/services/item/all`
export const serviceItemDetailUrl = (id) => `${apiEndpoint}/services/item/${id}`

export const postsUrl = `${apiEndpoint}/posts`
export const postsDetailUrl = (id) => `${apiEndpoint}/posts/${id}`

export const commentsUrl = `${apiEndpoint}/comments`
export const commentsDetailUrl = (id) => `${apiEndpoint}/comments/${id}`

export const categoriesUrl = `${apiEndpoint}/categories`
export const categoriesDetailUrl = (id) => `${apiEndpoint}/categories/${id}`

export const mailUrl = `${apiEndpoint}/mail`
export const mailDetailUrl = (id) => `${apiEndpoint}/mail/${id}`
