import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/HeroSection';
import { useToast } from '@/hooks/use-toast';

export interface SearchResult {
  digitalProfile: {
    ageRange: string;
    firstTrace: string;
    persona: string;
    traceScore: number;
  };
  platforms: Array<{
    name: string;
    confidence: number;
    snippet: string;
    lastActive: string;
    risk: 'low' | 'medium' | 'high';
  }>;
  breaches: Array<{
    source: string;
    date: string;
    data: string[];
    severity: 'low' | 'medium' | 'high';
  }>;
  networkConnections: Array<{
    platform: string;
    connectedTo: string;
    confidence: number;
  }>;
}

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const generateMockResults = (query: string, queryType: 'email' | 'username' | 'name'): SearchResult => {
    // Generate hash from query for consistent results
    const hash = query.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const platforms = [
      'GitHub', 'LinkedIn', 'Twitter', 'Reddit', 'Instagram', 'TikTok', 'Facebook',
      'YouTube', 'Twitch', 'Discord', 'Snapchat', 'Pinterest', 'Tumblr', 'Medium',
      'Stack Overflow', 'Behance', 'Dribbble', 'DeviantArt', 'Flickr', 'Vimeo'
    ];
    
    const breachSources = [
      'LinkedIn', 'Adobe', 'Equifax', 'Yahoo', 'Facebook', 'Twitter', 'Dropbox',
      'Uber', 'Marriott', 'Capital One', 'T-Mobile', 'Anthem', 'Target', 'Home Depot',
      'eBay', 'Sony', 'Heartland', 'TJX', 'Canva', 'Zoom', 'Clubhouse', 'Parler'
    ];
    
    // Generate platforms based on query
    const numPlatforms = Math.abs(hash % 6) + 3; // 3-8 platforms
    const selectedPlatforms = platforms
      .sort(() => 0.5 - Math.random())
      .slice(0, numPlatforms)
      .map((platform, index) => {
        const confidence = Math.abs((hash + index) % 30) + 60; // 60-90 confidence
        const risks = ['low', 'medium', 'high'] as const;
        const risk = risks[Math.abs(hash + index) % 3];
        
        const snippets = {
          'GitHub': ['Active developer', 'Open source contributor', 'Private repos visible', 'Frequent commits'],
          'LinkedIn': ['Professional profile', 'Work history visible', 'Network of 500+ contacts', 'Job seeker'],
          'Twitter': ['Public tweets', 'Political opinions shared', 'Personal photos posted', 'Location tagged'],
          'Reddit': ['Comment history', 'Subreddit activity', 'Personal stories shared', 'Controversial posts'],
          'Instagram': ['Photo timeline', 'Story highlights', 'Tagged locations', 'Friend connections'],
          'TikTok': ['Video content', 'Viral posts', 'Dance videos', 'Comedy skits'],
          'Facebook': ['Family photos', 'Life events', 'Check-ins', 'Political posts'],
          'YouTube': ['Video uploads', 'Comment activity', 'Subscription list', 'Playlist public'],
          'Twitch': ['Stream schedule', 'Chat history', 'Donation records', 'Gaming stats'],
          'Discord': ['Server activity', 'Voice chat logs', 'Gaming groups', 'Message history'],
          'Snapchat': ['Story posts', 'Snap map', 'Friend activity', 'Bitmoji usage'],
          'Pinterest': ['Board collections', 'Pin activity', 'Interest data', 'Shopping behavior'],
          'Tumblr': ['Blog posts', 'Reblog activity', 'Tag usage', 'Anonymous asks'],
          'Medium': ['Article publications', 'Reading history', 'Clap activity', 'Follow network'],
          'Stack Overflow': ['Question history', 'Answer contributions', 'Reputation score', 'Code examples'],
          'Behance': ['Creative portfolio', 'Project showcase', 'Client work', 'Design trends'],
          'Dribbble': ['Design shots', 'Work progress', 'Community likes', 'Skill showcase'],
          'DeviantArt': ['Artwork gallery', 'Favorite collections', 'Journal entries', 'Group memberships'],
          'Flickr': ['Photo albums', 'Camera metadata', 'Location data', 'Creative commons'],
          'Vimeo': ['Video portfolio', 'Creative projects', 'Professional work', 'Privacy settings']
        };
        
        const lastActiveOptions = ['2 hours ago', '1 day ago', '3 days ago', '1 week ago', '2 weeks ago', '1 month ago'];
        
        return {
          name: platform,
          confidence,
          snippet: snippets[platform as keyof typeof snippets]?.[Math.abs(hash + index) % 4] || 'Profile activity detected',
          lastActive: lastActiveOptions[Math.abs(hash + index) % lastActiveOptions.length],
          risk
        };
      });
    
    // Generate breaches
    const numBreaches = Math.abs(hash % 4); // 0-3 breaches
    const selectedBreaches = breachSources
      .sort(() => 0.5 - Math.random())
      .slice(0, numBreaches)
      .map((source, index) => {
        const dataTypes = ['Email', 'Password', 'Full Name', 'Phone Number', 'Address', 'Date of Birth', 'Social Security', 'Credit Card', 'IP Address', 'Username', 'Profile Photo', 'Messages'];
        const numDataTypes = Math.abs((hash + index) % 4) + 2; // 2-5 data types
        const selectedData = dataTypes.sort(() => 0.5 - Math.random()).slice(0, numDataTypes);
        
        const severities = ['low', 'medium', 'high'] as const;
        const severity = severities[Math.abs(hash + index) % 3];
        
        const dates = [
          '2023-12-15', '2023-08-22', '2023-03-10', '2022-11-05', '2022-07-18',
          '2022-02-14', '2021-09-30', '2021-06-12', '2021-01-25', '2020-10-08',
          '2020-05-20', '2019-12-03', '2019-08-15', '2019-04-28', '2018-11-10'
        ];
        
        return {
          source,
          date: dates[Math.abs(hash + index) % dates.length],
          data: selectedData,
          severity
        };
      });
    
    // Generate profile based on query type and content
    const ageRanges = ['18-25', '25-35', '35-45', '45-55', '55-65', '65+'];
    const ageRange = ageRanges[Math.abs(hash) % ageRanges.length];
    
    const firstTraceYears = ['2008', '2010', '2012', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
    const firstTraceYear = firstTraceYears[Math.abs(hash) % firstTraceYears.length];
    const firstTracePlatforms = ['MySpace', 'Facebook', 'Twitter', 'LinkedIn', 'GitHub', 'Reddit', 'Instagram', 'YouTube'];
    const firstTracePlatform = firstTracePlatforms[Math.abs(hash) % firstTracePlatforms.length];
    
    const personas = [
      'Tech-savvy developer', 'Social media enthusiast', 'Privacy-conscious user', 'Content creator',
      'Gaming enthusiast', 'Professional networker', 'Digital nomad', 'Entrepreneur',
      'Artist/Creative', 'Student/Academic', 'Fitness enthusiast', 'Travel blogger',
      'Business professional', 'Freelancer', 'Activist', 'Minimalist online presence'
    ];
    const persona = personas[Math.abs(hash) % personas.length];
    
    // Calculate trace score based on number of platforms and breaches
    const baseScore = 30 + (selectedPlatforms.length * 8) + (selectedBreaches.length * 10);
    const traceScore = Math.min(Math.max(baseScore, 20), 95);
    
    // Generate network connections
    const connections = selectedPlatforms.slice(0, Math.min(3, selectedPlatforms.length)).map((platform, index) => {
      const connectionTypes = [
        'Same username across platforms',
        'Linked in bio',
        'Cross-posted content',
        'Similar posting patterns',
        'Shared contact information',
        'Friend/follower overlap',
        'Same profile photo',
        'Connected email addresses'
      ];
      
      return {
        platform: platform.name,
        connectedTo: connectionTypes[Math.abs(hash + index) % connectionTypes.length],
        confidence: Math.abs((hash + index) % 25) + 65 // 65-90 confidence
      };
    });
    
    return {
      digitalProfile: {
        ageRange,
        firstTrace: `Found you on ${firstTracePlatform} in ${firstTraceYear}`,
        persona,
        traceScore
      },
      platforms: selectedPlatforms,
      breaches: selectedBreaches,
      networkConnections: connections
    };
  };

  const handleSearch = async (query: string, queryType: 'email' | 'username' | 'name') => {
    setIsSearching(true);
    setSearchQuery(query);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults = generateMockResults(query, queryType);
      setSearchResults(mockResults);
      
      toast({
        title: "Trace Complete",
        description: `Found ${mockResults.platforms.length} platforms and ${mockResults.breaches.length} breaches`,
      });
      
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to complete trace. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleNewSearch = () => {
    setSearchResults(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {isSearching && <LoadingScreen query={searchQuery} />}
      
      {!searchResults && !isSearching && (
        <>
          <HeroSection />
          <SearchForm onSearch={handleSearch} />
        </>
      )}
      
      {searchResults && !isSearching && (
        <ResultsDisplay 
          results={searchResults} 
          query={searchQuery}
          onNewSearch={handleNewSearch}
        />
      )}
    </div>
  );
};

export default Index;
