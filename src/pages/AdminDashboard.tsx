import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, Users, Star } from "lucide-react";
import AddSpaceForm from "@/components/admin/AddSpaceForm";
import EditSpaceForm from "@/components/admin/EditSpaceForm";
import { toast } from "sonner";

// Mock data - will be replaced with Supabase data
const mockSpaces = [
  {
    id: "1",
    name: "الأكاديمية الوطنية للعلوم و المهارات",
    type: "classroom",
    city: "Cairo",
    capacity: 20,
    rating: 4.7,
    pricePerHour: 80,
    status: "active"
  },
  {
    id: "2",
    name: "Creative Generation Academy",
    type: "makerspace",
    city: "Alexandria",
    capacity: 25,
    rating: 4.8,
    pricePerHour: 85,
    status: "active"
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);

  const handleDeleteSpace = (spaceId: string) => {
    // This will be implemented with Supabase
    toast.error("Please connect to Supabase first to enable delete functionality");
  };

  const handleEditSpace = (space: any) => {
    setEditingSpace(space);
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
              <div className="text-2xl font-bold">65</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
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
                <div className="space-y-4">
                  {mockSpaces.map((space) => (
                    <div key={space.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{space.name}</h3>
                            <p className="text-sm text-gray-600">
                              {space.type} • {space.city} • {space.capacity} capacity
                            </p>
                          </div>
                          <Badge variant={space.status === 'active' ? 'default' : 'secondary'}>
                            {space.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <p className="font-medium">${space.pricePerHour}/hr</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {space.rating}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSpace(space)}
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
            onSubmit={(data) => {
              toast.error("Please connect to Supabase first to add spaces");
              setShowAddForm(false);
            }}
          />
        )}

        {/* Edit Space Modal */}
        {editingSpace && (
          <EditSpaceForm
            space={editingSpace}
            onClose={() => setEditingSpace(null)}
            onSubmit={(data) => {
              toast.error("Please connect to Supabase first to edit spaces");
              setEditingSpace(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;