import CarCard from '@/components/card-card';
import HomeSearch from '@/components/home-search';
import { Button } from '@/components/ui/button';
import { carMakes, featuredCars } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='pt-20 flex flex-col'>
      {/* Hero */}

      <section className='relative py-16 md:py-28 overflow-hidden'>
        {/* Abstract gradient blobs */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-0 left-1/3 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle_at_30%_20%,#ff6b6b,#f06292,#f48fb1)] blur-3xl mix-blend-multiply animate-pulse'></div>
          <div className='absolute bottom-0 right-1/3 w-[800px] h-[700px] rounded-full bg-[radial-gradient(circle_at_70%_40%,#00c853,#00e5ff,#7c4dff)] blur-3xl mix-blend-multiply animate-pulse delay-1000'></div>
          <div className='absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle_at_50%_50%,#ff9a9e,#fad0c4,#fad390)] blur-3xl mix-blend-multiply animate-pulse delay-700'></div>
        </div>

        <div className='relative text-center max-w-4xl mx-auto'>
          <div className='capitalize'>
            <h1 className='text-5xl md:text-8xl mb-4 gradient-title drop-shadow-lg'>
              Find your Dream Car with AutoVision AI
            </h1>
            <p className='text-xl text-gray-800 max-w-2xl mx-auto'>
              Advance AI Car Search and Test drive from thousands of vehicles.
            </p>
          </div>

          {/* Example Button */}
          <HomeSearch />
        </div>
      </section>

      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-bold'>Featured Cars</h2>
            <Button variant='ghost' className='flex items-center' asChild>
              <Link href='/cars'>
                View All <ChevronRight className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredCars.map((car) => {
              return <CarCard key={car.id} car={car} />;
            })}
          </div>
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-bold'>Browse by Make</h2>
            <Button variant='ghost' className='flex items-center' asChild>
              <Link href='/cars'>
                View All <ChevronRight className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {carMakes.map((make) => {
              return (
                <Link
                  key={make.name}
                  href={`/cars?make=${make.name}`}
                  className='bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer'
                >
                  <div className='relative h-16 w-auto mx-auto mb-2'>
                    <Image
                      src={make.image}
                      alt={make.name}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className='font-medium'>{make.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
