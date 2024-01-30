'use client';
import { useState } from 'react';

//cart
import { CartContext } from 'src/components/AppContext';

//icon
import Bars2 from 'src/components/icons/Bars2';
import ShoppingCart from 'src/components/icons/ShoppingCart';

//next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//redux
import { useSignOutMutation } from 'src/redux/services/authApi';
import { signOut } from 'src/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Box, Button } from '@chakra-ui/react';

interface AuthLinkProps {
  status: string;
  userName: string;
  handleLogout: () => void;
}

const AuthLinks = (props: AuthLinkProps) => {
  const { status, userName, handleLogout } = props;
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={handleLogout}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/signin'}>Login</Link>
        <Link
          href={'/signup'}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
};

const Header = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth.authData);

  const [SignOut] = useSignOutMutation();
  const cartProducts = [];
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    await SignOut(auth?.user._id!).then(() => {
      dispatch(signOut());
      route.push('/');
    });
  };

  return (
    <header>
      <Box className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
          ST PIZZA
        </Link>
        <Box className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <Button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}
          >
            <Bars2 />
          </Button>
        </Box>
      </Box>
      {mobileNavOpen && (
        <Box
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks
            status={auth ? 'authenticated' : 'unauthenticated'}
            userName={auth?.user.name!}
            handleLogout={handleLogout}
          />
        </Box>
      )}
      <Box className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            ST PIZZA
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks
            status={auth ? 'authenticated' : 'unauthenticated'}
            userName={auth?.user.name!}
            handleLogout={handleLogout}
          />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </Box>
    </header>
  );
};

export default Header;
