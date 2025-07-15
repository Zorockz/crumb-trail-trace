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

  const handleSearch = async (query: string, queryType: 'email' | 'username' | 'name') => {
    setIsSearching(true);
    setSearchQuery(query);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results for demonstration
      const mockResults: SearchResult = {
        digitalProfile: {
          ageRange: '25-35',
          firstTrace: 'Found you on GitHub in 2015',
          persona: 'Tech-savvy, privacy-conscious developer',
          traceScore: Math.floor(Math.random() * 40) + 40, // 40-80 range
        },
        platforms: [
          {
            name: 'GitHub',
            confidence: 95,
            snippet: 'Active developer, 47 repositories',
            lastActive: '2 days ago',
            risk: 'low'
          },
          {
            name: 'LinkedIn',
            confidence: 88,
            snippet: 'Software Engineer at TechCorp',
            lastActive: '1 week ago',
            risk: 'medium'
          },
          {
            name: 'Twitter',
            confidence: 76,
            snippet: 'Occasional tech tweets, 245 followers',
            lastActive: '3 days ago',
            risk: 'medium'
          },
          {
            name: 'Reddit',
            confidence: 64,
            snippet: 'Active in r/programming, r/cybersecurity',
            lastActive: '5 hours ago',
            risk: 'high'
          }
        ],
        breaches: [
          {
            source: 'LinkedIn',
            date: '2021-04-01',
            data: ['Email', 'Hashed Password', 'Full Name'],
            severity: 'high'
          },
          {
            source: 'Adobe',
            date: '2013-10-01',
            data: ['Email', 'Encrypted Password'],
            severity: 'medium'
          }
        ],
        networkConnections: [
          {
            platform: 'GitHub',
            connectedTo: 'LinkedIn profile',
            confidence: 92
          },
          {
            platform: 'Twitter',
            connectedTo: 'Same bio as GitHub',
            confidence: 78
          }
        ]
      };
      
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
