import "./config.mjs";
import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import passport from "passport";
import passportConfig from "./passportConfig.mjs";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// import routes
import dashboardRoutes from "./routes/DashboardRoutes.mjs";
import registrationRoutes from "./routes/registrationRoutes.mjs";
import loginRoutes from "./routes/loginRoutes.mjs";


/// middleware
app.use(express.static(path.join(__dirname, "public")));

// cors
app.use(cors());

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// session
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
};
app.use(session(sessionOptions));

// passport
app.use(passport.initialize());
app.use(passport.session());

// passport config
passportConfig();

// log requests
function logRequest(req, res, next) {
  console.log(
    `Method: ${req.method}\n` +
    `Path: ${req.path}\n` +
    `Query: ${JSON.stringify(req.query)}\n` +
    `Body: ${JSON.stringify(req.body)}\n`
  );
  next();
}
app.use(logRequest);

// routes
app.use(dashboardRoutes);
app.use(loginRoutes);
app.use(registrationRoutes);


app.listen(process.env.PORT || 8080, () => {
  mongoose
    .connect(process.env.DSN)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
    })
    .catch((error) => {
      console.error("Connection error: ", error);
    });
});