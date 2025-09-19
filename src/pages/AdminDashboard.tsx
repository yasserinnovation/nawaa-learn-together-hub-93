import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, Users, Star, BookOpen, Wrench, Trophy } from "lucide-react";
import AddSpaceForm from "@/components/admin/AddSpaceForm";
import EditSpaceForm from "@/components/admin/EditSpaceForm";
import AddCourseForm from "@/components/admin/AddCourseForm";
import AddToolForm from "@/components/admin/AddToolForm";
import AddCompetitionForm from "@/components/admin/AddCompetitionForm";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Space {
  id: string;
  name: string;
  type: string;
  city: string;
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
    avgRating: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [spaces, courses, tools, competitions, profiles]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchSpaces(),
      fetchCourses(),
      fetchTools(),
      fetchCompetitions(),
      fetchProfiles()
    ]);
  };

  const calculateStats = () => {
    // Calculate average rating from spaces
    const ratingsSum = spaces.reduce((sum, space) => sum + (space.rating || 0), 0);
    const avgRating = spaces.length > 0 ? (ratingsSum / spaces.length) : 0;

    // Calculate total revenue from courses, tools, and competitions
    const courseRevenue = courses.reduce((sum, course) => sum + (course.price || 0), 0);
    const toolRevenue = tools.reduce((sum, tool) => sum + (tool.rental_price_per_day * 30), 0); // Estimate monthly revenue
    const competitionRevenue = competitions.reduce((sum, comp) => sum + (comp.entry_fee * (comp.max_participants || 50)), 0);
    const totalRevenue = courseRevenue + toolRevenue + competitionRevenue;

    // Use actual user count from profiles table
    const totalUsers = profiles.length;
    // Calculate average user rating
    const userRatingsSum = profiles.reduce((sum, profile) => sum + (profile.rating || 0), 0);
    const avgUserRating = profiles.length > 0 ? (userRatingsSum / profiles.length) : avgRating;

    setStats({
      totalUsers: totalUsers,
      avgRating: Number(avgUserRating.toFixed(1)),
      totalRevenue: Number(totalRevenue.toFixed(2))
    });
  };

  const fetchSpaces = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSpaces(data || []);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      toast.error('Failed to fetch spaces');
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    }
  };

  const fetchTools = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast.error('Failed to fetch tools');
    }
  };

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('competitions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompetitions(data || []);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      toast.error('Failed to fetch competitions');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast.error('Failed to fetch profiles');
    }
  };

  const handleAddSpace = async (newSpaceData: any) => {
    try {
      const { data, error } = await (supabase as any)
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

      setSpaces([data, ...spaces]);
      setShowAddForm(false);
      toast.success('Space added successfully!');
    } catch (error) {
      console.error('Error adding space:', error);
      toast.error('Failed to add space');
    }
  };

  const handleEditSpace = async (updatedSpaceData: any) => {
    try {
      const { data, error } = await (supabase as any)
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

      setSpaces(spaces.map(space => 
        space.id === updatedSpaceData.id ? data : space
      ));
      setEditingSpace(null);
      toast.success('Space updated successfully!');
    } catch (error) {
      console.error('Error updating space:', error);
      toast.error('Failed to update space');
    }
  };

  const handleDeleteSpace = async (spaceId: string) => {
    if (!confirm('Are you sure you want to delete this space?')) return;

    try {
      const { error } = await (supabase as any)
        .from('spaces')
        .delete()
        .eq('id', spaceId);

      if (error) throw error;

      setSpaces(spaces.filter(space => space.id !== spaceId));
      toast.success('Space deleted successfully!');
    } catch (error) {
      console.error('Error deleting space:', error);
      toast.error('Failed to delete space');
    }
  };

  // Course handlers
  const handleAddCourse = async (courseData: any) => {
    try {
      const { data, error } = await (supabase as any)
        .from('courses')
        .insert([courseData])
        .select()
        .single();

      if (error) throw error;

      setCourses([data, ...courses]);
      setShowAddCourseForm(false);
      toast.success('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await (supabase as any)
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      setCourses(courses.filter(course => course.id !== courseId));
      toast.success('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  // Tool handlers
  const handleAddTool = async (toolData: any) => {
    try {
      const { data, error } = await (supabase as any)
        .from('tools')
        .insert([toolData])
        .select()
        .single();

      if (error) throw error;

      setTools([data, ...tools]);
      setShowAddToolForm(false);
      toast.success('Tool added successfully!');
    } catch (error) {
      console.error('Error adding tool:', error);
      toast.error('Failed to add tool');
    }
  };

  const handleDeleteTool = async (toolId: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const { error } = await (supabase as any)
        .from('tools')
        .delete()
        .eq('id', toolId);

      if (error) throw error;

      setTools(tools.filter(tool => tool.id !== toolId));
      toast.success('Tool deleted successfully!');
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast.error('Failed to delete tool');
    }
  };

  // Competition handlers
  const handleAddCompetition = async (competitionData: any) => {
    try {
      const { data, error } = await (supabase as any)
        .from('competitions')
        .insert([competitionData])
        .select()
        .single();

      if (error) throw error;

      setCompetitions([data, ...competitions]);
      setShowAddCompetitionForm(false);
      toast.success('Competition added successfully!');
    } catch (error) {
      console.error('Error adding competition:', error);
      toast.error('Failed to add competition');
    }
  };

  const handleDeleteCompetition = async (competitionId: string) => {
    if (!confirm('Are you sure you want to delete this competition?')) return;

    try {
      const { error } = await (supabase as any)
        .from('competitions')
        .delete()
        .eq('id', competitionId);

      if (error) throw error;

      setCompetitions(competitions.filter(comp => comp.id !== competitionId));
      toast.success('Competition deleted successfully!');
    } catch (error) {
      console.error('Error deleting competition:', error);
      toast.error('Failed to delete competition');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage spaces, users, and platform settings</p>
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Connect Supabase for full functionality
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{spaces.length}</div>
              <p className="text-xs text-muted-foreground">Active learning spaces</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Estimated from platform activity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating || 'N/A'}</div>
              <p className="text-xs text-muted-foreground">From {spaces.length} rated spaces</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Est. Revenue</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} EGP</div>
              <p className="text-xs text-muted-foreground">Potential monthly revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spaces">Spaces</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">Welcome to Admin Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    Connect to Supabase to view real-time analytics and platform metrics.
                  </p>
                  <Button variant="outline">
                    Connect Supabase
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spaces" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Spaces</h2>
              <Button onClick={() => setShowAddForm(true)} className="bg-yellow-500 hover:bg-yellow-600">
                <Plus className="h-4 w-4 mr-2" />
                Add New Space
              </Button>
            </div>

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
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Courses</h2>
              <Button onClick={() => setShowAddCourseForm(true)} className="bg-blue-600 hover:bg-blue-700">
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
              <Button onClick={() => setShowAddToolForm(true)} className="bg-green-600 hover:bg-green-700">
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
              <Button onClick={() => setShowAddCompetitionForm(true)} className="bg-purple-600 hover:bg-purple-700">
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
      </div>
    </Layout>
  );
};

export default AdminDashboard;