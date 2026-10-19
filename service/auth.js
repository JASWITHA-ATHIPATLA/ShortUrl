const sessionIdUserMap= new Map();

async function setUser(id,user) {
    sessionIdUserMap.set(id,user);
}
async function getUser(id){
    return sessionIdUserMap.get(id);
}

module.exports={
    setUser,
    getUser,
}