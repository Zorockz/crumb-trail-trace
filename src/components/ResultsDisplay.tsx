import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Shield, 
  AlertTriangle, 
  Eye,
  ExternalLink,
  Clock,
  Network,
  TrendingUp
} from 'lucide-react';
import { SearchResult } from '@/pages/Index';

interface ResultsDisplayProps {
  results: SearchResult;
  query: string;
  onNewSearch: () => void;
}

export const ResultsDisplay = ({ results, query, onNewSearch }: ResultsDisplayProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  const handleShare = () => {
    const shareText = `Trace Score: ${results.digitalProfile.traceScore}/100. Found on ${results.platforms.length} platforms. ${results.breaches.length} breaches detected. Check your digital footprint at Trace.Me`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Digital Trace Report',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onNewSearch}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Search
            </Button>
            <div>
              <h1 className="text-2xl font-bold font-mono">
                Trace Results
              </h1>
              <p className="text-muted-foreground">
                Query: <span className="text-primary font-mono">{query}</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Trace Score Card */}
        <Card className="card-cyber mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Digital Trace Score</h3>
                <p className="text-muted-foreground">
                  How traceable you are across the internet
                </p>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${getScoreColor(results.digitalProfile.traceScore)}`}>
                  {results.digitalProfile.traceScore}
                  <span className="text-lg text-muted-foreground">/100</span>
                </div>
                <Progress 
                  value={results.digitalProfile.traceScore} 
                  className="w-32 mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="breaches">Breaches</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Digital Profile */}
              <Card className="card-cyber">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Digital Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Age Range</p>
                    <p className="font-semibold">{results.digitalProfile.ageRange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">First Digital Trace</p>
                    <p className="font-semibold">{results.digitalProfile.firstTrace}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Digital Persona</p>
                    <p className="font-semibold">{results.digitalProfile.persona}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="card-cyber">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platforms Found</span>
                    <span className="font-semibold">{results.platforms.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Breaches</span>
                    <span className="font-semibold text-red-400">{results.breaches.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Connections</span>
                    <span className="font-semibold">{results.networkConnections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">High Risk Platforms</span>
                    <span className="font-semibold text-red-400">
                      {results.platforms.filter(p => p.risk === 'high').length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-4">
            <div className="grid gap-4">
              {results.platforms.map((platform, index) => (
                <Card key={index} className="card-cyber">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="platform-icon">
                            <span className="text-xs font-bold">
                              {platform.name.charAt(0)}
                            </span>
                          </div>
                          <h3 className="font-semibold">{platform.name}</h3>
                          <Badge className={getRiskColor(platform.risk)}>
                            {platform.risk}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {platform.snippet}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {platform.lastActive}
                          </span>
                          <span>
                            Match: {platform.confidence}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={platform.confidence} className="w-16" />
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="breaches" className="space-y-4">
            <div className="grid gap-4">
              {results.breaches.map((breach, index) => (
                <Card key={index} className={`card-cyber ${breach.severity === 'high' ? 'card-danger' : breach.severity === 'medium' ? 'card-warning' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <h3 className="font-semibold">{breach.source}</h3>
                          <Badge className={getRiskColor(breach.severity)}>
                            {breach.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Breach Date: {new Date(breach.date).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {breach.data.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <Card className="card-cyber">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="w-5 h-5 mr-2" />
                  Network Connections
                </CardTitle>
                <CardDescription>
                  How your accounts are connected across platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.networkConnections.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold">{connection.platform}</p>
                      <p className="text-sm text-muted-foreground">
                        {connection.connectedTo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{connection.confidence}%</p>
                      <Progress value={connection.confidence} className="w-20" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};