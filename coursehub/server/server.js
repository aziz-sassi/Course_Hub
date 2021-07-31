const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4200;
const dev = process.env.NODE_ENV !== "production";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config({ path: "/custom/path/to/.env" });
const { Server } = require("socket.io");
const server = http.createServer(app);

// server.use(express.json());
// server.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  var corsOptions = {
    origin: "http://localhost:3000",
  };

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

//upload a post by a certain teacher according to his id   // Lotfi new

app.post("/post", async (req, res) => {
  // console.log("wabba lubba dub dub", req.body.body);
  let data = req.body;
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(data.body.teacher_id),
    },
  });

  console.log("tescherrrrr", teacher);

  const post = await prisma.post.create({
    data: {
      title: data.body.title,
      body: data.body.body,
      author_id: teacher.teacher_id,
      Image: data.body.image,
      price: Number(data.body.price),
    },
  });
  console.log("hajaaaa", post);
});



// post : teacher courses
app.post("/post", async (req, res) => {
  // console.log("wabba lubba dub dub", req.body.body);
  let data = req.body;

  const post = await prisma.post.create({
    data: {
      title: data.body.title,
      body: data.body.body,
      author_id: data.body.teacher_id,
      Image: data.body.image,
    },
  });
  // console.log("hajaaaa", post);
});

// get one teacher profile

app.get("/teacher/:id", async (req, res) => {
  let teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  // console.log(teacher);
  return res.status(201).send(teacher);
});

//get all teacher profiles

app.get("/user/teachers", async (req, res) => {
  const teacher = await prisma.teacher.findMany({});
  // console.log(teacher);
  return res.status(201).send(teacher);
});

// fetch all the posts by a certain user
app.get(`/posts/:id`, async (req, res) => {
  // console.log(req.body);
  let posts = await prisma.post.findMany({
    where: {
      author_id: 0,
    },
  });
  // console.log(posts, "ahayyaaaaa");
  return res.status(201).send(posts);
});

//update the data of a teacher

app.put(`/update/profile/:id`, async (req, res) => {
  console.log(req.body, req.params.id);
  let update = await prisma.teacher.update({
    where: {
      teacher_id: Number(req.params.id),
    },
    data: {
      // description: req.body.description,
      image: req.body.url,
      education: req.body.subject,
    },
  });
});

// feedback about the lecture
app.put(`/form/feedback/:id`, async (req, res) => {
  console.log(
    "average",
    req.body.body.average,
    req.params.id,
    "the whole body",
    req.body
  );
  let feedback = await prisma.teacher.update({
    where: {
      teacher_id: Number(req.params.id),
    },
    data: {
      sumOfRates: { increment: req.body.body.average },
      numberOfaRtes: { increment: 1 },
    },
  });
});

app.get(`/posts/:id`, async (req, res) => {
  // console.log(req.body);
  let posts = await prisma.post.findMany({
    where: {
      author_id: 0,
    },
  });
  console.log(posts, "ahayyaaaaa");
  return res.status(201).send(posts);
});

//get all posts to display on the posts main page

app.get(`/all/blogs`, async (req, res) => {
  let blogs = await prisma.post.findMany({});
  return res.status(200).send(blogs);
});

//get all teachers cuz i need them for sth else

app.get(`/all/teachers`, async (req, res) => {
  let teachers = await prisma.teacher.findMany({});
  return res.status(201).send(teachers);
});

//profile of the teacher, private:

app.get("/profile/teacher/week/:id", async (req, res) => {
  let teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });

  console.log(teacher, "hererererer");

  let days = await prisma.weekDay.findUnique({
    where: {
      weekDay_id: Number(teacher.teacher_id),
    },
  });

  return res.status(201).send(days);
});

app.get("/profile/teacher/session/:id", async (req, res) => {
  let teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });

  console.log(teacher, "hererererer");

  let session = await prisma.sessions.findUnique({
    where: {
      sessions_id: Number(teacher.teacher_id),
    },
  });

  return res.status(201).send(session);
});

// require("./routes/authTeachers.routes")(app);
app.use("/api/auth/teacher", require("./routes/authTeachers.routes.js"));

// require("./routes/authStudents.routes")(app);
app.use("/api/auth/student", require("./routes/authStudents.routes.js"));

app.use("/admin", require("./routes/admin.routes.js"));

app.use("/reservaition", require("./routes/reservation.routes.js"));

app.use("/freecourse", require("./routes/freecourse.routes.js"));

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Example app listening at http://localhost:${PORT}`);
});
