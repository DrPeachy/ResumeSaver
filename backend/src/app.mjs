import "./config.mjs";
import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
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

// session
const sessionOptions = {
  secret: "secret for signing session id",
  saveUninitialized: false,
  resave: false,
};
app.use(session(sessionOptions));

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
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/dashboard", dashboardRoutes);
app.use("/login", loginRoutes);
app.use("/signup", registrationRoutes);

//
mongoose
  .connect(process.env.DSN)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    // connect to server
    app.listen(process.env.PORT || 8080);
  })
  .catch((error) => {
    console.error("Connection error: ", error);
  });
