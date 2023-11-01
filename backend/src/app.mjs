import "./config.mjs";
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/// middleware
app.use(express.static(path.join(__dirname, "public")));

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
      `Body: ${JSON.stringify(req.body)}\n` +
      `Session: ${JSON.stringify(req.session)}\n`
  );
  next();
}
app.use(logRequest);


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
