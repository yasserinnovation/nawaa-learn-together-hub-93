import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit, Trash2, MapPin, Users, Star, BookOpen, Wrench, Trophy, Map, Shield, Activity, AlertTriangle, TrendingUp, Clock, Settings } from "lucide-react";
import AddSpaceForm from "@/components/admin/AddSpaceForm";
import EditSpaceForm from "@/components/admin/EditSpaceForm";
import AddCourseForm from "@/components/admin/AddCourseForm";
import AddToolForm from "@/components/admin/AddToolForm";
import AddCompetitionForm from "@/components/admin/AddCompetitionForm";
import LocationMap from "@/components/admin/LocationMap";
import { useMapboxToken } from "@/hooks/useMapboxToken";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface Space {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  owner?: string;
  description?: string;
  capacity?: number;
  price_per_hour?: number;
  rating?: number;
  equipment: string[];
  coordinates: {
    lat?: number;
    lng?: number;
  };
  availability: {
    days: string[];
    hours?: string;
  };
  images: string[];
  created_at?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  age_group: string;
  duration_weeks: number;
  price: number;
  level: string;
  image_url?: string;
  requirements: string[];
  learning_outcomes: string[];
  created_at?: string;
}

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  rental_price_per_day: number;
  purchase_price?: number;
  availability_status: string;
  condition: string;
  images: string[];
  location?: string;
  owner_contact?: string;
  created_at?: string;
}

interface Competition {
  id: string;
  title: string;
  description: string;
  category: string;
  age_group: string;
  registration_start_date: string;
  registration_end_date: string;
  competition_date: string;
  max_participants?: number;
  entry_fee: number;
  prizes: any[];
  rules?: string;
  requirements: string[];
  status: string;
  image_url?: string;
  location?: string;
  created_at?: string;
}

interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  city?: string;
  interests: string[];
  rating: number;
  total_courses_completed: number;
  total_hours_learned: number;
  account_status: string;
  user_type: string;
  created_at?: string;
}


