const express = require("express")
const cors = require("cors")
const axios = require("axios")
const {PrismaClient} = require("@prisma/client")


const app = express();
app.use(cors("*"));
app.use(express.json());
const prisma = new PrismaClient();
app.get("/",(req,res)=>{
    res.send("Order service running");
})

app.post("/addorder",async(req,res)=>{
    const dataobj = {
        data : {
            orderitems : req.body.orderitems,
            amount : req.body.amount
        }
    };
    await prisma.itemOrder.create(dataobj);
res.send("Order Saved!")
});
app.get("/vieworder",async (req,res)=>{
    const allorders = await prisma.itemOrder.findMany();
    res.send(allorders);
})

app.get("/viewitems", (req, res) => {
    axios.get("http://localhost:5000/viewitems")
        .then((response) => {
            console.log("Fetched items:", response.data); // Log the response data
            res.send(response.data);
        })
        .catch((err) => {
            console.error("Error fetching items:", err);
            res.status(500).send("Error fetching items");
        });
});

app.listen(5012,()=>{
    console.log("order item service started!")
})