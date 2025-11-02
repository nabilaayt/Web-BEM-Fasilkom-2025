import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import BidangRoute from "./routes/BidangRoute.js";
import KategoriDinasRoute from "./routes/KategoriDinasRoute.js";
import PengurusBemRoute from "./routes/PengurusBemRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// Sync database
(async () => {
  try {
    await db.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
app.use("/api", AuthRoute);
app.use("/api", UserRoute);
app.use("/api", BidangRoute);
app.use("/api", KategoriDinasRoute);
app.use("/api", PengurusBemRoute);

app.use(express.static("public"));

// store.sync();

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

