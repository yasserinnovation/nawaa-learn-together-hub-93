import { Helmet } from 'react-helmet-async';
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Star, Phone, Mail, Globe, Wifi, Search, Filter } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ScrollReveal from "@/components/common/ScrollReveal";
import { Space } from "@/types/space";

const AllSpaces = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedSpaces: Space[] = (data || []).map(space => ({
        id: space.id,
        name: space.name,
        type: space.type as 'library' | 'classroom' | 'makerspace' | 'coworking' | 'hall',
        address: space.address || '',
        city: space.city,
        owner: space.owner || '',
        description: space.description || '',
        images: space.images || ['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'],
        equipment: space.equipment || [],
        capacity: space.capacity || 10,
        pricePerHour: space.price_per_hour || 50,
        rating: space.rating || 4.5,
        coordinates: {
          lat: (space.coordinates as any)?.lat || 30.0444,
          lng: (space.coordinates as any)?.lng || 31.2357
        },
        availability: {
          days: (space.availability as any)?.days || [],
          hours: (space.availability as any)?.hours || '9:00 AM - 6:00 PM'
        }
      }));

      setSpaces(convertedSpaces);
    } catch (error) {
      console.error('Error fetching spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(spaces.map(space => space.city))].sort();
    return uniqueCities;
  }, [spaces]);

  const spaceTypes = useMemo(() => {
    const uniqueTypes = [...new Set(spaces.map(space => space.type))].sort();
    return uniqueTypes;
  }, [spaces]);

  const filteredAndSortedSpaces = useMemo(() => {
    let filtered = spaces.filter(space => {
      const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           space.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           space.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCity = selectedCity === "all" || space.city === selectedCity;
      const matchesType = selectedType === "all" || space.type === selectedType;
      
      return matchesSearch && matchesCity && matchesType;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "city":
          return a.city.localeCompare(b.city);
        case "price":
          return a.pricePerHour - b.pricePerHour;
        case "rating":
          return b.rating - a.rating;
        case "capacity":
          return b.capacity - a.capacity;
        default:
          return 0;
      }
    });

    return filtered;
  }, [spaces, searchTerm, selectedCity, selectedType, sortBy]);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "makerspace": "bg-primary-100 text-primary-700 border-primary-200",
      "library": "bg-green-100 text-green-700 border-green-200",
      "classroom": "bg-blue-100 text-blue-700 border-blue-200",
      "coworking": "bg-purple-100 text-purple-700 border-purple-200",
      "hall": "bg-orange-100 text-orange-700 border-orange-200"
    };
    return colors[type] || "bg-muted text-muted-foreground border-border";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "makerspace":
        return "🔧";
      case "library":
        return "📚";
      case "classroom":
        return "🏫";
      case "coworking":
        return "💼";
      case "hall":
        return "🏛️";
      default:
        return "🏢";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading all spaces..." />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Learning Spaces in Egypt | Nawaa - Complete Directory</title>
        <meta name="description" content="Comprehensive directory of learning spaces in Egypt. Find makerspaces, libraries, classrooms, coworking spaces and halls across all cities. دليل الأماكن التعليمية في مصر" />
        <meta name="keywords" content="learning spaces Egypt, makerspaces, libraries, classrooms, coworking spaces, أماكن التعلم, مساحات التعلم" />
        <meta property="og:title" content="All Learning Spaces in Egypt | Nawaa" />
        <meta property="og:description" content="Complete directory of 130+ learning spaces across Egypt including makerspaces, libraries, and educational facilities." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/all-spaces" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "All Learning Spaces in Egypt",
            "description": "Complete directory of learning spaces in Egypt including makerspaces, libraries, classrooms, and coworking spaces",
            "url": "/all-spaces",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": spaces.length,
              "itemListElement": spaces.slice(0, 20).map((space, index) => ({
                "@type": "Place",
                "position": index + 1,
                "name": space.name,
                "description": space.description,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": space.address,
                  "addressLocality": space.city,
                  "addressCountry": "EG"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": space.coordinates.lat,
                  "longitude": space.coordinates.lng
                }
              }))
            },
            "provider": {
              "@type": "Organization",
              "name": "Nawaa"
            }
          })}
        </script>
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <header className="bg-gradient-to-br from-primary-400 to-primary-600 text-primary-foreground py-20" role="banner">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              جميع الأماكن التعليمية في مصر
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              All Learning Spaces in Egypt
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-80">
              دليل شامل لجميع الأماكن التعليمية في مصر - مساحات التصنيع، المكتبات، الفصول الدراسية، ومساحات العمل المشترك
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-sm opacity-80">Makerspaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm opacity-80">Libraries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🏫</div>
                <div className="text-sm opacity-80">Classrooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-sm opacity-80">Coworking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-sm opacity-80">Halls</div>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Filters Section */}
          <section className="py-8 bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search spaces by name, city, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full md:w-48 bg-background">
                    <SelectValue placeholder="Filter by City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-48 bg-background">
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {spaceTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 bg-background">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="city">City A-Z</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="rating">Rating: High to Low</SelectItem>
                    <SelectItem value="capacity">Capacity: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing {filteredAndSortedSpaces.length} of {spaces.length} spaces
              </div>
            </div>
          </section>

          {/* Spaces Grid */}
          <section className="py-16 bg-background" aria-label="Learning spaces directory">
            <div className="container mx-auto px-4">
              {filteredAndSortedSpaces.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="list">
                  {filteredAndSortedSpaces.map((space, index) => (
                    <ScrollReveal key={space.id} delay={index * 50}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 border-border" role="listitem">
                        <div className="relative">
                          <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                            <img 
                              src={space.images[0]}
                              alt={`${space.name} - ${space.type} in ${space.city}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className={`${getTypeColor(space.type)} border`}>
                                {getTypeIcon(space.type)} {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
                              </Badge>
                            </div>
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-xs font-medium">{space.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-card-foreground line-clamp-1">{space.name}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="line-clamp-1">{space.city}</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">{space.description}</p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{space.capacity} people</span>
                            </div>
                            <div className="font-semibold text-primary">
                              {space.pricePerHour} EGP/hour
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            <strong>Owner:</strong> {space.owner}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {space.equipment.slice(0, 3).map((item) => (
                              <span key={item} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                            {space.equipment.length > 3 && (
                              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                                +{space.equipment.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="pt-2 border-t border-border">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Globe className="w-3 h-3 mr-1" />
                              <span>Available: {space.availability.hours}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No spaces found</h3>
                  <p className="text-muted-foreground">
                    No spaces match your current search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">{spaces.length}</div>
                  <div className="text-sm text-muted-foreground">Total Spaces</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">{cities.length}</div>
                  <div className="text-sm text-muted-foreground">Cities Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">{spaceTypes.length}</div>
                  <div className="text-sm text-muted-foreground">Space Types</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round(spaces.reduce((sum, space) => sum + space.rating, 0) / spaces.length * 10) / 10}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default AllSpaces;