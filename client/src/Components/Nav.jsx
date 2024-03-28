import { useState } from "react";
import {Link} from "react-scroll";
import{FaTimes} from "react-icons/fa";
import {CiMenuFries} from "react-icons/ci";

const Nav = () => {
    const [click,setClick] = useState(false);
    const handleClick = () => setClick(!click);

    
    const content= <>

    <div className="lg:hidden block absolute top-16 w-full left-0 ">

        <ul className="text-center text-xl p-20">

            <Link spy= {true} smooth={true} to="Home">
                <li className="my-4 py-4 border-slate-800 hover:bg-slate-800 hover:rounded">Home</li>
            </Link >

            <Link spy = {true} smooth={true} to="About">
                <li className="my-4 py-4 border-slate-800 hover:bg-slate-800 hover:rounded">About</li>
            </Link>

            <Link spy = {true} smooth={true} to="Contact">
                <li className="my-4 py-4 border-slate-800 hover:bg-slate-800 hover:rounded">Contact</li>
            </Link>

            <Link spy = {true} smooth={true} to='/Login'>
                <li className="my-4 py-4 border-slate-800 hover:bg-slate-800 hover:rounded">Login</li>
            </Link>

            <Link spy = {true} smooth={true}  to='/Register'>
                <li className="my-4 py-4 border-slate-800 hover:bg-slate-800 hover:rounded">Register</li>
            </Link>



        </ul>
        </div>

        </>
    return (
        <nav>
            <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 ">
                <div className="flex items-center flex-1">
                    <span className="text-3xl font-bold">LHI Logistic</span>
                </div>
                
                    <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
                    <div className="flex-10">
                    <ul className="flex gap-8 mr-16 text-[18px]">



                    <Link spy = {true} smooth={true} to="Home">
                <li className="hover:text-gray-700 transition  cursor-pointer">Home</li>
            </Link>

            <Link spy = {true} smooth={true} to="About">
                <li className="hover:text-gray-700 transition  cursor-pointer">About</li>
            </Link>

            <Link spy = {true} smooth={true}  to="Contact">
                <li className="hover:text-gray-700 transition  cursor-pointer">Contact</li>
            </Link>

            <Link spy = {true} smooth={true}  to='/Login'>
                <li className="hover:text-gray-700 transition  cursor-pointer">Login</li>
            </Link>

            <Link spy = {true} smooth={true}  to='/Register'>
                <li className="hover:text-gray-700 transition  cursor-pointer">Register</li>
            </Link>

                        
                    </ul>
                    </div>
                </div>
                <div> {click && content}</div>
            </div>
    <button className="block sm:hidden transition" onClick={handleClick}>
        {click ? <FaTimes/> : <CiMenuFries/>}

    </button>
        </nav>
    );
    };
    export default Nav;