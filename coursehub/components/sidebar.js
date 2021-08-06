import Link from "next/link";

import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

/* You'll need to install @reach/portal which simplify creating portal*/
import Portal from "@reach/portal";
const DrawerPage = (props) => {
  const router = useRouter();

  const [token, settoken] = React.useState(null);
  const [loggedIn, setloggedIn] = React.useState(null);
  const [id, setid] = React.useState(null);
  const [path, setpath] = React.useState("");

  React.useEffect(() => {
    settoken(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      setloggedIn(true);
    }
    if (!localStorage.getItem("token")) {
      setloggedIn(false);
    }
    if (token || loggedIn) {
      axios
        .post("http://localhost:4200/api/auth/student/getOneByToken", {
          token: token || localStorage.getItem("token"),
        })
        .then((response) => {
          setid(response.data.student_id);
          setpath("privateStudentProfile");
        })
        .catch(() => {
          axios
            .post("http://localhost:4200/api/auth/teacher/getOneByToken", {
              token: token || localStorage.getItem("token"),
            })
            .then((response) => {
              setid(response.data.teacher_id);
              setpath("privateTeacherProfile");
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  }, []);

  const profileFunc = () => {
    console.log(props.path, props.id);
    if (token || loggedIn) {
      return (
        <>
          <ul class="ml-4">
            <li class="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <a
                href="#"
                onClick={() => router.push(`/${props.path}/${props.id}`)}
              >
                <span class="ml-2">profile</span>
              </a>
            </li>
            <li class="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <a href="/">
                <span class="ml-2">Homepage</span>
              </a>
            </li>

            <li class="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </span>
              <a href={`/freeCourses`}>
                <span class="ml-2">Free Courses</span>
              </a>
            </li>
            <li class="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <a href={`/videoChat`}>
                <span class="ml-2">Chat room</span>
              </a>
            </li>
            <li class="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <a href="#">
                <span class="ml-2">About us</span>
              </a>
            </li>
          </ul>
        </>
      );
    } else if (token === null || !loggedIn) {
      return (
        <>
          <ul class="ml-4">
            <li class="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <a href="http://localhost:3000/Auth">
                <span class="ml-2">profile</span>
              </a>
            </li>
            <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <a href="/">
                <span className="ml-2">Homepage</span>
              </a>
            </li>

            <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </span>
              <a href={`/freeCourses`}>
                <span className="ml-2">Free Courses</span>
              </a>
            </li>
            <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <a href={`/videoChat`}>
                <span className="ml-2">Chat room</span>
              </a>
            </li>
        
          </ul>
        </>
      );
    }
  };

  const logout = () => {
    // setloggedIn(false)

    localStorage.clear();
  };
  const checkToken = () => {
    if (token || loggedIn) {
      return (
        <DrawerFooter>
          <li class="mb-2 px-4 py-4 text-gray-600 flex flex-row object-bottom  border-gray-300 hover:text-black align end  hover:bg-gray-300  hover:font-bold rounded ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            <a href="http://localhost:3000/">
              <span class="ml-2" onClick={logout}>
                Log out
              </span>
            </a>
          </li>
        </DrawerFooter>
      );
    } else if (token === null || !loggedIn) {
      return <></>;
    }
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 text-gray-500 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        type="button"
        onClick={toggle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <Drawer isOpen={isOpen} toggle={toggle} position="left">
        <DrawerHeader>
          {" "}

        </DrawerHeader>
        <DrawerBody>
          <div class="mt-10 mb-4">{profileFunc()}</div>
        </DrawerBody>
        {checkToken()}
      </Drawer>
    </div>
  );
};
/* Logic */
const style = {
  orientation: {
    left: `flex md:w-58 lg:w-58 h-full left-0 mx-0 my-0  absolute focus:outline-none `,
  },
  animation: {
    left: "animate-drawer-left ",
  },
  body: `flex-shrink bg-gray-100 flex-grow p-4 `,
  headerTitle: `text-2xl md:text-3xl w-60 font-light`,
  content: `relative flex flex-col bg-white pointer-events-auto`,
  header: `items-start bg-gray-100 justify-between p-4 border-b border-gray-300`,
  container: `fixed top-0 left-0 z-40 w-full h-full m-0 overflow-hidden`,
  overlay: `fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50`,
  footer: `flex bg-gray-100  p-3 pl-7 border-t border-gray-300`,
};
function Drawer({ children, isOpen, toggle }) {
  const ref = React.useRef(null);
  // close drawer on click outside
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!isOpen) return;
        toggle(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, ref, toggle]);
  // close drawer when you click on "ESC" key
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        toggle(false);
      }
    };
    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [isOpen, toggle]);
  // hide scrollbar and prevent body from moving when drawer is open
  //put focus on drawer dialogue
  React.useEffect(() => {
    if (!isOpen) return;
    ref.current?.focus();
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      html.style.overflow = "";
      html.style.paddingRight = "";
    };
  }, [isOpen]);
  return (
    <Portal>
      {isOpen && (
        <>
          <div className={style.overlay} />
          <div className={style.container}>
            <div
              aria-modal={true}
              className={style.orientation.left}
              ref={ref}
              role="dialogue"
              tabIndex={-1}
            >
              <div className={`${style.animation.left} ${style.content}`}>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </Portal>
  );
}
function DrawerHeader({ children }) {
  return (
    <div className={style.header}>
      <h4 className={style.headerTitle}>{children}</h4>
    </div>
  );
}
function DrawerBody({ children }) {
  return <div className={style.body}>{children}</div>;
}
function DrawerFooter({ children }) {
  return <div className={style.footer}>{children}</div>;
}

export default DrawerPage;
