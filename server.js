require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true, //Để bật cookie HTTP qua CORS
  }),
);
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

//socketIO
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

//Routes

app.use("/user", require("./routes/UserRouter"));
app.use("/doctor", require("./routes/DoctorRouter"));
app.use("/api", require("./routes/UploadToCloudinary")); //Cloudinary
app.use("/city", require("./routes/CityRouter"));
app.use("/district", require("./routes/DistrictRouter"));
app.use("/form", require("./routes/MedicineFormRouter"));
app.use("/medicine", require("./routes/MedicineRouter"));
app.use("/health", require("./routes/HealthDeclarationRouter"));
app.use("/pharmacy", require("./routes/PharmacyRouter"));

//connect to mongoDB
const URL = process.env.MONGO_URL;
mongoose.connect(
  URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB.");
  },
);

app.get("/", (req, res) => {
  res.json({ msg: "ON AIR!!!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
http.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running on", PORT);
});
