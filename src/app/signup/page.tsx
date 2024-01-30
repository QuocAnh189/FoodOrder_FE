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

//links
import Link from 'next/link';

//react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//constant
import { PASSWORD_REGEX } from 'src/constants';

//type
import { InitSignUp, SignUpType } from 'src/types';

//redux
import { useSignUpMutation } from 'src/redux/services/authApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch } from 'src/redux/hooks';
import { signUp } from 'src/redux/slices/authSlice';

//toast
import toast from 'react-hot-toast';

//icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'You have not entered the email yet' })
    .max(30, { message: 'Email must not exceed 30 characters' })
    .email('Email does not format'),
  name: z
    .string()
    .min(1, 'You have not entered the name yet')
    .min(5, { message: 'The name must have at least 5 characters' })
    .max(30, { message: 'Name must not exceed 30 characters' }),
  password: z
    .string()
    .min(8, { message: 'The password must have at least 8 characters' })
    .max(32, { message: 'Password must not exceed 32 characters' })
    .regex(
      PASSWORD_REGEX.lowerCase,
      'Password must have at least 1 lowercase letter'
    )
    .regex(
      PASSWORD_REGEX.upperCase,
      'Password must have at least 1 uppercase letter'
    )
    .regex(PASSWORD_REGEX.number, 'Password must have at least 1 digit')
    .regex(
      PASSWORD_REGEX.specialCharacter,
      'Password must have at least 1 special character'
    ),
  confirmpassword: z
    .string()
    .min(1, { message: 'You have not entered the confirm password yet' })
});
// .superRefine(({ confirmpassword, password }, ctx) => {
//   if (confirmpassword !== password) {
//     ctx.addIssue({
//       code: 'custom',
//       message: 'Confirm password is not match'
//     });
//   }
// });

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [SignUp, { isLoading, isSuccess }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpType>({
    resolver: zodResolver(formSchema),
    defaultValues: InitSignUp
  });

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignUpType> = async data => {
    await SignUp(data)
      .unwrap()
      .then(res => {
        dispatch(signUp(res));
        route.push('/');
      })
      .catch((e: FetchBaseQueryError) => {
        const { message }: any = e.data;
        switch (message) {
          case 'This email already exists':
            toast.error('Email already exists');
            break;
          case 'This name already exists':
            toast.error('Name already exists');
            break;
          case 'Confirmpassword is not match':
            toast.error('Confirmpassword is not match');
            break;
          default:
            break;
        }
      });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Register successfully');
    }
  }, [isSuccess]);

  return (
    <Box className="mt-8">
      <Heading className="text-center text-primary text-4xl mb-4">
        Register
      </Heading>
      <FormControl
        as="form"
        className="block max-w-xs mx-auto"
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
            {...register('name')}
            type="text"
            name="name"
            placeholder="name"
          />
        </InputGroup>
        {errors.name && (
          <Text as="p" className="mb-2 text-red-500">
            {errors?.name.message}
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

        <InputGroup>
          <Input
            {...register('confirmpassword')}
            type={showConfirmPass ? 'text' : 'password'}
            name="confirmpassword"
            placeholder="Confirm password"
          />
          <InputRightElement width="4.5rem" height={40}>
            <Button
              bgColor="transparent"
              outline="none"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? (
                <Icon as={FaRegEye} />
              ) : (
                <Icon as={FaRegEyeSlash} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.confirmpassword && (
          <Text as="p" className="mb-2 text-red-500">
            {errors?.confirmpassword.message}
          </Text>
        )}
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <CircularProgress isIndeterminate color="white" size={24} />
          ) : (
            <Text>Register</Text>
          )}
        </Button>
        <Box className="my-4 text-center text-gray-500">
          or login with provider
        </Box>
        <Button className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </Button>
        <Box className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{' '}
          <Link className="underline" href={'/signin'}>
            Login here &raquo;
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SignUpPage;
