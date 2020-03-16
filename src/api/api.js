import axios from 'axios';
import Qs from 'qs';
axios.defaults.baseURL = 'http://localhost:8090/api/admin/'; //default url
axios.defaults.withCredentials = true;
// request interceptor
axios.interceptors.request.use(config => {
    config.data = Qs.stringify(config.data); // handle request data
    return config;
},
    err => {
        return Promise.reject(err);
    });

//api request

export const getArticleList = () => {
    return axios.get('/blogList');
}

export const getArticleListByCategory = (params)=>{
    return axios.get('/blogList/' + params)
}

export const getCommentList= ()=>{
    return axios.get('/comments')
}

export const deleteComment=(cid)=>{
    return axios.delete('/comment/' + cid)
}

export const answerComment=(cid, params)=>{
    return axios.post('/comment/' + cid, params)
}

export const createNewArticle = (params)=>{
    return axios.post('/blog', params)
}

export const getCategoryList = ()=>{
    return axios.get('/categoryList')
}
