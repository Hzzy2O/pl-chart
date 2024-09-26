import React from 'react';
import PlChart from '@/components/Chart';

const Home: React.FC = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <PlChart
        strikePrice={70000}
        premium={100}
      />
    </div>
  );
};

export default Home;
