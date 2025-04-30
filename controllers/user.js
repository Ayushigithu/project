const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const{setUser} =require('../service/auth');
async function handelUserSignUp (req, res) {
  const { name, email, password } = req.body
  const newUser = await new User({
    name: name,
    email: email,
    password: password,
    role:"NORMAL",
  });

  if (!newUser) {
    return res.status(500).json({ error: 'user not found' })
  }

  await newUser.save()
  return res.redirect('/')
}

async function handelUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user)
      return res.render("users/login.ejs", {
        error: "Invalid Username or Password",
      });
  
    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
};
module.exports = {
  handelUserSignUp,
  handelUserLogin
}
