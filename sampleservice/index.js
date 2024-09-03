const express=require("express")
const cors=require("cors")              
const app=express()
app.use(cors("*"));
app.use(express.json());
const requestSim = require("./RequestFailureSimulator");
const CircuitBreaker = require("./circuitbreaker");
const circuitBreaker = new CircuitBreaker({
    failureThreshold: 3,
    timeout: 30000,
})
simulator = new requestSim
 
app.listen(5055, (req, res)=>{
    console.log("item service started");
});
 
 
app.get("/", (req, res)=>{
    res.send("this is itemservice");
});
 
app.get("/sample",async(req,res) => {
 
    try{
        const allitems = await circuitBreaker.execute(() => simulator.findMany());
 
        res.send(allitems);
    } catch(error){
        res.status(500).send("Error "+error.message);
    }
 
})