// Combined data service that supports both static imports and dynamic loading
import dynamicDataService from './dynamicDataService';

// Static imports for fallback and TypeScript type checking
import membersData from '../data/members.json';
import projectsData from '../data/projects.json';
import eventsData from '../data/events.json';
import sponsorsData from '../data/sponsors.json';
import galleryData from '../data/gallery.json';
import merchandiseData from '../data/merchandise.json';
import newsData from '../data/news.json';
import achievementsData from '../data/achievements.json';
import racingJourneyData from '../data/racing-journey.json';
import teamInfoData from '../data/team-info.json';

// Flag to determine whether to use dynamic loading or static imports
const USE_DYNAMIC_LOADING = true;

// Types
export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ProjectMember {
  role: string;
  member_id: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date?: string;
  image_url: string;
  members: ProjectMember[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
  isUpcoming: boolean;
  registrationLink?: string;
  registrationDeadline?: string;
  results?: {
    position: string;
    team: string;
    achievements?: string[];
  }[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  website: string;
  description?: string;
  since?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
  thumbnail?: string;
  description?: string;
  date: string;
}

export interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  availableSizes?: string[];
  stockQuantity: number;
  featured: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  imageUrl: string;
  additionalAwards?: string[];
}

export interface RacingJourney {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface TeamInfo {
  welcome: {
    title: string;
    description: string[];
    logoImage: string;
    buttonText: string;
    buttonLink: string;
  };
  mission: {
    title: string;
    statement: string;
    values: {
      title: string;
      description: string;
    }[];
  };
}

// Data service with methods to access the local JSON data
const dataService = {
  // Helper to check data store status
  _dataStore: {
    members: null,
    projects: null,
    events: null,
    sponsors: null,
    gallery: null,
    merchandise: null,
    news: null,
    achievements: null,
    racingJourney: null,
    teamInfo: null
  },

  // Dynamic data loading methods
  _loadMembers: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.members) {
        dataService._dataStore.members = await dynamicDataService.getMembers();
      }
      return dataService._dataStore.members || membersData;
    }
    return membersData;
  },

  _loadProjects: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.projects) {
        dataService._dataStore.projects = await dynamicDataService.getProjects();
      }
      return dataService._dataStore.projects || projectsData;
    }
    return projectsData;
  },

  _loadEvents: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.events) {
        dataService._dataStore.events = await dynamicDataService.getEvents();
      }
      return dataService._dataStore.events || eventsData;
    }
    return eventsData;
  },

  _loadSponsors: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.sponsors) {
        dataService._dataStore.sponsors = await dynamicDataService.getSponsors();
      }
      return dataService._dataStore.sponsors || sponsorsData;
    }
    return sponsorsData;
  },

  _loadGallery: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.gallery) {
        dataService._dataStore.gallery = await dynamicDataService.getGallery();
      }
      return dataService._dataStore.gallery || galleryData;
    }
    return galleryData;
  },

  _loadMerchandise: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.merchandise) {
        dataService._dataStore.merchandise = await dynamicDataService.getMerchandise();
      }
      return dataService._dataStore.merchandise || merchandiseData;
    }
    return merchandiseData;
  },

  _loadNews: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.news) {
        dataService._dataStore.news = await dynamicDataService.getNews();
      }
      return dataService._dataStore.news || newsData;
    }
    return newsData;
  },

  _loadAchievements: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.achievements) {
        dataService._dataStore.achievements = await dynamicDataService.getAchievements();
      }
      return dataService._dataStore.achievements || achievementsData;
    }
    return achievementsData;
  },

  _loadRacingJourney: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.racingJourney) {
        dataService._dataStore.racingJourney = await dynamicDataService.getRacingJourney();
      }
      return dataService._dataStore.racingJourney || racingJourneyData;
    }
    return racingJourneyData;
  },

  _loadTeamInfo: async () => {
    if (USE_DYNAMIC_LOADING) {
      if (!dataService._dataStore.teamInfo) {
        dataService._dataStore.teamInfo = await dynamicDataService.getTeamInfo();
      }
      return dataService._dataStore.teamInfo || teamInfoData;
    }
    return teamInfoData;
  },

  // Member methods
  getAllMembers: async (): Promise<Member[]> => {
    const data = await dataService._loadMembers();
    return data as Member[];
  },
  
  getMemberById: async (id: string): Promise<Member | undefined> => {
    const data = await dataService._loadMembers();
    return (data as Member[]).find(member => member.id === id);
  },
  
  // Project methods
  getAllProjects: async (): Promise<Project[]> => {
    const data = await dataService._loadProjects();
    return data as Project[];
  },
  
  getProjectById: async (id: string): Promise<Project | undefined> => {
    const data = await dataService._loadProjects();
    return (data as Project[]).find(project => project.id === id);
  },
  
  // Helper method to get full member details for project members
  getProjectWithMembers: async (id: string): Promise<(Project & { memberDetails: Member[] }) | undefined> => {
    const projects = await dataService._loadProjects();
    const members = await dataService._loadMembers();
    
    const project = (projects as Project[]).find(p => p.id === id);
    if (!project) return undefined;
    
    const memberDetails = project.members.map(pm => {
      return (members as Member[]).find(m => m.id === pm.member_id);
    }).filter(m => m !== undefined) as Member[];
    
    return {
      ...project,
      memberDetails
    };
  },

  // Event methods
  getAllEvents: async (): Promise<Event[]> => {
    const data = await dataService._loadEvents();
    return data as Event[];
  },

  getEventById: async (id: string): Promise<Event | undefined> => {
    const data = await dataService._loadEvents();
    return (data as Event[]).find(event => event.id === id);
  },

  getUpcomingEvents: async (): Promise<Event[]> => {
    const data = await dataService._loadEvents();
    return (data as Event[]).filter(event => event.isUpcoming);
  },

  getPastEvents: async (): Promise<Event[]> => {
    const data = await dataService._loadEvents();
    return (data as Event[]).filter(event => !event.isUpcoming);
  },

  // Sponsor methods
  getAllSponsors: async (): Promise<Sponsor[]> => {
    const data = await dataService._loadSponsors();
    return data as Sponsor[];
  },

  getSponsorById: async (id: string): Promise<Sponsor | undefined> => {
    const data = await dataService._loadSponsors();
    return (data as Sponsor[]).find(sponsor => sponsor.id === id);
  },

  getSponsorsByTier: async (tier: Sponsor['tier']): Promise<Sponsor[]> => {
    const data = await dataService._loadSponsors();
    return (data as Sponsor[]).filter(sponsor => sponsor.tier === tier);
  },

  // Gallery methods
  getAllGalleryItems: async (): Promise<GalleryItem[]> => {
    const data = await dataService._loadGallery();
    return data as GalleryItem[];
  },

  getGalleryItemById: async (id: string): Promise<GalleryItem | undefined> => {
    const data = await dataService._loadGallery();
    return (data as GalleryItem[]).find(item => item.id === id);
  },

  getGalleryItemsByCategory: async (category: string): Promise<GalleryItem[]> => {
    const data = await dataService._loadGallery();
    return (data as GalleryItem[]).filter(item => item.category === category);
  },

  // Merchandise methods
  getAllMerchandise: async (): Promise<MerchandiseItem[]> => {
    const data = await dataService._loadMerchandise();
    return data as MerchandiseItem[];
  },

  getMerchandiseById: async (id: string): Promise<MerchandiseItem | undefined> => {
    const data = await dataService._loadMerchandise();
    return (data as MerchandiseItem[]).find(item => item.id === id);
  },

  getFeaturedMerchandise: async (): Promise<MerchandiseItem[]> => {
    const data = await dataService._loadMerchandise();
    return (data as MerchandiseItem[]).filter(item => item.featured);
  },

  getMerchandiseByCategory: async (category: string): Promise<MerchandiseItem[]> => {
    const data = await dataService._loadMerchandise();
    return (data as MerchandiseItem[]).filter(item => item.category === category);
  },

  // News methods
  getAllNews: async (): Promise<NewsItem[]> => {
    const data = await dataService._loadNews();
    return data as NewsItem[];
  },

  getNewsById: async (id: string): Promise<NewsItem | undefined> => {
    const data = await dataService._loadNews();
    return (data as NewsItem[]).find(item => item.id === id);
  },

  getNewsByCategory: async (category: string): Promise<NewsItem[]> => {
    const data = await dataService._loadNews();
    return (data as NewsItem[]).filter(item => item.category === category);
  },

  getRecentNews: async (count: number = 3): Promise<NewsItem[]> => {
    const data = await dataService._loadNews();
    return [...(data as NewsItem[])]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  },

  // Achievement methods
  getAllAchievements: async (): Promise<Achievement[]> => {
    const data = await dataService._loadAchievements();
    return data as Achievement[];
  },

  getAchievementById: async (id: string): Promise<Achievement | undefined> => {
    const data = await dataService._loadAchievements();
    return (data as Achievement[]).find(item => item.id === id);
  },

  getAchievementsByCategory: async (category: string): Promise<Achievement[]> => {
    const data = await dataService._loadAchievements();
    return (data as Achievement[]).filter(item => item.category === category);
  },
  
  getRecentAchievements: async (count: number = 3): Promise<Achievement[]> => {
    const data = await dataService._loadAchievements();
    return [...(data as Achievement[])]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  },
  
  // Racing Journey methods
  getAllRacingJourneyItems: async (): Promise<RacingJourney[]> => {
    const data = await dataService._loadRacingJourney();
    return data as RacingJourney[];
  },
  
  // Team Info methods
  getTeamInfo: async (): Promise<TeamInfo> => {
    const data = await dataService._loadTeamInfo();
    return data as TeamInfo;
  },
  
  getTeamWelcomeInfo: async () => {
    const data = await dataService._loadTeamInfo();
    return (data as TeamInfo).welcome;
  },
  
  getTeamMissionInfo: async () => {
    const data = await dataService._loadTeamInfo();
    return (data as TeamInfo).mission;
  },
  
  // Force refresh all data
  refreshAllData: async () => {
    dataService._dataStore = {
      members: null,
      projects: null,
      events: null,
      sponsors: null,
      gallery: null,
      merchandise: null,
      news: null,
      achievements: null,
      racingJourney: null,
      teamInfo: null
    };
    
    // Preload all data
    await Promise.all([
      dataService._loadMembers(),
      dataService._loadProjects(),
      dataService._loadEvents(),
      dataService._loadSponsors(),
      dataService._loadGallery(),
      dataService._loadMerchandise(),
      dataService._loadNews(),
      dataService._loadAchievements(),
      dataService._loadRacingJourney(),
      dataService._loadTeamInfo()
    ]);
    
    return true;
  }
};

export default dataService;