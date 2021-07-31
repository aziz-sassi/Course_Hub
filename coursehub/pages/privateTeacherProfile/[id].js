import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:4200/admin/teacher/all");
  const data = await response.json();
  const paths = data.map((teacher) => {
    let id = teacher.teacher_id;
    // console.log("id", id)
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const teacher_id = context.params.id;
  const teacher = await fetch(
    `http://localhost:4200/admin/teacher/one/${teacher_id}`
  );

  const days = await fetch(
    `http://localhost:4200/profile/teacher/week/${teacher_id}`
  );
  const AvDays = await days.json();

  const sessions = await fetch(
    `http://localhost:4200/profile/teacher/session/${teacher_id}`
  );
  const AvSession = await sessions.json();

  const TeacherProfile = await teacher.json();

  return {
    props: {
      days: AvDays,
      teacher: TeacherProfile,
      sessions: AvSession,
    },
  };
};

const Teacher = ({ teacher, days, sessions }) => {
  console.log(teacher, days, sessions);
  const router = useRouter();

  return (
    <div className="container mx-auto my-20">
      <div>
        <div className="bg-white relative shadow-xl w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-center">
            <Image
              className="h-14 w-10 rounded-full mr-2 object-cover"
              src={teacher.image}
              width={180}
              height={160}
              alt={""}
            />
          </div>

          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">
              {teacher.userName}
            </h1>
            <p className="text-center text-sm text-gray-400 font-medium">
              Teacher
            </p>
            <p>
              <span></span>
            </p>
            <div className="my-5">
              <a
                href="#"
                className="text-indigo-200 block text-center font-medium leading-6 px-6 py-3 bg-indigo-600"
              >
                Connect with <span className="font-bold">{teacher.email}</span>
              </a>
            </div>
            <div className="flex justify-evenly my-5">
              <Link
                href={`/privateTeacherProfile/${teacher.teacher_id}/createCourse`}
              >
                <a
                  href=""
                  className="bg font-bold text-sm text-blue-800 w-full text-center py-3 hover:bg-blue-800 hover:text-white hover:shadow-lg"
                >
                  Create a post
                </a>
              </Link>
              <Link
                href={`/privateTeacherProfile/${teacher.teacher_id}/createFreeCourse`}
              >
                <a
                  href=""
                  className="bg font-bold text-sm text-blue-400 w-full text-center py-3 hover:bg-blue-400 hover:text-white hover:shadow-lg"
                >
                  Post a free course
                </a>
              </Link>
              <Link
                href={`/privateTeacherProfile/${teacher.teacher_id}/scheduel`}
              >
                <a
                  href=""
                  className="bg font-bold text-sm text-yellow-600 w-full text-center py-3 hover:bg-yellow-600 hover:text-white hover:shadow-lg"
                >
                  Check scheduel
                </a>
              </Link>

              <Link href={`/videoChat`}>
                <a
                  href=""
                  className="bg font-bold text-sm text-blue-800 w-full text-center py-3 hover:bg-blue-800 hover:text-white hover:shadow-lg"
                >
                  Chat room
                </a>
              </Link>
              <a
                href=""
                className="bg font-bold text-sm text-gray-600 w-full text-center py-3 hover:bg-gray-600 hover:text-white hover:shadow-lg"
              >
                Update information
              </a>
            </div>

            <div className="w-full">
              <h3 className="font-bold text-gray-600 text-left px-4">
                Information
              </h3>
              <div className="mt-5 w-full">
                <p
                  href="#"
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4  hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Education </div>
                  <span className="text-gray-400 text-sm p-2">
                    {teacher.education}
                  </span>
                </p>

                <p
                  href="#"
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Age</div>

                  <span className="text-gray-400 text-sm p-2">
                    {teacher.age}
                  </span>
                </p>

                <p
                  href="#"
                  className="flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4  hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Availability</div>
                  <span className="text-gray-400 text-sm p-2">
                    {teacher.Availability}
                  </span>
                </p>

                <p
                  href="#"
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Overall rating </div>
                  <span className="text-gray-400 text-sm p-2">
                    {teacher.Overall_rating}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
