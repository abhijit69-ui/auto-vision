'use client';

import { deleteCar, getCars, updateCarStatus } from '@/actions/cars';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetch from '@/hooks/use-fetch';
import { formatCurrency } from '@/lib/helper';
import { CarStatus } from '@prisma/client';
import {
  CarIcon,
  Eye,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  StarOff,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CarList = () => {
  const [search, setSearch] = useState('');
  const [prevDeleteSuccess, setPrevDeleteSuccess] = useState(false);
  const [prevUpdateSuccess, setPrevUpdateSuccess] = useState(false);
  const [carToDelete, setCarToDelete] = useState<null | string>(null);
  const [deleteDialogOpem, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const {
    loading: loadingCar,
    fn: fetchCar,
    data: carsData,
    error: carsError,
  } = useFetch(getCars);

  useEffect(() => {
    fetchCar(search);
  }, [search, fetchCar]);

  const {
    loading: deletingCar,
    fn: deleteCarFn,
    data: deleteResults,
    error: deleteError,
  } = useFetch(deleteCar);

  const {
    loading: updatingCar,
    fn: updateCarStatusFn,
    data: updateResults,
    error: updateError,
  } = useFetch(updateCarStatus);

  useEffect(() => {
    if (deleteResults?.success && !prevDeleteSuccess) {
      toast.success('Car deleted successfully');
      fetchCar(search);
    }

    if (updateResults?.success && !prevUpdateSuccess) {
      toast.success('Car updated successfully');
      fetchCar(search);
    }

    setPrevDeleteSuccess(!!deleteResults?.success);
    setPrevUpdateSuccess(!!updateResults?.success);
  }, [
    deleteResults?.success,
    updateResults?.success,
    prevDeleteSuccess,
    prevUpdateSuccess,
    fetchCar,
    search,
  ]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCar(search);
  };

  const handleDeleteCar = async () => {
    if (!carToDelete) return;

    await deleteCarFn(carToDelete);
  };

  type Car = {
    id: string;
    featured: boolean;
    // ...other fields you need
  };
  const handleToggleFeatured = async (car: Car) => {
    await updateCarStatusFn(car.id, { featured: !car.featured });
  };
  const handleStatusUpdate = async (car: Car, newStatus: CarStatus) => {
    await updateCarStatusFn(car.id, { status: newStatus });
  };

  const getStatusBadge = (status: 'AVAILABLE' | 'UNAVAILABLE' | 'SOLD') => {
    switch (status) {
      case 'AVAILABLE':
        return <Badge className='bg-green-100 text-green-800'>Available</Badge>;
      case 'UNAVAILABLE':
        return (
          <Badge className='bg-amber-100 text-amber-800'>Unavailable</Badge>
        );
      case 'UNAVAILABLE':
        return <Badge className='bg-blue-100 text-blue-800'>Sold</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <Button
          onClick={() => router.push('/admin/cars/create')}
          className='flex items-center'
        >
          <Plus className='h-4 w-4' /> Add Car
        </Button>

        <form onSubmit={handleSearchSubmit} className='flex w-full sm:w-auto'>
          <div className='relative flex-1'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              className='pl-9 w-full sm:w-60'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type='search'
              placeholder='Search cars...'
            />
          </div>
        </form>
      </div>

      {/* Cars Table */}
      <Card>
        <CardContent className='p-0'>
          {loadingCar && !carsData ? (
            <div className='flex justify-center items-center py-12'>
              <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
            </div>
          ) : carsData?.success && (carsData.data?.length ?? 0) > 0 ? (
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-12'></TableHead>
                    <TableHead>Make & Model</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carsData.data?.map((car) => {
                    return (
                      <TableRow key={car.id}>
                        <TableCell className='w-10 h-10 rounded-md overflow-hidden'>
                          {car.images && car.images.length > 0 ? (
                            <Image
                              src={car.images[0]}
                              alt={`${car.make} ${car.model}`}
                              height={60}
                              width={60}
                              className='w-full h-full object-cover'
                              priority
                            />
                          ) : (
                            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                              <CarIcon className='h-6 w-6 text-gray-400' />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {car.make} {car.model}
                        </TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell>{formatCurrency(car.price)}</TableCell>
                        <TableCell>{getStatusBadge(car.status)}</TableCell>

                        <TableCell>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='p-0 h-9 w-9'
                            onClick={() => handleToggleFeatured(car)}
                            disabled={updatingCar}
                          >
                            {car.featured ? (
                              <Star className='h-5 w-5 text-amber-500 fill-amber-500' />
                            ) : (
                              <StarOff className='h-5 w-5 text-gray-400' />
                            )}
                          </Button>
                        </TableCell>

                        <TableCell className='text-right'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='p-0 h-8 w-8'
                              >
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => router.push(`/cars/${car.id}`)}
                              >
                                <Eye className='mr-2 h-4 w-4' />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Status</DropdownMenuLabel>
                              <DropdownMenuItem>Set Available</DropdownMenuItem>
                              <DropdownMenuItem>
                                Set Unavailable
                              </DropdownMenuItem>
                              <DropdownMenuItem>Mark as Sold</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className='text-red-600'>
                                <Trash2 className='mr-2 h-4 w-4' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarList;