const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [showAddToolForm, setShowAddToolForm] = useState(false);
  const [showAddCompetitionForm, setShowAddCompetitionForm] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSpaces: 0,
    totalCourses: 0,
    totalTools: 0,
    totalCompetitions: 0,
    avgUserRating: 0,
    avgSpaceRating: 0,
    totalReviews: 0,
    activeUsersLast30Days: 0,
    estimatedRevenue: 0
  });
  const [showMapView, setShowMapView] = useState(false);

  // Redirect if not authenticated or not admin
  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                You don't have permission to access the admin dashboard. 
                This area is restricted to administrators only.
              </p>
              <Button onClick={() => window.history.back()} variant="outline">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Get Mapbox token
  const { token: mapboxToken, loading: tokenLoading, error: tokenError } = useMapboxToken();

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
      fetchDashboardStats();
    }
  }, [isAdmin]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchSpaces(),
      fetchCourses(),
      fetchTools(),
      fetchCompetitions(),
      fetchProfiles()
    ]);
  };

  // Fetch dashboard statistics using the secure function
  const fetchDashboardStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_dashboard_stats');
      
      if (error) throw error;
      
      // Type the response properly
      const statsData = data as any;
      
      setStats({
        totalUsers: statsData.total_users || 0,
        totalSpaces: statsData.total_spaces || 0,
        totalCourses: statsData.total_courses || 0,
        totalTools: statsData.total_tools || 0,
        totalCompetitions: statsData.total_competitions || 0,
        avgUserRating: Number((statsData.avg_user_rating || 0).toFixed(1)),
        avgSpaceRating: Number((statsData.avg_space_rating || 0).toFixed(1)),
        totalReviews: statsData.total_reviews || 0,
        activeUsersLast30Days: statsData.active_users_last_30_days || 0,
        estimatedRevenue: Number((statsData.estimated_revenue || 0).toFixed(2)),
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        variant: "destructive",
        title: "Failed to load statistics",
        description: "Could not fetch dashboard statistics. Please try again.",
      });
    }
  };

  const fetchSpaces = async () => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to match our Space interface
      const spacesData: Space[] = (data || []).map((space: any) => ({
        ...space,
        coordinates: (space.coordinates as any) || { lat: 0, lng: 0 },
        availability: (space.availability as any) || { days: [], hours: "" }
      }));
      
      setSpaces(spacesData);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      toast({
        variant: "destructive",
        title: "Failed to fetch spaces",
        description: "Could not load spaces data. Please try again.",
      });
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        variant: "destructive",
        title: "Failed to fetch courses",
        description: "Could not load courses data. Please try again.",
      });
    }
  };

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast({
        variant: "destructive",
        title: "Failed to fetch tools",
        description: "Could not load tools data. Please try again.",
      });
    }
  };

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to match our Competition interface
      const competitionsData: Competition[] = (data || []).map((comp: any) => ({
        ...comp,
        prizes: (comp.prizes as any) || []
      }));
      
      setCompetitions(competitionsData);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      toast({
        variant: "destructive",
        title: "Failed to fetch competitions",
        description: "Could not load competitions data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        variant: "destructive",
        title: "Failed to fetch profiles",
        description: "Could not load user profiles. Please try again.",
      });
    }
  };

  const handleAddSpace = async (newSpaceData: any) => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .insert([{
          name: newSpaceData.name,
          type: newSpaceData.type,
          city: newSpaceData.city,
          address: newSpaceData.address,
          owner: newSpaceData.owner,
          description: newSpaceData.description,
          capacity: newSpaceData.capacity ? parseInt(newSpaceData.capacity) : null,
          price_per_hour: newSpaceData.pricePerHour ? parseFloat(newSpaceData.pricePerHour) : null,
          equipment: newSpaceData.equipment,
          coordinates: {
            lat: newSpaceData.coordinates.lat ? parseFloat(newSpaceData.coordinates.lat) : null,
            lng: newSpaceData.coordinates.lng ? parseFloat(newSpaceData.coordinates.lng) : null,
          },
          availability: newSpaceData.availability,
          images: newSpaceData.images
        }])
        .select()
        .single();

      if (error) throw error;

      // Type cast the new space data properly  
      const newSpace: Space = {
        ...data,
        coordinates: (data.coordinates as any) || { lat: 0, lng: 0 },
        availability: (data.availability as any) || { days: [], hours: "" }
      };

      setSpaces([newSpace, ...spaces]);
      setShowAddForm(false);
      toast({
        title: "Success",
        description: "Space added successfully!",
      });
    } catch (error) {
      console.error('Error adding space:', error);
      toast({
        variant: "destructive",
        title: "Failed to add space",
        description: "Could not add the space. Please try again.",
      });
    }
  };

  const handleEditSpace = async (updatedSpaceData: any) => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .update({
          name: updatedSpaceData.name,
          type: updatedSpaceData.type,
          city: updatedSpaceData.city,
          address: updatedSpaceData.address,
          owner: updatedSpaceData.owner,
          description: updatedSpaceData.description,
          capacity: updatedSpaceData.capacity ? parseInt(updatedSpaceData.capacity) : null,
          price_per_hour: updatedSpaceData.pricePerHour ? parseFloat(updatedSpaceData.pricePerHour) : null,
          equipment: updatedSpaceData.equipment,
          coordinates: {
            lat: updatedSpaceData.coordinates.lat ? parseFloat(updatedSpaceData.coordinates.lat) : null,
            lng: updatedSpaceData.coordinates.lng ? parseFloat(updatedSpaceData.coordinates.lng) : null,
          },
          availability: updatedSpaceData.availability,
          images: updatedSpaceData.images
        })
        .eq('id', updatedSpaceData.id)
        .select()
        .single();

      if (error) throw error;

      // Type cast the updated space data properly
      const updatedSpace: Space = {
        ...data,
        coordinates: (data.coordinates as any) || { lat: 0, lng: 0 },
        availability: (data.availability as any) || { days: [], hours: "" }
      };

      setSpaces(spaces.map(space => 
        space.id === updatedSpaceData.id ? updatedSpace : space
      ));
      setEditingSpace(null);
      toast({
        title: "Success",
        description: "Space updated successfully!",
      });
    } catch (error) {
      console.error('Error updating space:', error);
      toast({
        variant: "destructive",
        title: "Failed to update space",
        description: "Could not update the space. Please try again.",
      });
    }
  };

  const handleDeleteSpace = async (spaceId: string) => {
    if (!confirm('Are you sure you want to delete this space?')) return;

    try {
      const { error } = await supabase
        .from('spaces')
        .delete()
        .eq('id', spaceId);

      if (error) throw error;

      setSpaces(spaces.filter(space => space.id !== spaceId));
      toast({
        title: "Success",
        description: "Space deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting space:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete space",
        description: "Could not delete the space. Please try again.",
      });
    }
  };

  // Course handlers
  const handleAddCourse = async (courseData: any) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single();

      if (error) throw error;

      setCourses([data, ...courses]);
      setShowAddCourseForm(false);
      toast({
        title: "Success",
        description: "Course added successfully!",
      });
    } catch (error) {
      console.error('Error adding course:', error);
      toast({
        variant: "destructive",
        title: "Failed to add course",
        description: "Could not add the course. Please try again.",
      });
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      setCourses(courses.filter(course => course.id !== courseId));
      toast({
        title: "Success",
        description: "Course deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete course",
        description: "Could not delete the course. Please try again.",
      });
    }
  };

  // Tool handlers
  const handleAddTool = async (toolData: any) => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .insert([toolData])
        .select()
        .single();

      if (error) throw error;

      setTools([data, ...tools]);
      setShowAddToolForm(false);
      toast({
        title: "Success",
        description: "Tool added successfully!",
      });
    } catch (error) {
      console.error('Error adding tool:', error);
      toast({
        variant: "destructive",
        title: "Failed to add tool",
        description: "Could not add the tool. Please try again.",
      });
    }
  };

  const handleDeleteTool = async (toolId: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', toolId);

      if (error) throw error;

      setTools(tools.filter(tool => tool.id !== toolId));
      toast({
        title: "Success",
        description: "Tool deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete tool",
        description: "Could not delete the tool. Please try again.",
      });
    }
  };

  // Competition handlers
  const handleAddCompetition = async (competitionData: any) => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .insert([competitionData])
        .select()
        .single();

      if (error) throw error;

      // Type cast the new competition data properly
      const newCompetition: Competition = {
        ...data,
        prizes: (data.prizes as any) || []
      };

      setCompetitions([newCompetition, ...competitions]);
      setShowAddCompetitionForm(false);
      toast({
        title: "Success",
        description: "Competition added successfully!",
      });
    } catch (error) {
      console.error('Error adding competition:', error);
      toast({
        variant: "destructive",
        title: "Failed to add competition",
        description: "Could not add the competition. Please try again.",
      });
    }
  };

  const handleDeleteCompetition = async (competitionId: string) => {
    if (!confirm('Are you sure you want to delete this competition?')) return;

    try {
      const { error } = await supabase
        .from('competitions')
        .delete()
        .eq('id', competitionId);

      if (error) throw error;

      setCompetitions(competitions.filter(comp => comp.id !== competitionId));
      toast({
        title: "Success",
        description: "Competition deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting competition:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete competition",
        description: "Could not delete the competition. Please try again.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Nawaa Learning Platform</title>
        <meta
          name="description"
          content="Administrative dashboard for managing users, courses, spaces, tools, and competitions on the Nawaa learning platform."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${window.location.origin}/admin`} />
      </Helmet>

      <Layout>
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage spaces, users, and platform settings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                <Activity className="h-3 w-3" />
                System Active
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Admin Access
              </Badge>
            </div>
          </header>

          {/* Enhanced Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-label="Dashboard Statistics">
            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  {stats.activeUsersLast30Days} active (30 days)
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Learning Spaces</CardTitle>
                <MapPin className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalSpaces}</div>
                <p className="text-xs text-muted-foreground">
                  Avg rating: {stats.avgSpaceRating} stars
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Resources</CardTitle>
                <BookOpen className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.totalCourses + stats.totalTools + stats.totalCompetitions}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalCourses} courses • {stats.totalTools} tools • {stats.totalCompetitions} events
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Est. Revenue</CardTitle>
                <Trophy className="h-4 w-4 text-primary-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.estimatedRevenue.toLocaleString()} EGP</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalReviews} reviews • {stats.avgUserRating} avg rating
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Enhanced Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 h-12 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="spaces" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Spaces</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Courses</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Wrench className="h-4 w-4" />
                <span className="hidden sm:inline">Tools</span>
              </TabsTrigger>
              <TabsTrigger value="competitions" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Platform Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Total Platform Users</span>
                        <span className="font-semibold">{stats.totalUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t">
                        <span className="text-muted-foreground">Learning Resources</span>
                        <span className="font-semibold">{stats.totalCourses + stats.totalTools + stats.totalCompetitions}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t">
                        <span className="text-muted-foreground">Active Spaces</span>
                        <span className="font-semibold">{stats.totalSpaces}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t">
                        <span className="text-muted-foreground">Monthly Revenue Est.</span>
                        <span className="font-semibold text-green-600">{stats.estimatedRevenue.toLocaleString()} EGP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-muted-foreground">Database Connection</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t">
                        <span className="text-muted-foreground">Authentication</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t">
                        <span className="text-muted-foreground">Admin Role</span>
                        <Badge variant="default" className="bg-primary-100 text-primary-800">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Security Note:</strong> Your Postgres database has security patches available. 
                  Please upgrade your database in the Supabase dashboard to apply important security updates.
                </AlertDescription>
              </Alert>
            </TabsContent>

          <TabsContent value="spaces" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Spaces</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMapView(!showMapView)}
                  className="bg-blue-50 hover:bg-blue-100"
                >
                  <Map className="h-4 w-4 mr-2" />
                  {showMapView ? 'List View' : 'Map View'}
                </Button>
                <Button onClick={() => setShowAddForm(true)} className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Space
                </Button>
              </div>
            </div>

            {showMapView ? (
              <LocationMap 
                spaces={spaces} 
                mapboxToken={mapboxToken}
                onSpaceSelect={(space) => {
                  console.log('Selected space:', space);
                }}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>All Spaces</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                      <div className="text-lg">Loading spaces...</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {spaces.map((space) => (
                      <div key={space.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-medium">{space.name}</h3>
                              <p className="text-sm text-gray-600">
                                {space.type} • {space.city} {space.capacity && `• ${space.capacity} capacity`}
                              </p>
                              {space.coordinates.lat && space.coordinates.lng && (
                                <p className="text-xs text-blue-600">
                                  📍 {space.coordinates.lat.toFixed(4)}, {space.coordinates.lng.toFixed(4)}
                                </p>
                              )}
                            </div>
                            <Badge variant="default">
                              Active
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right mr-4">
                            {space.price_per_hour && (
                              <p className="font-medium">{space.price_per_hour} EGP/hr</p>
                            )}
                            <p className="text-sm text-gray-600">
                              {space.equipment.length} equipment items
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSpace(space)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSpace(space.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Courses</h2>
              <Button onClick={() => setShowAddCourseForm(true)} className="btn-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Courses ({courses.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <div className="text-lg">Loading courses...</div>
                  </div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No courses found. Add your first course to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-medium">{course.title}</h3>
                              <p className="text-sm text-gray-600">
                                {course.category} • {course.age_group} • {course.duration_weeks} weeks • {course.level}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {course.price} EGP
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Tools</h2>
              <Button onClick={() => setShowAddToolForm(true)} className="btn-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Tool
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Tools ({tools.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <div className="text-lg">Loading tools...</div>
                  </div>
                ) : tools.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No tools found. Add your first tool to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tools.map((tool) => (
                      <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-medium">{tool.name}</h3>
                              <p className="text-sm text-gray-600">
                                {tool.category} • {tool.condition} • {tool.availability_status}
                              </p>
                            </div>
                            <Badge variant={tool.availability_status === 'available' ? 'default' : 'secondary'}>
                              {tool.rental_price_per_day} EGP/day
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTool(tool.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Competitions</h2>
              <Button onClick={() => setShowAddCompetitionForm(true)} className="btn-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Competition
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Competitions ({competitions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <div className="text-lg">Loading competitions...</div>
                  </div>
                ) : competitions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No competitions found. Add your first competition to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {competitions.map((competition) => (
                      <div key={competition.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-medium">{competition.title}</h3>
                              <p className="text-sm text-gray-600">
                                {competition.category} • {competition.age_group} • {new Date(competition.competition_date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={competition.status === 'upcoming' ? 'default' : 'secondary'}>
                              {competition.entry_fee} EGP entry
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCompetition(competition.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Users</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {profiles.length} Total Users
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Avg Rating: {profiles.length > 0 ? (profiles.reduce((sum, p) => sum + (p.rating || 0), 0) / profiles.length).toFixed(1) : 'N/A'}
                </Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users ({profiles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <div className="text-lg">Loading users...</div>
                  </div>
                ) : profiles.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No users found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profiles.map((profile) => (
                      <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {profile.full_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">{profile.full_name}</h3>
                              <p className="text-sm text-gray-600">
                                {profile.email} • {profile.city} • {profile.user_type}
                              </p>
                              <div className="flex gap-2 mt-1">
                                {profile.interests.slice(0, 3).map((interest, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-semibold text-lg">{profile.rating.toFixed(1)}</span>
                            </div>
                            <p className="text-xs text-gray-500">Rating</p>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-lg text-blue-600">{profile.total_courses_completed}</div>
                            <p className="text-xs text-gray-500">Courses</p>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-lg text-green-600">{profile.total_hours_learned}h</div>
                            <p className="text-xs text-gray-500">Hours</p>
                          </div>
                          <Badge variant={profile.account_status === 'active' ? 'default' : 'secondary'}>
                            {profile.account_status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">User Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['student', 'trainer', 'admin', 'parent'].map(type => {
                      const count = profiles.filter(p => p.user_type === type).length;
                      const percentage = profiles.length > 0 ? ((count / profiles.length) * 100).toFixed(1) : '0';
                      return (
                        <div key={type} className="flex justify-between items-center">
                          <span className="capitalize">{type}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{count}</span>
                            <span className="text-xs text-gray-500">({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Top Cities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from(new Set(profiles.map(p => p.city).filter(Boolean)))
                      .slice(0, 5)
                      .map(city => {
                        const count = profiles.filter(p => p.city === city).length;
                        return (
                          <div key={city} className="flex justify-between items-center">
                            <span>{city}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = profiles.filter(p => Math.floor(p.rating) === rating).length;
                      return (
                        <div key={rating} className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{rating}</span>
                          </div>
                          <span className="font-medium">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Platform settings and configuration options.
                  </p>
                  <Button variant="outline">
                    Configure Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Course Modal */}
        {showAddCourseForm && (
          <AddCourseForm
            onClose={() => setShowAddCourseForm(false)}
            onSubmit={handleAddCourse}
          />
        )}

        {/* Add Tool Modal */}
        {showAddToolForm && (
          <AddToolForm
            onClose={() => setShowAddToolForm(false)}
            onSubmit={handleAddTool}
          />
        )}

        {/* Add Competition Modal */}
        {showAddCompetitionForm && (
          <AddCompetitionForm
            onClose={() => setShowAddCompetitionForm(false)}
            onSubmit={handleAddCompetition}
          />
        )}

        {/* Add Space Modal */}
        {showAddForm && (
          <AddSpaceForm
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddSpace}
          />
         )}

         {/* Edit Space Modal */}
         {editingSpace && (
           <EditSpaceForm
             space={editingSpace}
             onClose={() => setEditingSpace(null)}
             onSubmit={handleEditSpace}
           />
         )}
       </main>
     </Layout>
   </>
 );
};

export default AdminDashboard;