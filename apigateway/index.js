const express=require("express")
const axios =require("axios")
const app=express()
const http=require("http")
 
const serviceRegistryUrl="http://localhost:3032/services"
 
async function getServices(){
    const response=await axios.get(serviceRegistryUrl)
    return response.data;
}
 
const serviceCache={}
 
async function getServiceUrl(serviceName){
    if(serviceCache[serviceName]){
        return serviceCache[serviceName]
    }
 
    const services=await getServices()
    console.log(services)
    const service=services.find((s)=>s.servicename===serviceName)
    if(!service){
        throw new Error(`Service not found: ${serviceName}`)
    }
}
 
app.use(async(req,res,next)=>{
    const serviceName=req.path.split("/")[1]
    console.log(serviceName)
    const serviceUrl=await getServiceUrl(serviceName)
    console.log(serviceUrl)
 
    const proxyReq=http.request(serviceUrl,(proxyRes)=>{
        res.writeHead(proxyRes.statusCode,proxyRes.headers)
        proxyRes.pipe(res)
    })
 
    req.pipe(proxyReq)
})
 
app.listen(3000,()=>{
    console.log("API gateway started in port 3000")
})