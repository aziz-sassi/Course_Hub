import Image from "next/image";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { React, useState,useEffect } from "react";
import Sidebar from "./sidebar.js";
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { useRouter } from "next/router";



const Navbar = () => {
    const [token,settoken] = useState("")
    const router = useRouter()
    const [loggedIn,setloggedIn] = useState(true);
    const [id,setid] = useState(null);
    const [path,setpath] = useState("");
    const [courses,setcourses] = useState(null);
    
    
    useEffect(() => {
        settoken(localStorage.getItem('token'));
        if (token !== "" || localStorage.getItem('token')) {
            axios.post('http://localhost:4200/api/auth/student/getOneByToken',{
                token : token || localStorage.getItem('token')
            })
            .then(response =>{
                setcourses(true)
                setpath("privateStudentProfile")
                setid(response.data.student_id)

            })
            .catch(()=>{
                axios.post('http://localhost:4200/api/auth/teacher/getOneByToken',{
                    token : token || localStorage.getItem('token')
                })
                .then(response =>{
                    setcourses(false)

                    setpath("privateTeacherProfile")
                    setid(response.data.teacher_id)

    
                })
                .catch(err=>{
                    setcourses(false)
                    console.log(err);
                })  
            })

          
        }

         
    },[])


    const checkToken = ()=>{

   
        if (id !== null) {
            return     ( <div className="p-4">
                <IconButton>
            <FaUserCircle size={35} color={"#3881AB"} onClick={()=>router.push(`/${path}/${id}`)
} />
</IconButton>
        </div>)
        }
        else if (id ===null){
            return (<div>
                <IconButton onClick={()=>router.push(`/Auth`)}>
                    LOGIN
              
                </IconButton>
            </div>)

        }

    }


    return (
        <div className="flex justify-between bg-gray-100">
            <div className="p-4 text-center">
            <IconButton>
                <Sidebar id = {id} path={path} courses ={courses}/>
                </IconButton>
            </div>
            <div>
            <Image src="/logo.png" width={100} height={60} alt={""} />
        </div>
      
            <div>
            {checkToken()}
            </div>

        </div>

  );
};

export default Navbar;
