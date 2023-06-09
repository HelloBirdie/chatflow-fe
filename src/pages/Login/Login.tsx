import React from 'react';

import logo from '@/assets/images/chatflow-logo-round-blue-bg.png';
import { Link } from 'react-router-dom';
import { Icon } from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <img
          className="w-[75px] mb-[30px] rounded-full shadow-2xl"
          src={logo}
          alt="chat flow logo"
        />

        {/* Sign In header */}
        <h1 className="font-black text-4xl mb-[20px]">Sign In</h1>

        <h1 className="text-base">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-700 hover:underline">
            Sign up
          </Link>{' '}
          for free
        </h1>

        {/* Sign In Github */}
        <button className="flex flex-row items-center justify-center px-[15px] text-gray rounded w-[340px] h-[73px] mt-[20px] border border-gray-300 font-bold hover:bg-gray-100 active:border-blue-700 transition-colors duration-200">
          <Icon as={BsGithub} className="mr-8" boxSize={9} />
          <span className="mr-6 text-xl">Continue with Github</span>
        </button>

        {/* Sign In Google */}
        <button className="flex flex-row items-center justify-center px-[15px] text-gray rounded w-[340px] h-[73px] mt-[20px] border border-gray-300 font-bold hover:bg-gray-100 active:border-blue-700 transition-colors duration-200">
          <Icon as={FcGoogle} className="mr-8" boxSize={10} />
          <span className="mr-6 text-xl">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
