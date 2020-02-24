/**
 * ajax请求函数模块
 * 返回值：Promise
 * 
*/
import axios from "axios"
export default function ajax(url,data={},type="GET"){
    return new Promise((resolve,reject)=>{
        let promise
        // 处理异步请求
        if(type === "GET"){
            // 拼装请求数据
            let dataStr = "";
            Object.keys(data).forEach((key)=>{
                dataStr += key + "=" + data[key] + "&"
            })

            if(dataStr !== ""){
                dataStr = dataStr.substring(0,dataStr.lastIndexOf("&"))
                url = url + "?" + dataStr
            }
            console.log(url)
            // 发送ajax请求
            promise = axios.get(url) // 返回值一个Promise的实例对象
            // console.log(promise)    
        }else if(type === "POST"){
            //POST 请求
            console.log(url)
            console.log(data)
            promise = axios.post(url,data) // 返回值是一个Promise的实例对象
            //console.log("7777777777777777777777")
        }else{
            console.log("delete---------------------------------")
            promise = axios.delete(url,data)
        }
        console.log(type)
        console.log(promise)
        promise.then((response)=>{
            //console.log("33333333333333333333333 = ", response.data)
            resolve(response.data) // 把请求服务器的数据从外层的promise的resolve方法返回出去
        }).catch((error)=>{
            //console.log("666666666666666666666666666")
            reject(error)// 把请求的错误信息给出
        })

    })
}