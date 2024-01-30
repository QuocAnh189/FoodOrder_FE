'use client';
import { useEffect, useState } from 'react';

//chakra
import {
  CircularProgress,
  InputGroup,
  Input,
  Button,
  InputRightElement,
  Icon,
  Heading,
  Box,
  FormControl,
  Text
} from '@chakra-ui/react';

//next
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//type
import { InitSignIn, SignInType } from 'src/types';

//redux
import { useSignInMutation } from 'src/redux/services/authApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'src/redux/hooks';

//toast
import toast from 'react-hot-toast';
import { signIn } from 'src/redux/slices/authSlice';

//icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const formSchema = z.object({
  email: z.string().min(1, 'You have not entered the email yet'),
  password: z.string().min(1, 'You have not entered the password yet')
});

const LoginPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInType>({
    resolver: zodResolver(formSchema),
    defaultValues: InitSignIn
  });

  const [showPass, setShowPass] = useState<boolean>(false);
  const [SignIn, { isSuccess, isLoading }] = useSignInMutation();

  const onSubmit: SubmitHandler<SignInType> = async data => {
    await SignIn(data)
      .unwrap()
      .then((res: any) => {
        dispatch(signIn(res));
        route.push('/');
      })
      .catch((e: FetchBaseQueryError) => {
        const { message }: any = e.data;
        switch (message) {
          case 'This email was not found':
            toast.error('Email does not exists');
            break;
          case 'Password not matching':
            toast.error('Wrong password');
            break;
          case 'This user was disabled':
            toast.error('This account is disabled');
            break;
          default:
            break;
        }
      });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successfully');
    }
  }, [isSuccess]);

  return (
    <Box className="mt-8">
      <Heading className="text-center text-primary text-4xl mb-4">
        Login
      </Heading>
      <FormControl
        as="form"
        className="max-w-xs mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputGroup>
          <Input
            {...register('email')}
            type="email"
            name="email"
            placeholder="email"
          />
        </InputGroup>
        {errors.email && (
          <Text as="p" className="mb-2 text-red-500">
            {errors?.email.message}
          </Text>
        )}
        <InputGroup>
          <Input
            {...register('password')}
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="password"
          />
          <InputRightElement width="4.5rem" height={40}>
            <Button
              bgColor="transparent"
              outline="none"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <Icon as={FaRegEye} /> : <Icon as={FaRegEyeSlash} />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <Text as="p" className="mb-2 text-red-500">
            {errors?.password.message}
          </Text>
        )}
        <Button as="button" disabled={isLoading} type="submit">
          {isLoading ? (
            <CircularProgress isIndeterminate color="white" size={24} />
          ) : (
            <Text>Login</Text>
          )}
        </Button>
        <Box className="my-4 text-center text-gray-500">
          <Text>or login with provider</Text>
        </Box>
        <Button
          as="button"
          className="flex gap-4 hover:bg-primary2 justify-center"
        >
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </Button>
      </FormControl>
    </Box>
  );
};

export default LoginPage;
