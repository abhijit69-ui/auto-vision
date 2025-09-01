import CarCard from '@/components/card-card';
import HomeSearch from '@/components/home-search';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { bodyTypes, carMakes, faqItems, featuredCars } from '@/lib/data';
import { SignedOut } from '@clerk/nextjs';
import { Calendar, Car, ChevronRight, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: Car,
    title: 'Huge Variety',
    description:
      'Browse countless vehicles from reliable dealers and private sellers.',
  },
  {
    icon: Calendar,
    title: 'Hassle-Free Test Drive',
    description:
      'Schedule your test drive online in just a few clicks, at your convenience.',
  },
  {
    icon: Shield,
    title: 'Safe & Trusted',
    description:
      'Every listing is checked and transactions are protected for your security.',
  },
];

export default function Home() {
  return (
    <div className='pt-20 flex flex-col'>
      {/* Hero */}

      <section className='relative py-16 md:py-28 overflow-hidden bg-black/10 backdrop-blur-xl'>
        {/* Abstract gradient blobs */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-0 left-1/3 w-[800px] h-[500px] rounded-full bg-[radial-gradient(circle_at_30%_20%,#ff6b6b,#f06292,#f48fb1)] blur-3xl mix-blend-multiply animate-pulse'></div>
          <div className='absolute bottom-0 right-1/3 w-[800px] h-[600px] rounded-full bg-[radial-gradient(circle_at_70%_40%,#00c853,#00e5ff,#7c4dff)] blur-3xl mix-blend-multiply animate-pulse delay-1000'></div>
          <div className='absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle_at_50%_50%,#ff9a9e,#fad0c4,#fad390)] blur-3xl mix-blend-multiply animate-pulse delay-1000'></div>
        </div>

        <div className='relative text-center max-w-4xl mx-auto'>
          <div className='capitalize mb-4'>
            <h1 className='text-5xl md:text-8xl mb-4 gradient-title drop-shadow-lg'>
              Find your Dream Car with AutoVision AI
            </h1>
            <p className='text-xl text-gray-200 max-w-2xl mx-auto'>
              Discover cars with AI-powered search and book test drives from
              thousands of options.
            </p>
          </div>

          {/* Ai Search */}
          <HomeSearch />
        </div>
      </section>

      {/* Featured Car section */}
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

      {/* Browse by Make */}
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

      {/* Why Choose AutoVision */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold text-center mb-12'>
            Why Choose AutoVision AI?
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className='text-center'>
                <div className='bg-pink-100 text-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                  <Icon className='h-8 w-8' />
                </div>
                <h3 className='text-xl font-bold mb-2'>{title}</h3>
                <p className='text-gray-600'>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-bold'>Browse by Body Type</h2>
            <Button variant='ghost' className='flex items-center' asChild>
              <Link href='/cars'>
                View All <ChevronRight className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {bodyTypes.map((type) => {
              return (
                <Link
                  key={type.name}
                  href={`/cars?bodyType=${type.name}`}
                  className='relative group cursor-pointer'
                >
                  <div className='overflow-hidden rounded-lg flex justify-end h-36 mb-4 relative'>
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className='object-cover group-hover:scale-105 transition duration-300'
                    />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end'>
                    <h3 className='text-white text-xl font-bold pl-4 pb-2'>
                      {type.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-8'>
          <h2 className='text-2xl font-bold text-center mb-8'>
            Frequently Asked Questions
          </h2>

          <Accordion type='single' collapsible className='w-full'>
            {faqItems.map((faq, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative py-16 overflow-hidden text-white bg-black/10 backdrop-blur-2xl'>
        {/* Gradient background blobs */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-0 left-1/3 w-[700px] h-[450px] rounded-full bg-[radial-gradient(circle_at_30%_20%,#f48fb1,#f06292,#ff6b6b)] blur-2xl mix-blend-multiply animate-pulse'></div>
          <div className='absolute bottom-0 right-1/3 w-[700px] h-[600px] rounded-full bg-[radial-gradient(circle_at_70%_40%,#00e5ff,#7c4dff,#00c853)] blur-2xl mix-blend-multiply animate-pulse delay-1000'></div>
          <div className='absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_50%_50%,#fad390,#fad0c4,#ff9a9e)] blur-xl mix-blend-multiply animate-pulse delay-700'></div>
        </div>
        <div className='relative container text-center px-4 mx-auto'>
          <h2 className='text-3xl font-bold mb-4'>
            Find the Car That Fits Your Lifestyle
          </h2>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
            Thousands of happy drivers have already discovered their next ride
            with us — your dream car could be just a click away.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button size='lg' variant='secondary' asChild>
              <Link href='/cars'>View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size='lg' asChild>
                <Link href='/sign-up'>Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
