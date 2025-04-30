const jwt = require('jsonwebtoken')

const secret = 'Ayush@12345a'

function setUser (user) {
  return jwt.sign({ _id: user._id, email: user.email ,role:user.role,}, secret)
}
function getUser (token) {
  if (!token) return null
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null;
  }
}

// const sessionIdToUserMap = new Map(); //ye wo diary he jisme apni state store hoti he or jo refresh karne par clear ho jati he
// function setUser(id,user){

// }
// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }
module.exports = {
  setUser,
  getUser
}
