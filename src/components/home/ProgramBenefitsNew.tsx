'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import programBenefitsContentService, { 
  ProgramBenefitsContent, 
  ProgramBenefit 
} from '@/services/programBenefitsContentService';

// Icon renderer component
const IconRenderer = ({ icon, title }: { icon: ProgramBenefit['icon']; title: string }) => {
  const sizeClasses = {
    sm: 'text-2xl w-6 h-6',
    md: 'text-3xl w-8 h-8', 
    lg: 'text-4xl w-12 h-12',
    xl: 'text-5xl w-16 h-16'
  };

  const sizeClass = sizeClasses[icon.size] || sizeClasses.lg;

  switch (icon.type) {
    case 'emoji':
      return (
        <div className={sizeClass} style={{ color: icon.color }}>
          {icon.emoji}
        </div>
      );
    case 'image':
      return (
        <div className={`relative ${sizeClass}`}>
          <Image
            src={icon.url}
            alt={icon.alt || title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 48px, 64px"
          />
        </div>
      );
    case 'svg':
      return (
        <div 
          className={sizeClass}
          style={{ color: icon.color }}
          dangerouslySetInnerHTML={{ __html: icon.svgContent }}
        />
      );
    default:
      return <div className={sizeClass}>✨</div>;
  }
};

export default function ProgramBenefits() {
  const [content, setContent] = useState<ProgramBenefitsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For now, use 'en' as default. Later you can integrate with your i18n system
        const currentLang = 'en'; // i18n.language || 'en';
        const data = await programBenefitsContentService.getProgramBenefitsContent(currentLang);
        setContent(data);
        
      } catch (err) {
        console.error('Failed to load program benefits content:', err);
        setError('Failed to load content');
        
        // Try to get fallback content
        try {
          const fallbackData = await programBenefitsContentService.getProgramBenefitsContent('en');
          setContent(fallbackData);
        } catch (fallbackErr) {
          console.error('Failed to load fallback content:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="bg-[#f7f9fc] py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Card key={idx} className="text-center p-6 rounded-xl animate-pulse">
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state - show fallback content
  if (error && !content) {
    return (
      <section className="bg-[#f7f9fc] py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 mb-4">Unable to load benefits content</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </section>
    );
  }

  if (!content) return null;

  // Get active benefits sorted by order
  const activeBenefits = content.benefits.filter(benefit => benefit.order > 0);

  // Dynamic styling from CMS
  const backgroundStyle = content.styling.colors.background.startsWith('#') 
    ? { backgroundColor: content.styling.colors.background }
    : {};

  const cardBackground = content.styling.colors.cardBackground;
  const cardBackgroundActive = content.styling.colors.cardBackgroundActive;
  const textColor = content.styling.colors.textColor;
  const textColorActive = content.styling.colors.textColorActive;

  // Build grid classes dynamically
  const gridClasses = `grid gap-${content.styling.layout.gap} ` +
    `grid-cols-${content.styling.layout.columns.mobile} ` +
    `sm:grid-cols-${content.styling.layout.columns.tablet} ` +
    `lg:grid-cols-${content.styling.layout.columns.desktop}`;

  return (
    <section 
      className={content.styling.spacing.sectionPadding}
      style={backgroundStyle}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {content.header.title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.header.title}
            </h2>
            {content.header.subtitle && (
              <h3 className="text-xl md:text-2xl text-gray-600 mb-4">
                {content.header.subtitle}
              </h3>
            )}
            {content.header.description && (
              <p className="text-gray-700 max-w-2xl mx-auto">
                {content.header.description}
              </p>
            )}
          </div>
        )}

        {/* Benefits Grid */}
        <div className={gridClasses}>
          {activeBenefits.map((benefit) => {
            const isActive = benefit.active;
            const cardBg = isActive ? cardBackgroundActive : cardBackground;
            const textClr = isActive ? textColorActive : textColor;
            
            // Handle background colors (CSS classes vs hex values)
            const cardStyle: any = {};
            const textStyle: any = {};
            
            if (cardBg.startsWith('#')) {
              cardStyle.backgroundColor = cardBg;
            }
            if (textClr.startsWith('#')) {
              textStyle.color = textClr;
            }
            
            const cardClasses = cn(
              'text-center transition-all',
              content.styling.card.borderRadius,
              content.styling.spacing.cardPadding,
              {
                // Apply CSS classes for predefined colors
                'bg-white text-black': cardBg === 'white' && textClr === 'black',
                'bg-blue-500 text-white': cardBg === 'blue-500' && textClr === 'white',
                [content.styling.card.shadow]: !isActive,
                [content.styling.card.shadowActive]: isActive,
              }
            );

            return (
              <Card
                key={benefit.id}
                className={cardClasses}
                style={{ ...cardStyle, ...textStyle }}
              >
                <CardContent className="flex flex-col items-center space-y-4">
                  <IconRenderer icon={benefit.icon} title={benefit.title} />
                  <h4 className="text-lg font-semibold">{benefit.title}</h4>
                  <p className="text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
