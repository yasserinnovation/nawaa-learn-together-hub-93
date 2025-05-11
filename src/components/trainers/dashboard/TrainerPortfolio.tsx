
import { useState } from "react";
import { Trainer } from "@/types/trainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PlusCircle, Upload, X, FileText, Calendar } from "lucide-react";

interface TrainerPortfolioProps {
  trainer: Trainer;
}

const TrainerPortfolio = ({ trainer }: TrainerPortfolioProps) => {
  const [items, setItems] = useState(trainer.portfolioItems || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    imageUrl: "",
    type: "image" as const,
    date: new Date().toISOString().split('T')[0]
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddItem = () => {
    // Validate
    if (!newItem.title || !newItem.description || !newItem.imageUrl) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Add new item (in a real app, this would make an API call)
    const newItemWithId = {
      ...newItem,
      id: `p${Date.now()}`
    };
    
    setItems([newItemWithId, ...items]);
    setNewItem({
      title: "",
      description: "",
      imageUrl: "",
      type: "image",
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
    toast.success("Portfolio item added successfully");
  };
  
  const handleDelete = (id: string) => {
    // In a real app, this would make an API call
    setItems(items.filter(item => item.id !== id));
    toast.success("Portfolio item deleted");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Project
        </Button>
      </div>
      
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Portfolio Item</CardTitle>
            <CardDescription>Showcase a workshop, course, or student project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">Title</label>
                <Input
                  id="title"
                  name="title"
                  value={newItem.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Arduino Workshop for Kids"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  placeholder="Describe your workshop or project..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="date">Date</label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newItem.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="imageUrl">Image URL</label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={newItem.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1"
                  />
                  <Button variant="outline" type="button" className="flex-shrink-0">
                    <Upload className="h-4 w-4 mr-1" /> Browse
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  In a real app, this would be a file upload component.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleAddItem}>Add to Portfolio</Button>
          </CardFooter>
        </Card>
      )}
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="h-full w-full object-cover"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8" 
                  onClick={() => handleDelete(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500 my-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-lg">No portfolio items yet</h3>
            <p className="text-gray-500 mt-2 mb-4">
              Showcase your workshops, courses, or student projects by adding them to your portfolio.
            </p>
            {!showAddForm && (
              <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add First Project
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainerPortfolio;
