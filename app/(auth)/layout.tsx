import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <div className='flex justify-center pt-40'>{children}</div>;
};

export default AuthLayout;
