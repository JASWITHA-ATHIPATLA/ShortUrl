const mongoose =require('mongoose');

async function toConnectMongoDb(url){
    return mongoose.connect(url);
}

module.exports={
    toConnectMongoDb
}