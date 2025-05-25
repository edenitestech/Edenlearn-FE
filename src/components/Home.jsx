import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from './HeroSection';
import OurMission from './OurMission';
import Testimonials from './Testimonials';
import TrendingCourses from './TrendingCourses';
import WhyChooseUs from './WhyChooseUs';
import CertificationPrograms from './CertificationPrograms';
import FAQs from './FAQs';
import OurProducts from './OurProduct';


const Home = () => {
  return (
    <div>
      <HeroSection /> 
      <OurProducts />
      <TrendingCourses />
      <WhyChooseUs /> 
      <CertificationPrograms />
      <Testimonials />
      <OurMission />
      <FAQs />
    </div>
  );
};

export default Home;
