import React,{useEffect,useState} from 'react'
import Image from 'next/image';
import logo from "public/assets/logos/fp logo.png";
import Link from 'next/link';
import LoginButton from './Landing Page/Loginbutton';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState('/');
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/userDetails`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const user = data.user;
        if (user.teamRole === '0') {
          setDashboardLink('/leaderDashboard');
        } else {
          setDashboardLink('/memberDashboard');
        }

        console.log('user', user)
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });

  }
  
  return (
    <nav className='absolute top-0 flex text-white w-full justify-around h-[84px] py-4'>
        <div>
            <Image src={logo} alt='FP' className='h-full w-auto'/>
        </div>
        <div className='hidden gap-3 sm:gap-10 items-center font-medium md:flex'>
            <Link href="/">Home</Link>
            <Link href={dashboardLink}>Dashboard</Link>
            <LoginButton/>
        </div>
        <div className='flex flex-col justify-around md:hidden'>
        {/* Hamburger menu icon */}
        <div className="cursor-pointer text-white md:hidden" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Navbar links */}
        <div className={`md:flex flex-col z-10 bg-gray-800 bg-opacity-75 p-4 rounded-md top-[6vh] h-[20vh] ${isOpen ? 'absolute right-0' : 'hidden'} `}>
          <ul className="flex flex-col justify-around items-center space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/memberDashboard">Dashboard</Link></li>
            <li><LoginButton/></li>
          </ul>
        </div>
        </div>
    </nav>
  )
}

export default Navbar
