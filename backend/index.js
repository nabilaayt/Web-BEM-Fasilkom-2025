const express = require("express");

const app = express();
const port = 3000;

// Testing
app.get("/", (req, res) => {
    res.send("Web BEM Fasilkom 2025!");
});

app.get("/profile", (req, res) => {
    res.send("respons from /profile");
});

app.listen(port, () => console.log(`server running on port ${port}`));

// import express from 'express';
// import cors from 'cors';
// import session from 'express-session';
// import dotenv from 'dotenv';
// import fileUpload from 'express-fileupload';
// import SequelizeStore from 'connect-session-sequelize';
// import db from './config/Database.js';
// import UserRoute from './routes/UserRoute.js';
// import BidangRoute from './routes/BidangRoute.js';
// import KategoriDinasRoute from './routes/KategoriDinasRoute.js';
// import PengurusBemRoute from './routes/PengurusBemRoute.js';
// import AuthRoute from './routes/AuthRoute.js';

// dotenv.config();

// const app = express();

// const sessionStore = SequelizeStore(session.Store);
// const store = new sessionStore({
//   db: db,
// });

// // Sync database
// // (async () => {
// //   await db.sync();
// // })();

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//       secure: 'auto',
//       maxAge: 1000 * 60 * 60 * 24, // 24 hours
//     },
//   })
// );

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());
// app.use(express.static('public'));

// // Routes
// app.use(AuthRoute);
// app.use(UserRoute);
// app.use(BidangRoute);
// app.use(KategoriDinasRoute);
// app.use(PengurusBemRoute);

// // store.sync();

// const PORT = process.env.APP_PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
