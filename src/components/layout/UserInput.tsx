import { useEffect, useState } from 'react';

//chakra
import {
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';

import avatarDefault from '../../../public/avatar.png';

//react-hook-form
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

//redux
import { useAppDispatch } from 'src/redux/hooks';
import {
  useUpdateUserMutation,
  useDeleteAvatarMutation
} from 'src/redux/services/userApi';

//toast
import toast from 'react-hot-toast';

//interface
import { IUser } from 'src/interfaces';
import { updateAuth } from 'src/redux/slices/authSlice';

//icons
import { FaTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

//cloudinary
import { CldUploadWidget } from 'next-cloudinary';

interface Props {
  _id: string;
  avatar: string;
  name: string;
  email: string;
}
const UserInputs = (props: Props) => {
  const { _id, avatar, name, email } = props;
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Props>({
    defaultValues: {
      _id,
      avatar,
      name,
      email
    }
  });

  const [newAvatar, setNewAvatar] = useState<string>();
  const [DeleteAvatar] = useDeleteAvatarMutation();
  const [UpdateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<Props> = async data => {
    const dataUpdate = { ...data, avatar: newAvatar };
    await UpdateUser(dataUpdate)
      .unwrap()
      .then((res: IUser) => {
        dispatch(updateAuth(res));
        toast.success('Update success fully');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDeleteImage = async () => {
    if (newAvatar) {
      const public_id = newAvatar.substring(62, newAvatar.length - 4);
      await DeleteAvatar(public_id)
        .unwrap()
        .then(res => {
          setNewAvatar('');
        })
        .catch(e => console.log(e));
    }
  };

  useEffect(() => {
    setNewAvatar(avatar);
  }, []);

  return (
    <Grid>
      <Center>
        <CldUploadWidget
          uploadPreset="food_order"
          options={{
            folder: 'foodorder/user',
            sources: ['local', 'url', 'google_drive'],
            multiple: false,
            styles: {}
          }}
          onSuccess={(result: any) => {
            setNewAvatar(result.info.secure_url);
          }}
          onError={error => {
            console.log(error);
          }}
        >
          {({ open }) => {
            return (
              <Box w={140} h={140} position="relative">
                <Avatar
                  w={140}
                  h={140}
                  src={
                    newAvatar
                      ? newAvatar
                      : 'https://res.cloudinary.com/dadvtny30/image/upload/v1706534569/foodorder/user/lgdkebapensuoktdcmqa.png'
                  }
                  borderRadius={70}
                />
                <Button
                  position="absolute"
                  top={0}
                  w={20}
                  onClick={handleDeleteImage}
                >
                  <Icon as={FaTrashCan} />
                </Button>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    open();
                  }}
                  position="absolute"
                  bottom={0}
                  w={20}
                >
                  <Icon as={MdEdit} />
                </Button>
              </Box>
            );
          }}
        </CldUploadWidget>
      </Center>

      <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormLabel>Name</FormLabel>
          <Input
            {...register('name')}
            type="text"
            placeholder="First and last name"
          />
        </Stack>
        <Stack>
          <FormLabel>Email</FormLabel>
          <Input {...register('email')} type="email" placeholder={'email'} />
        </Stack>

        <Button as="button" disabled={isLoading} type="submit">
          {isLoading ? (
            <CircularProgress isIndeterminate color="white" size={24} />
          ) : (
            <Text>Save</Text>
          )}
        </Button>
      </FormControl>
    </Grid>
  );
};

export default UserInputs;
