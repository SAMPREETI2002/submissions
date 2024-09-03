const express = require("express")
const cors = require("cors")
const {PrismaClient} = require("@prisma/client")


const app = express();
const prisma = new PrismaClient();


app.use(cors("*"));
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("this is itemservice");
})

app.get("/viewbill",async (req,res)=>{
    const allbills = await prisma.billinfo.findMany();
    res.send(allbills);
    res.send()
})

app.post("/addbill",async (req,res)=>{
    const dataobj ={
    data : {
        orderdetails : req.body.orderdetails,
        amount : req.body.amount
    },
};

await prisma.billinfo.create(dataobj);
res.send("Bill Saved!")
})

app.listen(5013,()=>{
    console.log("Billing Service started!")
})