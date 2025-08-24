// Team Content API Service for Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: {
    url: string;
    publicId: string;
  };
  description: string;
  order: number;
  isActive: boolean;
}

export interface TeamContent {
  id: string;
  title: string;
  subtitle: string;
  members: TeamMember[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  lastUpdated: string;
  version: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class TeamContentService {
  private cache: TeamContent | null = null;
  private cacheExpiry = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(): boolean {
    return this.cache !== null && Date.now() < this.cacheExpiry;
  }

  async getTeamContent(language: string = 'en'): Promise<TeamContent> {
    try {
      // Return cached data if valid
      if (this.isCacheValid()) {
        console.log(`✅ Returning cached team content for ${language}`);
        return this.cache!;
      }

      console.log(`🔄 Fetching team content from API for language: ${language}...`);
      
      const response = await fetch(`${API_BASE_URL}/team-content?lang=${language}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TeamContent> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error('Invalid response format from API');
      }

      console.log('✅ Team content loaded successfully');
      console.log('📊 Team stats:', {
        title: result.data.title,
        membersCount: result.data.members.length,
        activeMembers: result.data.members.filter(m => m.isActive).length,
      });
      
      // Update cache
      this.cache = result.data;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;
      
      return result.data;

    } catch (error) {
      console.error('❌ Error fetching team content:', error);
      
      // Return cached data if available
      if (this.cache) {
        console.log('⚠️ Returning cached data due to API error');
        return this.cache;
      }
      
      // Return fallback data
      console.log('⚠️ Returning fallback team content');
      return this.getFallbackContent();
    }
  }

  private getFallbackContent(): TeamContent {
    return {
      id: 'fallback',
      title: 'Team Are Helping You',
      subtitle: '',
      members: [
        {
          id: 'member-1',
          name: 'Sangit Alam',
          position: 'Trafikskolechef, Utbildningsledare',
          image: {
            url: '/img/team/1.png',
            publicId: 'team/sangit-alam'
          },
          description: '',
          order: 1,
          isActive: true
        },
        {
          id: 'member-2',
          name: 'Mrad Sarkes',
          position: 'Trafiklärare',
          image: {
            url: '/img/team/2.png',
            publicId: 'team/mrad-sarkes'
          },
          description: '',
          order: 2,
          isActive: true
        }
      ],
      seo: {
        title: 'Our Team - ABS Trafikskola',
        description: 'Meet our experienced driving instructors and team at ABS Trafikskola AB.',
        keywords: ['team', 'driving instructors', 'ABS Trafikskola', 'staff']
      },
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }

  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
    console.log('🗑️ Team content cache cleared');
  }

  async preloadContent(): Promise<void> {
    try {
      await this.getTeamContent();
      console.log('⚡ Team content preloaded successfully');
    } catch (error) {
      console.error('❌ Failed to preload team content:', error);
    }
  }
}

// Export singleton instance
const teamContentService = new TeamContentService();
export default teamContentService;
