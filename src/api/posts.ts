/* eslint-disable no-useless-concat */
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
const BASE_URL = process.env.REACT_APP_API_BASE_URL
const getnewspostUrl = `${BASE_URL}/api/posts`




const getNewsData = async (paginationStart: number, paginationLimit: number, type?: string): Promise<any> => {
  let strUrl = "";
  if (type === "research") {
      strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}`
  } 
  // else if (operationType === "Trending"){
  //     strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}&type=${type}`
  // } else if (operationType === "Latest"){
  //     strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}`
  // } else if (operationType === "Publication"){
  //     strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&ecosystem=${ecosystem}&type=${type}`
  // } else if (operationType === "Category"){
  //     strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&category=${category}&type=${type}`
  // } 
  const res = await axios.get(strUrl);
  console.log("getNewsData",res)
  return res;
};

interface SearchQuery {
  type?: string
  tag?: string
  trending?: boolean
  ecosystem?: string
  search_term?: string
}

export const getPosts = (query: SearchQuery, skip: number, limit: number): Promise<any> => {
  console.log('queryqueryquery', query);
  
  let queryParams = `?pagination[start]=${skip}&pagination[limit]=${limit}`
  if(query.type !== undefined && query.type !== "") {
    queryParams = queryParams + `&type=${query.type}`
  }
  if(query.tag !== undefined && query.tag !== ""){
    queryParams = queryParams + `&tag=${query.tag}`
  }
  if(query.trending === true){
    queryParams = queryParams + `&trending=${query.trending}`
  }
  if(query.ecosystem !== undefined && query.ecosystem !== ""){
    queryParams = queryParams + `&ecosystem=${query.ecosystem}`
  }
  if(query.search_term !== undefined && query.search_term !== ""){
    queryParams = queryParams + `&search_term=${query.search_term}`
  }

  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts`,
    params: queryParams
  }
  console.log("config", config);
  
  let result = new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data)
    )
      .catch(err => reject(err))
  })

  console.log("gdshdbjadj", result)
  return result
};

export const getPostById = (slug: string): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts/${slug}`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getCategories = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/tags`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getEcosystem = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/ecosystem`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getPdfs = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/pdfs`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getTweets = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/tweets`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};


export{
  getNewsData
}