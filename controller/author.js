const username = "salman";
const password = "salmanas005";

const showLogin = (req,res)=>{
    if(req.session.user){
        return res.redirect("/home");
    }
    const msg = req.session.loginError;
    req.session.loginError = null; // reset after showing
    res.render("login", { msg });
};


const varifyLogin = (req,res)=>{
    const {username:inputUser,password:inputPass} = req.body;
        if (inputUser !== username && inputPass !== password) {
            req.session.loginError = "Both username and password are invalid";
        } else if (inputUser !== username) {
            req.session.loginError = "Invalid username";
        } else if (inputPass !== password) {
            req.session.loginError = "Invalid password";
        } else {
            req.session.user = inputUser;
            req.session.loginError = null;
            return res.redirect("/home");
        }
    res.redirect("/");
}


const showHome = (req,res)=>{
    if(req.session.user){
        res.render("home",{user:req.session.user});
    }else{
        res.redirect("/");
    }
};

const logout = (req,res)=>{
    req.session.destroy(err =>{
        if(err){
            console.log(`logout error : `,err);
            res.redirect("/home");
        }
        res.render(`login`,{msg: "logged out successfully"});
    })
}

module.exports={showLogin,varifyLogin,showHome,logout};
