"use client";

import Contact from '@/components/common/Contact';
import TeamContentComponent from '@/components/team/TeamContent';
import React from 'react';


export default function TeamPage() {
  return (
    <>
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <TeamContentComponent />
        </div>
      </div>
      <Contact />
    </>
  );
}