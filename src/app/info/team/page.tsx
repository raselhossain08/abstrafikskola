"use client";

import { useState, useEffect } from 'react';
import Contact from '@/components/common/Contact';
import teamContentService, { TeamContent } from '@/services/teamContentService';

export default function Page() {
  const [content, setContent] = useState<TeamContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const teamData = await teamContentService.getTeamContent();
        setContent(teamData);
      } catch (err) {
        console.error('Failed to load team content:', err);
        setError('Failed to load team information');
      } finally {
        setLoading(false);
      }
    };

    loadTeamContent();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-80 mx-auto mb-8"></div>
            <div className="flex justify-center gap-16 pt-12">
              <div className="w-full sm:w-1/2 xl:w-[624px]">
                <div className="bg-gray-200 rounded h-80 mb-5"></div>
                <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-64"></div>
              </div>
              <div className="w-full sm:w-1/2 xl:w-[624px]">
                <div className="bg-gray-200 rounded h-80 mb-5"></div>
                <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-64"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <h1 className="text-red-600 text-2xl font-bold mb-4">Error Loading Team Information</h1>
          <p className="text-gray-600">{error || 'Unable to load team content'}</p>
        </div>
      </div>
    );
  }

  // Filter and sort active members
  const activeMembers = content.members
    .filter(member => member.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-[#1D1F2C] text-24 sm:text-[56px] font-bold sm:text-center">
            {content.title}
          </h1>
          
          {content.subtitle && (
            <p className="text-[#4A4C56] text-center mt-4 mb-8">
              {content.subtitle}
            </p>
          )}

          <div className="flex justify-center items-center gap-16 pt-12 md:flex-row flex-col">
            {activeMembers.map((member, index) => (
              <div key={member.id} className="w-full sm:w-1/2 xl:w-[624px]">
                <img 
                  src={member.image.url} 
                  alt={member.name}
                  className="mb-5 w-full rounded-lg shadow-lg"
                />
                <h1 className="font-bold text-20 sm:text-[32px] text-black">
                  {member.name}
                </h1>
                <h3 className="text-[18px] font-medium text-[#4A4C56] mb-2">
                  {member.position}
                </h3>
                
                {member.description && (
                  <p className="text-[#4A4C56] text-[16px] leading-relaxed">
                    {member.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Contact />
    </>
  );
}
