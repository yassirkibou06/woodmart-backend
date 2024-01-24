const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
//const authRoute = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute');
//const brandRoute = require('./routes/brandRoute');
//const couponRoute = require('./routes/couponRoute');
//const productRoute = require('./routes/productRoute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//app.get('/', (req, res) => res.send('Home Page Route'));

//app.use("/api/user", authRoute);
//app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
/*app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);*/


app.use(notFound);
app.use(errorHandler);

dbConnect();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port`);
});

