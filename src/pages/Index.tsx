
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WattpadHome from '@/components/WattpadHome';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <WattpadHome />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
