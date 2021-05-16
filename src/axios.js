import axios from "axios";
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL="http://121.43.55.23:8082"

//前置拦截
axios.interceptors.request.use(config=>{
  return config
})
//后置拦截
axios.interceptors.response.use(response=>{
    let res=response.data;
    if (res.code==200){
      return response;
    }else{
      Element.Message.error({
        message:"密码错误",
        type:"error",
        offset: 100
      })
      return Promise.reject(response.data.msg)
    }
  },error=>{
    if(error.response.data){
      error.message=error.response.data.msg;
    }
    if(error.response.status===401){
      store.commit("REMOVE_INFO")
      router.push("/login")
    }else{
      Element.Message.error({
        message:error.message,
        type:"error",
        offset: 100
      });
      return Promise.reject(error)
    }
  }
)
