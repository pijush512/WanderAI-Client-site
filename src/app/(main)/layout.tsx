
import Footer from '@/src/components/Footer';
import Navbar from '@/src/components/Navbar';
import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
      
    </div>
  )
}

export default MainLayout;
