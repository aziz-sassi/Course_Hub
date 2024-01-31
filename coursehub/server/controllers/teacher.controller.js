const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.makePost = async (req, res) => {
  let data = req.body;
  const teacher = await prisma.teacher.findUnique({
    where: { teacher_id: Number(data.body.teacher_id) },
  });
  // console.log("tescherrrrr", teacher);
  const post = await prisma.post.create({
    data: {
      title: data.body.title,
      body: data.body.body,
      author_id: teacher.teacher_id,
      Image: data.body.image,
      price: Number(data.body.price),
    },
  });
  // console.log("hajaaaa", post);
};

exports.updateTeacherProfile = async (req, res) => {
  console.log(req.body, req.params.id);
  let update = await prisma.teacher.update({
    where: {
      teacher_id: Number(req.params.id),
    },
    data: {
      image: req.body.url,
      education: req.body.subject,
      description: req.body.description,
    },
  });
};

exports.getOneTeacher = async (req, res) => {
  let teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  return res.status(201).send(teacher);
};

exports.getAllTeachers = async (req, res) => {
  const teacher = await prisma.teacher.findMany({});
  return res.status(201).send(teacher);
};

exports.getTeacherPosts = async (req, res) => {
  let posts = await prisma.post.findMany({
    where: {
      author_id: 0,
    },
  });
  return res.status(201).send(posts);
};

exports.feedBackForm = async (req, res) => {
  console.log(
    req.body.body.email,
    req.body.body.average,
    "bodyyyyyyyyyyyyyyyyyyyy"
  );
  let feedback = await prisma.teacher.update({
    where: {
      teacher_id: 1,
    },
    data: {
      sumOfRates: { increment: req.body.body.average },
      numberOfRates: { increment: 1 },
    },
  });
};

exports.getAllteachersPosts = async (req, res) => {
  console.log(req.params.id, "whereeeeeeeeeeeeeeeeeeeeeeeee");
  let posts = await prisma.post.findMany({
    where: {
      author_id: Number(req.params.id),
    },
  });
  // console.log(posts, "ahayyaaaaa");
  return res.status(201).send(posts);
};

exports.getAllPosts = async (req, res) => {
  let blogs = await prisma.post.findMany({});
  return res.status(200).send(blogs);
};

exports.getTeachers = async (req, res) => {
  let teachers = await prisma.teacher.findMany({});
  return res.status(201).send(teachers);
};

exports.updateDays = async (req, res) => {
  // console.log(req.params.id, req.body);
  let days = await prisma.weekDay.update({
    where: {
      teacher_id: Number(req.params.id),
    },
    data: {
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
    },
  });
};

exports.updateSessions = async (req, res) => {
  console.log(req.params.id, req.body);

  let sessions = await prisma.sessions.update({
    where: {
      teacher_id: Number(req.params.id),
    },
    data: {
      one: req.body.one,
      two: req.body.two,
      three: req.body.three,
      four: req.body.four,
      five: req.body.five,
      six: req.body.six,
    },
  });
};
