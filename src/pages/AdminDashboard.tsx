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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchSpaces(),
      fetchCourses(),
      fetchTools(),
      fetchCompetitions()
    ]);
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
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">Learning programs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tools.length}</div>
              <p className="text-xs text-muted-foreground">Equipment & resources</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Competitions</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{competitions.length}</div>
              <p className="text-xs text-muted-foreground">Active competitions</p>
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
            <TabsTrigger value="settings">Settings</TabsTrigger>
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

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    User management features will be available after connecting to Supabase.
                  </p>
                  <Button variant="outline">
                    Setup Authentication
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Platform settings will be available after connecting to Supabase.
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