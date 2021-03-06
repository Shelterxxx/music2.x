import axios from 'axios'
export function request(url,params){
    const instance =axios.create({
        baseURL: '/api',
        timeout:30000,
        withCredentials: true,
    })

//axios拦截器
instance.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    console.log(token)
    if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.common['token'] = token //请求头加上token
      }
    return config
},err=>{
    console.log(err);
})

instance.interceptors.response.use(response => {
      console.log(response)
      //拦截响应，做统一处理 
    //   if (response.data.code) {
    //     switch (response.data.code) {
    //       case 1002:
    //         store.state.isLogin = false
    //         router.replace({
    //           path: 'login',
    //           query: {
    //             redirect: router.currentRoute.fullPath
    //           }
    //         })
    //     }
    //   }
      return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })
   return instance.get(url,params)
}