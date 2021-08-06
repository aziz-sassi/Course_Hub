import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData, e.target.value);
  };

  const sendForm = (e) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      console.log("some inputs are empty !!");
    }
    console.log(loginData);
    axios
      .post("http://localhost:4200/api/auth/teacher/logIn", loginData)

      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.result.token);
        router.push(
          `/privateTeacherProfile/${response.data.result.teacher_id}`
        );
      })
      .catch((err) => {
        console.log(
          "something went wrong make sure the email and password are correct"
        );
        console.log(err);
      });
  };
  return (
    <div className="h-screen flex ">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
        <blockquote className="text-2xl font-medium text-center">
          <p className="text-lg font-semibold">Welcome to My-App</p>
        </blockquote>

        <div className="text-primary m-6">
          <div className="flex items-center mt-3 justify-center">
            <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
              Login to your account
            </h1>
          </div>
          <form>
            <label className="text-left">email:</label>
            <input
              name="email"
              type="text"
              onChange={handleChange}
              placeholder="email"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label>Password:</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <div className="flex items-center mt-3 justify-center">
            
              <button
                className={
                  "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                }
                value="Login"
                onClick={sendForm}
              >
                Login
              </button>
            
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <form action="http://localhost:3000/teacher/signup">
              <button
                className={"justify-center text-blue-500 hover:underline"}
              >
                Need to register? Sign up for free
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
