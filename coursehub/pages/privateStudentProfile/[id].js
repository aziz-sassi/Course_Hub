import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:4200/admin/students/all");
  const data = await response.json();
  const paths = data.map((student) => {
    let id = student.student_id;
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
  const student_id = context.params.id;
  const student = await fetch(
    `http://localhost:4200/admin/student/one/${student_id}`
  );
  const studentProfile = await student.json();

  return {
    props: {
      student: studentProfile,
    },
  };
};

const Student = ({ student }) => {
  console.log(student);
  const router = useRouter();

  return (
    <div
      className=" p-6"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZGVudHxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="bg-white relative shadow-xl w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-center">
            <Image
              className="h-14 w-10 rounded-full mr-2 object-cover"
              src={student.image}
              width={180}
              height={160}
              alt={""}
            />
          </div>

          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">
              {student.userName}
            </h1>
            <p className="text-center text-sm text-gray-400 font-medium">
              student
            </p>
            <p>
              <span></span>
            </p>
            <div className="my-5">
              <a
                href="#"
                className="text-indigo-200 block text-center font-medium leading-6 px-6 py-3 bg-indigo-600"
              >
                Connect with <span className="font-bold">{student.email}</span>
              </a>
            </div>
            <div className="flex justify-evenly my-5">
              <Link href={"/freeCourses"}>
                <a
                  href=""
                  className="bg font-bold text-sm text-blue-800 w-full text-center py-3 hover:bg-blue-800 hover:text-white hover:shadow-lg"
                >
                  Free courses
                </a>
              </Link>
              <Link
                href={`/privateStudentProfile/${student.student_id}/Courses`}
              >
                <a
                  href=""
                  className="bg font-bold text-sm text-blue-400 w-full text-center py-3 hover:bg-blue-400 hover:text-white hover:shadow-lg"
                >
                  Courses
                </a>
              </Link>
              <Link href={`/Payment`}>
                <a className="bg font-bold text-sm text-yellow-600 w-full text-center ay-3 hover:bg-yellow-600 hover:text-white hover:shadow-lg">
                  Recharge wallet
                </a>
              </Link>
              <Link href={`/videoChat`}>
                <a
                  href=""
                  className="bg font-bold text-sm text-gray-600 w-full text-center py-3 hover:bg-gray-600 hover:text-white hover:shadow-lg"
                >
                  Chat room
                </a>
              </Link>
              <Link href={`/privateStudentProfile/${student.student_id}/form`}>
                <a
                  href=""
                  className="bg font-bold text-sm text-blue-800 w-full text-center py-3 hover:bg-blue-800 hover:text-white hover:shadow-lg"
                >
                  Feedback
                </a>
              </Link>
            </div>

            <div className="w-full">
              <h3 className="font-bold text-gray-600 text-left px-4">
                Information
              </h3>
              <div className="mt-5 w-full">
                <p className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4  hover:bg-gray-100 transition duration-150">
                  <div className="p-2"> Education </div>
                  <span className="text-gray-400 text-sm p-2">
                    {student.education}
                  </span>
                </p>

                <p className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 hover:bg-gray-100 transition duration-150">
                  <div className="p-2"> Age</div>

                  <span className="text-gray-400 text-sm p-2">
                    {student.age}
                  </span>
                </p>
                <p
                  href="#"
                  className=" flex justify-center w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 hover:bg-gray-100 transition duration-150"
                >
                  <div className="p-2"> Wallet</div>

                  <span className="text-gray-400 text-sm p-2">
                    {student.wallet}
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

export default Student;
