'use client';

//chakra
import { Box, Flex } from '@chakra-ui/react';

//components
import UserInputs from './UserInput';
import AddressInputs from 'src/components/layout/AddressInputs';

//interface
import { IUser } from 'src/interfaces';

interface Props {
  user: IUser;
}

const UserForm = (props: Props) => {
  const { user } = props;

  return (
    <Box className="md:flex gap-4">
      <Flex className="grow flex-col gap-4">
        <UserInputs
          _id={user._id!}
          avatar={user.avatar}
          name={user.name}
          email={user.email}
        />
        <AddressInputs info={user.info} />
      </Flex>
    </Box>
  );
};

export default UserForm;
