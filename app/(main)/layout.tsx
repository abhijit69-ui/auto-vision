import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return <div className='container mx-auto my-32'>{children}</div>;
};

export default MainLayout;
