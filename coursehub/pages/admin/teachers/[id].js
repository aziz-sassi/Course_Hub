import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useRouter } from "next/router";

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
  const TeacherProfile = await teacher.json();

  return {
    props: {
      teacher: TeacherProfile,
    },
  };
};

const Teacher = ({ teacher }) => {
  console.log(teacher, "teacher");
  const router = useRouter();
  const deleteProfile = () => {
    axios
      .delete(
        `http://localhost:4200/admin/teacher/delete/${teacher.teacher_id}`
      )
      .then((result) => {
        console.log(result);
        router.push("/admin/teachers");
      })
      .catch((err) => console.log(err));
  };

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
              <a
                href=""
                className="bg font-bold text-sm text-blue-800 w-full text-center py-3 hover:bg-blue-800 hover:text-white hover:shadow-lg"
              >
                Facebook
              </a>
              <a
                href=""
                className="bg font-bold text-sm text-blue-400 w-full text-center py-3 hover:bg-blue-400 hover:text-white hover:shadow-lg"
              >
                Twitter
              </a>
              <a
                href=""
                className="bg font-bold text-sm text-yellow-600 w-full text-center py-3 hover:bg-yellow-600 hover:text-white hover:shadow-lg"
              >
                Instagram
              </a>
              <a
                href=""
                className="bg font-bold text-sm text-gray-600 w-full text-center py-3 hover:bg-gray-600 hover:text-white hover:shadow-lg"
              >
                Email
              </a>
            </div>

            <div className="w-full">
              <h3 className="font-bold text-gray-600 text-left px-4">
                Information
              </h3>
              <div className="mt-5 w-full">
                <a
                  href="#"
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4  hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Education </div>
                  <span className="text-gray-400 text-sm p-2">
                    {teacher.education}
                  </span>
                </a>

                <a
                  href="#"
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Age</div>

                  <span className="text-gray-400 text-sm p-2">
                    {teacher.age}
                  </span>
                </a>

                <a
                  href="#"
                  className="flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4  hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Availability</div>
                  <span className="text-gray-400 text-sm p-2">
                    {teacher.Availability}
                  </span>
                </a>

                <a
                  href="#"
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Overall rating </div>
                  <span className="text-gray-400 text-sm p-2">
                    {teacher.Overall_rating}
                  </span>
                </a>

                <button
                  onClick={deleteProfile}
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 hover:bg-red-500 transition duration-150"
                >
                  <span className="text-gray-400 text-sm">Delete profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
