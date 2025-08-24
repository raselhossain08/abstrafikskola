'use client';

import React, { useEffect, useState } from 'react';
import teamContentService, { TeamContent, TeamMember } from '@/services/teamContentService';
import { useLanguage } from '@/contexts/LanguageContext';
import Head from 'next/head';

const TeamContentComponent: React.FC = () => {
  const { language } = useLanguage();
  const [teamData, setTeamData] = useState<TeamContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const content = await teamContentService.getTeamContent(language);
        setTeamData(content);
        console.log('✅ Team content loaded:', content);
      } catch (error) {
        console.error('❌ Error loading team content:', error);
        setError('Failed to load team information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTeamContent();
  }, [language]); // Reload when language changes

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3F8FEE]"></div>
      </div>
    );
  }

  // Error state or no data
  if (error || !teamData) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">⚠️ {error || 'No team data found'}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#3F8FEE] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Filter active members and sort by order
  const activeMembers = teamData.members
    .filter(member => member.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Head>
        <title>{teamData?.seo?.title || 'Our Team - ABS Trafikskola'}</title>
        <meta name="description" content={teamData?.seo?.description || 'Meet our experienced driving instructors and team at ABS Trafikskola AB.'} />
        <meta name="keywords" content={teamData?.seo?.keywords?.join(', ') || 'team, driving instructors, ABS Trafikskola, staff'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <h1 className="text-[#1D1F2C] text-24 sm:text-[56px] font-bold sm:text-center">
        {teamData.title || 'Team Are Helping You'}
      </h1>
      
      <div className="flex justify-center items-center gap-16 pt-12 md:flex-row flex-col">
        {activeMembers.map((member: TeamMember, index: number) => (
          <div key={member.id} className="w-full sm:w-1/2 xl:w-[624px]">
            <img 
              src={member.image?.url || `/img/team/${index + 1}.png`} 
              alt={member.name || `Team Member ${index + 1}`}
              className="mb-5 w-full"
              onError={(e) => {
                // Fallback to local images if Cloudinary image fails
                const target = e.target as HTMLImageElement;
                target.src = `/img/team/${index + 1}.png`;
              }}
            />
            <h1 className="font-bold text-20 sm:text-[32px] text-black">
              {member.name}
            </h1>
            <h3 className="text-[18px] font-medium text-[#4A4C56]">
              {member.position}
            </h3>
            {member.description && (
              <p className="text-gray-600 mt-2 text-sm">
                {member.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamContentComponent;
