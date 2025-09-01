import HomeSearch from '@/components/home-search';

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
    </div>
  );
}
