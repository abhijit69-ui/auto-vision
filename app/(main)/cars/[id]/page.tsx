import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const CarPage = async ({ params }: Props) => {
  const { id } = await params;
  return <div>CarPage: {id}</div>;
};

export default CarPage;
