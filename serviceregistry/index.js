const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const services = [];

// Default route for service registry page
app.get("/", (req, res) => {
    res.send("Service registry page");
});

// Route to return a simple "Hi"
app.get("/services", (req, res) => {
    res.send(services);
});

// Route to register a service
app.post("/register", (req, res) => {
    const { servicename, url } = req.body;

    if (!servicename || !url) {
        return res.status(400).send("servicename and url are required");
    }

    const servicedata = { servicename, url };
    services.push(servicedata);
    console.log(`Service data is ${servicedata.servicename}`)

    res.send(`Service with name ${servicename} and URL ${url} registered`);
});

// Route to get a service by its name
app.get("/getservice/:servicename", (req, res) => {
    const servicedata = services.find((e) => e.servicename ==req.params.servicename);

    if (servicedata) {
        res.send(servicedata);
    } else {
        res.status(404).send("No service found");
    }
});

// Start the server on port 3032
app.listen(3032, () => {
    console.log("Billing service started on port 3032");
});
