import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, CarFront, HeartIcon, Layout } from 'lucide-react';

interface Props {
  isAdminPage?: boolean;
}

const Header = async ({ isAdminPage = false }: Props) => {
  const isAdmin = false;

  return (
    <header className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
      <nav className='mx-auto px-4 py-4 flex items-center justify-between'>
        <Link href={isAdminPage ? '/admin' : '/'} className='flex'>
          <Image
            src={'/logo-black.png'}
            alt='autovison logo'
            width={200}
            height={60}
            className='h-14 w-auto object-contain'
          />
          {isAdminPage && (
            <span className='text-xs font-extralight'>admin</span>
          )}
        </Link>

        {/* action btn */}
        <div className='flex items-center space-x-4'>
          {isAdminPage ? (
            <Link href='/'>
              <Button variant='outline' className='flex items-center gap-2'>
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href='/saved-cars'>
                <Button>
                  <HeartIcon size={18} />
                  <span className='hidden md:inline'>Saved Cars</span>
                </Button>
              </Link>

              {!isAdmin ? (
                <Link href='/reservations'>
                  <Button variant='outline'>
                    <CarFront size={18} />
                    <span className='hidden md:inline'>My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href='/admin'>
                  <Button variant='outline'>
                    <Layout size={18} />
                    <span className='hidden md:inline'>Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl='/'>
              <Button variant='outline'>Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: '35px',
                    height: '35px',
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
