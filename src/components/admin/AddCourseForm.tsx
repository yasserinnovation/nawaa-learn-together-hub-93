import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Trash2 } from "lucide-react";

interface AddCourseFormProps {
  onClose: () => void;
  onSubmit: (courseData: any) => void;
}

const AddCourseForm = ({ onClose, onSubmit }: AddCourseFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    age_group: "",
    duration_weeks: "1",
    price: "",
    level: "beginner",
    image_url: "",
    requirements: [""],
    learning_outcomes: [""]
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
    
    const courseData = {
      ...formData,
      duration_weeks: parseInt(formData.duration_weeks),
      price: parseFloat(formData.price) || 0,
      requirements: formData.requirements.filter(req => req.trim() !== ""),
      learning_outcomes: formData.learning_outcomes.filter(outcome => outcome.trim() !== "")
    };
    
    onSubmit(courseData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Course</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
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
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age_group">Age Group *</Label>
                <Select value={formData.age_group} onValueChange={(value) => handleInputChange("age_group", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-8">6-8 years</SelectItem>
                    <SelectItem value="9-12">9-12 years</SelectItem>
                    <SelectItem value="13-15">13-15 years</SelectItem>
                    <SelectItem value="16-18">16-18 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration_weeks">Duration (weeks) *</Label>
                <Input
                  id="duration_weeks"
                  type="number"
                  min="1"
                  value={formData.duration_weeks}
                  onChange={(e) => handleInputChange("duration_weeks", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price (EGP) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="level">Level *</Label>
                <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange("image_url", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Requirements</Label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={req}
                    onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("requirements", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("requirements")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>

            <div>
              <Label>Learning Outcomes</Label>
              {formData.learning_outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={outcome}
                    onChange={(e) => handleArrayChange("learning_outcomes", index, e.target.value)}
                    placeholder="What will students learn?"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("learning_outcomes", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("learning_outcomes")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Learning Outcome
              </Button>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Course
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourseForm;