import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import clsx from 'clsx';

interface IUserForm {
  email: String;
  password: String;
  confirmPassword: String;
}

const SignUp = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confPwd, setConfPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // const initialValues = {
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // };

  // const [initialValue, setInitialValue] = useState(initialValues);

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required('Email is required.')
        .email('Email must be a valid email!'),
      password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters!'),
      confirmPassword: yup
        .string()
        .required('Confirm password is required.')
        .when('password', (password, field) =>
          password
            ? field.oneOf(
                [yup.ref('password')],
                'Password and Confirm Password must be same!',
              )
            : field,
        ),
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
      confirmPassword: '',
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IUserForm> = (values: object) => {
    console.log('Registration Form:::::', values);
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 3000);
  };

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
        <h1 className="font-black text-4xl mb-[20px]">Sign up</h1>

        <h1 className="text-base">
          Already have an account?{' '}
          <Link
            to="/login"
            className="hover:underline"
            style={{ color: '#0042D9' }}
          >
            Log in
          </Link>{' '}
        </h1>

        {/* Signup Form */}
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
              isInvalid={!(typeof errors.password === 'undefined')}
            >
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
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
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={!(typeof errors.confirmPassword === 'undefined')}
            >
              <InputGroup>
                <Input
                  type={showConfPwd ? 'text' : 'password'}
                  placeholder="Confirm password"
                  size="lg"
                  {...register('confirmPassword')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowConfPwd((showConfPwd) => !showConfPwd)
                    }
                    mr={2}
                  >
                    {showConfPwd ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors && errors.confirmPassword && (
                <FormErrorMessage color="red">
                  {errors.confirmPassword.message &&
                    errors.confirmPassword.message}
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
              Sign up for free
            </Button>
          </form>
        </div>

        <div
          className={clsx(
            'flex flex-row items-center mt-6 text-gray-500 w-[340px]',
          )}
        >
          <div className="flex-grow bg bg-gray-300 h-[1px]" />
          <span className="flex-grow-0 mx-4 ">OR</span>
          <div className="flex-grow bg bg-gray-300 h-[1px]" />
        </div>

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

export default SignUp;
