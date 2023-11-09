import "./config.mjs";
import "./models/Resume.mjs";
import "./models/Workspace.mjs";
import "./models/User.mjs";
// import "./models/Duration.mjs";
// import "./models/Experience.mjs";
// import "./models/Education.mjs";
// import "./models/SkillSlot.mjs";



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
import dashboardRoutes from "./routes/dashboardRoutes.mjs";
import registrationRoutes from "./routes/registrationRoutes.mjs";
import loginRoutes from "./routes/loginRoutes.mjs";
import logoutRoutes from "./routes/logoutRoutes.mjs";
import workspaceRoutes from "./routes/workspaceRoutes.mjs";
import resumeRoutes from "./routes/resumeRoutes.mjs";

/// middleware
app.use(express.static(path.join(__dirname, "public")));

// cors
app.use(cors(
  {
    origin: (process.env.NODE_ENV === 'production') ? process.env.PROD_FRONTEND_URL : process.env.DEV_FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
  }
));

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// session
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: false,
    sameSite: 'lax'
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
app.use(registrationRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(workspaceRoutes);
app.use(resumeRoutes);


app.listen(((process.env.NODE_ENV === 'prodoction') ? process.env.PROD_PORT : process.env.DEV_PORT) || 8080, () => {
  mongoose
    .connect((process.env.NODE_ENV === 'production') ? process.env.PROD_DSN : process.env.DEV_DSN)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
    })
    .catch((error) => {
      console.error("Connection error: ", error);
    });
});