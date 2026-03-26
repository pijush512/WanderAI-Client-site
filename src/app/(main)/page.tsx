import Banner from '@/src/components/Banner';
import PopularTrips from '@/src/components/PopularTrips'; // পাথটি আপনার ফোল্ডার অনুযায়ী চেক করে নিন
import React from 'react';

const Page = () => {
  return (
    <main>
      {/* ব্যানার সেকশন */}
      <Banner />
      
      {/* পপুলার ট্রিপস সেকশন (যেটা আমরা একটু আগে ফিক্স করলাম) */}
      <PopularTrips />
    </main>
  );
};

export default Page;