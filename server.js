const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs");
const nocache = require("nocache");
const session = require("express-session");
const userRoutes = require("./Routes/user");
const author = require("./controller/author");

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
}))



app.set("view engine","hbs");
app.use(express.static("public"));
app.use(nocache());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "-1");
  next();
});

app.use("/",userRoutes);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})


