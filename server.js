const express = require('express');
const urlRoute = require('./router/url.js');
const { toConnectMongoDb } = require('./connect.js');
const { handleGetOriginalURL } = require('./controllers/url.js');
const userRoute=require('./router/user.js');
const staticRoute=require('./router/staticRouter.js');
const {authenticateUser,restrictTo} =require('./middleware/user.js');
const cookieParser=require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/url',authenticateUser,restrictTo(["NORMAL"]), urlRoute);
app.use('/', staticRoute);
app.use('/user',userRoute);
app.get('/:shortId', handleGetOriginalURL);

async function startServer() {
    await toConnectMongoDb('mongodb://localhost:27017/url-shorter');
    app.listen(3001, () => {
        console.log('Server running on http://localhost:3001');
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
});
