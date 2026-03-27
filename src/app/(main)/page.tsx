"use client";
import AIPromptBox from "@/src/components/AIPromptBox";
import Banner from "@/src/components/Banner";
import CategoryScroll from "@/src/components/CategoryScroll";
import PopularTrips from "@/src/components/PopularTrips";
import LiveReviews from "@/src/components/Reviews";
import React, { useState } from "react";

const Page = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  return (
    <main>
      <Banner />
      <AIPromptBox></AIPromptBox>
      <CategoryScroll
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      ></CategoryScroll>
      <PopularTrips
      activeCategory={activeCategory}
      ></PopularTrips>
      <LiveReviews></LiveReviews>
    </main>
  );
};

export default Page;
