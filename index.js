if(process.env.NODE_ENV !== "production"){
require('dotenv').config();
}

const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const methodOverride = require("method-override");
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError'); // Custom error class
const catchAsync = require('./utils/catchAsync'); // Utility to wrap async functions

const Decoration=require("./models/decorations");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine('ejs', engine);

app.use(methodOverride('_method')) //to check for every request does it has _method
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}))

// Access the WhatsApp number from the environment variables on the server-side
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER; 

const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(dbUrl)
}




app.get('/',(req,res)=>{
    res.render("products/index.ejs");
})

// --- Route to display decorations ---
app.get('/decorations', catchAsync(async (req, res) => {
    try {
        const alldecorations = await Decoration.find(); // Fetch all decorations from DB
        console.log(alldecorations);
        res.render("products/products.ejs",{alldecorations})
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}));

app.get('/decorations/:id', async (req, res) => {
    let {id}=req.params;
    // Check if ID is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // If not a valid ObjectId, throw a 404 error
        throw new ExpressError('Invalid Decoration ID', 404);
    }


    let decoration=await Decoration.findById(id);

    // If decoration is not found, throw a 404 error
    if (!decoration) {
        throw new ExpressError('Decoration Not Found', 404);
    }

    console.log(decoration);
    res.render("products/show.ejs",{decoration:decoration,whatsappNumber: WHATSAPP_NUMBER});
})


app.get('/about',(req,res)=>{
    res.render("products/about.ejs",{whatsappNumber: WHATSAPP_NUMBER});
})


// --- 404 Not Found Handler ---
// This should be after all your routes
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// --- Centralized Error Handling Middleware ---
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    console.error("Error caught by middleware:", err);
    res.status(statusCode).render('products/error.ejs', { message, statusCode });
});





app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

