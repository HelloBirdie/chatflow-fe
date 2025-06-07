import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '@/assets/images/chatflow-logo-round-blue-bg.png';
import { Link } from 'react-router-dom';
import {
  Icon,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import clsx from 'clsx';
import { useGoogleLogin } from '@react-oauth/google';
import {
  emailLogin,
  googleLogin as googleLoginService,
} from '@/services/userService';
import { IUserEmailLogin } from '@/interfaces/user';
import { set } from 'lodash';
import { AxiosError } from 'axios';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [authError, setAuthError] = useState({ message: '', isError: false });
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);

  const toast = useToast();

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required('Email is required.')
        .email('Email must be a valid email!'),
      password: yup.string().required('Password is required.'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IUserEmailLogin> = async (
    values: IUserEmailLogin,
  ) => {
    setShowLoading(true);

    try {
      const response = await emailLogin(values);
      setAuthError({ message: '', isError: false });

      // console.log(response);

      // get the token from the response authentication header
      const authnHeader = response.headers.authorization;
      const token = authnHeader?.split(' ')[1];

      // store the token in local storage
      localStorage.setItem('token', token!);

      window.location.href = '/';
    } catch (error) {
      console.log(error);
      if ((error as AxiosError).response?.status === 401) {
        setAuthError({
          message: 'Incorrect email or password.',
          isError: true,
        });
      } else {
        setAuthError({
          message: 'Something went wrong. Please try again.',
          isError: true,
        });
      }
    } finally {
      setShowLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login successful, token response:', tokenResponse);

      if (!tokenResponse?.access_token) {
        console.error('No access token in response:', tokenResponse);
        toast({
          title: 'Failed to get Google access token.',
          description: 'Please try again.',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
        return;
      }

      setGoogleLoginLoading(true);
      const accessToken = tokenResponse.access_token;
      console.log('Sending access token to backend...');

      try {
        const response = await googleLoginService(accessToken);
        console.log('Backend response:', response);

        if (response.status === 200) {
          const authnHeader = response.headers.authorization;
          console.log('Auth header received:', authnHeader);

          const token = authnHeader?.split(' ')[1];
          if (!token) {
            console.error('No token in auth header');
            throw new Error('No authentication token received');
          }

          console.log('Storing token in localStorage...');
          localStorage.setItem('token', token);
          window.location.href = '/';
        } else {
          console.error('Unexpected response status:', response.status);
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error('Google login error details:', {
          error,
          message: error instanceof Error ? error.message : 'Unknown error',
          response: axios.isAxiosError(error) ? error.response?.data : null
        });

        let errorMessage = 'Failed to login with Google.';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || error.message;
        }

        toast({
          title: 'Login Failed',
          description: errorMessage,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });
      } finally {
        setGoogleLoginLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login initialization error:', error);
      toast({
        title: 'Google Login Failed',
        description: 'Failed to initialize Google login. Please try again.',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <img
          className="w-[75px] mb-[30px] rounded-full shadow-2xl"
          src={logo}
          alt="chat flow logo"
        />

        {/* Log In header */}
        <h1 className="font-black text-4xl mb-[20px]">Log in</h1>

        <h1 className="text-base">
          Need an account?{' '}
          <Link
            to="/signup"
            className="hover:underline"
            style={{ color: '#0042D9' }}
          >
            Sign up
          </Link>{' '}
        </h1>

        {/* Login Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              mt={4}
              isInvalid={!(typeof errors.email === 'undefined')}
            >
              <Input
                type="text"
                placeholder="Your email"
                width={80}
                size="lg"
                {...register('email')}
              />
              {errors && errors.email && (
                <FormErrorMessage color="red">
                  {errors.email.message && errors.email.message}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* TODO: add show and hide option */}
            {/* TODO: add password regex */}
            <FormControl
              mt={4}
              isInvalid={
                !(typeof errors.password === 'undefined') || authError.isError
              }
            >
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  width={80}
                  size="lg"
                  {...register('password')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    mr={2}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors && errors.password && (
                <FormErrorMessage color="red">
                  {errors.password.message && errors.password.message}
                </FormErrorMessage>
              )}

              {!errors.password && authError && authError.isError && (
                <FormErrorMessage color="red">
                  {authError.message && authError.message}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* TODO: add loading effect */}
            <Button
              width="full"
              mt={8}
              borderRadius="20"
              background="#0042D9"
              color="white"
              _hover={{ bg: '#0036B4' }}
              _active={{ bg: '#002782' }}
              isLoading={showLoading}
              loadingText="Submitting"
              type="submit"
              disabled={showLoading}
              pointerEvents={showLoading ? 'none' : 'auto'}
            >
              Log in
            </Button>
          </form>
        </div>

        <Link to="/signup" className="text-gray-400 hover:underline mt-4">
          Forgot password?
        </Link>

        <div
          className={clsx(
            'flex flex-row items-center mt-4 text-gray-500 w-[340px]',
          )}
        >
          <div className="flex-grow bg bg-gray-300 h-[1px]" />
          <span className="flex-grow-0 mx-4 ">OR</span>
          <div className="flex-grow bg bg-gray-300 h-[1px]" />
        </div>

        {/* Log In Google */}
        <button
          className="flex flex-row items-center justify-center px-[15px] text-gray rounded w-[340px] h-[73px] mt-[20px] border border-gray-300 font-bold hover:bg-gray-100 active:border-blue-700 transition-colors duration-200"
          onClick={() => {
            googleLogin();
          }}
        >
          {googleLoginLoading ? (
            <Spinner marginRight={'20px'} color="gray" />
          ) : (
            <Icon as={FcGoogle} className="mr-8" boxSize={10} />
          )}
          <span
            className={`mr-6 text-xl ${googleLoginLoading ? 'text-gray-500' : ''
              }`}
          >
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
