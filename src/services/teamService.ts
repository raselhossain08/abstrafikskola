// Team service for frontend public pages

// Team member interface for type safety
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image?: {
    url: string;
    publicId: string;
  };
  order: number;
  isActive: boolean;
}

export interface TeamContent {
  members: TeamMember[];
}

class TeamService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  /**
   * Get team content for public frontend
   * @param language Language code (en, sv, ar)
   * @returns Promise<TeamContent>
   */
  async getTeamContent(language: string = 'en'): Promise<TeamContent> {
    try {
      const response = await fetch(`${this.baseUrl}/api/team-content?lang=${language}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch team content');
      }

      // Filter only active members and sort by order
      const activeMembers = result.data.members
        .filter((member: TeamMember) => member.isActive)
        .sort((a: TeamMember, b: TeamMember) => a.order - b.order);

      return {
        members: activeMembers
      };
    } catch (error) {
      console.error('Error fetching team content:', error);
      throw new Error('Failed to load team content');
    }
  }

  /**
   * Get team content with error handling and fallback
   * @param language Language code
   * @returns Promise<TeamContent> with fallback data if API fails
   */
  async getTeamContentWithFallback(language: string = 'en'): Promise<TeamContent> {
    try {
      return await this.getTeamContent(language);
    } catch (error) {
      console.error('Team service error, returning fallback data:', error);
      
      // Return fallback data if API fails
      return {
        members: [
          {
            id: 'fallback-1',
            name: 'Sangit Alam',
            position: 'Trafikskolechef, Utbildningsledare',
            description: 'Experienced driving instructor and school manager',
            image: {
              url: '/img/team/1.png',
              publicId: ''
            },
            order: 1,
            isActive: true
          },
          {
            id: 'fallback-2',
            name: 'Mrad Sarkes',
            position: 'Trafiklärare',
            description: 'Professional driving instructor',
            image: {
              url: '/img/team/2.png',
              publicId: ''
            },
            order: 2,
            isActive: true
          }
        ]
      };
    }
  }
}

// Export singleton instance
export const teamService = new TeamService();
export default teamService;
