import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, Users, Star } from "lucide-react";
import AddSpaceForm from "@/components/admin/AddSpaceForm";
import EditSpaceForm from "@/components/admin/EditSpaceForm";
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


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      // Fetch all spaces from the database
      const { data, error } = await (supabase as any)
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSpaces(data || []);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      toast.error('Failed to fetch spaces');
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
              <p className="text-xs text-muted-foreground">Real-time count</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">$</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">+25% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spaces">Manage Spaces</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
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