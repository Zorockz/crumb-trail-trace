import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Mail, User, AtSign } from 'lucide-react';

interface SearchFormProps {
  onSearch: (query: string, queryType: 'email' | 'username' | 'name') => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState<'email' | 'username' | 'name'>('username');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), queryType);
    }
  };

  const getPlaceholder = () => {
    switch (queryType) {
      case 'email':
        return 'johndoe@example.com';
      case 'username':
        return '@chaoticnerd';
      case 'name':
        return 'Kayla S';
      default:
        return 'Enter search query';
    }
  };

  const getIcon = () => {
    switch (queryType) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'username':
        return <AtSign className="w-4 h-4" />;
      case 'name':
        return <User className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pb-12">
      <Card className="card-cyber p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-mono mb-2">
            Start Your Digital Trace
          </h2>
          <p className="text-muted-foreground">
            Choose your search method and enter the information to trace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={queryType} onValueChange={(value) => setQueryType(value as typeof queryType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="username" className="flex items-center gap-2">
                <AtSign className="w-4 h-4" />
                Username
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </TabsTrigger>
            </TabsList>

            <TabsContent value="username" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username or Handle</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="name" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="additional" className="text-sm text-muted-foreground">
              Additional context (optional)
            </Label>
            <Input
              id="additional"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Location, company, or profile link to improve matching"
              className="text-sm"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyber-orange to-cyber-blue hover:from-cyber-orange/90 hover:to-cyber-blue/90 transition-all duration-300"
            disabled={!query.trim()}
          >
            <Search className="w-5 h-5 mr-2" />
            Start Tracing
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            🔐 No data is stored • 🔍 Uses public information only • 📊 Results are shareable
          </p>
        </div>
      </Card>
    </div>
  );
};