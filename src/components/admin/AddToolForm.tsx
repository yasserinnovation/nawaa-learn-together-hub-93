import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Trash2 } from "lucide-react";

interface AddToolFormProps {
  onClose: () => void;
  onSubmit: (toolData: any) => void;
}

const AddToolForm = ({ onClose, onSubmit }: AddToolFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    rental_price_per_day: "",
    purchase_price: "",
    availability_status: "available",
    condition: "good",
    location: "",
    owner_contact: "",
    images: [""],
    specifications: {}
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const toolData = {
      ...formData,
      rental_price_per_day: parseFloat(formData.rental_price_per_day) || 0,
      purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
      images: formData.images.filter(img => img.trim() !== "")
    };
    
    onSubmit(toolData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Tool</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Tool Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3d-printer">3D Printer</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="woodworking">Woodworking</SelectItem>
                    <SelectItem value="metalworking">Metalworking</SelectItem>
                    <SelectItem value="measurement">Measurement</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="robotics">Robotics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rental_price_per_day">Rental Price per Day (EGP) *</Label>
                <Input
                  id="rental_price_per_day"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.rental_price_per_day}
                  onChange={(e) => handleInputChange("rental_price_per_day", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="purchase_price">Purchase Price (EGP)</Label>
                <Input
                  id="purchase_price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.purchase_price}
                  onChange={(e) => handleInputChange("purchase_price", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="availability_status">Availability Status *</Label>
                <Select value={formData.availability_status} onValueChange={(value) => handleInputChange("availability_status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="condition">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="owner_contact">Owner Contact</Label>
                <Input
                  id="owner_contact"
                  value={formData.owner_contact}
                  onChange={(e) => handleInputChange("owner_contact", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Images</Label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={image}
                    onChange={(e) => handleArrayChange("images", index, e.target.value)}
                    placeholder="Enter image URL"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("images", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("images")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Add Tool
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddToolForm;