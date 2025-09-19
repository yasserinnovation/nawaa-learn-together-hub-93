import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Trash2 } from "lucide-react";

interface AddCompetitionFormProps {
  onClose: () => void;
  onSubmit: (competitionData: any) => void;
}

const AddCompetitionForm = ({ onClose, onSubmit }: AddCompetitionFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    age_group: "",
    registration_start_date: "",
    registration_end_date: "",
    competition_date: "",
    max_participants: "",
    entry_fee: "",
    rules: "",
    location: "",
    image_url: "",
    requirements: [""],
    prizes: [{ position: "1st Place", prize: "" }]
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

  const handlePrizeChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.map((prize, i) => 
        i === index ? { ...prize, [field]: value } : prize
      )
    }));
  };

  const addArrayItem = (field: string) => {
    if (field === "prizes") {
      setFormData(prev => ({
        ...prev,
        prizes: [...prev.prizes, { position: "", prize: "" }]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ""]
      }));
    }
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const competitionData = {
      ...formData,
      max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
      entry_fee: parseFloat(formData.entry_fee) || 0,
      requirements: formData.requirements.filter(req => req.trim() !== ""),
      prizes: formData.prizes.filter(prize => prize.position.trim() !== "" && prize.prize.trim() !== "")
    };
    
    onSubmit(competitionData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Competition</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Competition Title *</Label>
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
                    <SelectItem value="robotics">Robotics</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="innovation">Innovation</SelectItem>
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
                    <SelectItem value="all">All Ages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="max_participants">Max Participants</Label>
                <Input
                  id="max_participants"
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={(e) => handleInputChange("max_participants", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="registration_start_date">Registration Start *</Label>
                <Input
                  id="registration_start_date"
                  type="datetime-local"
                  value={formData.registration_start_date}
                  onChange={(e) => handleInputChange("registration_start_date", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="registration_end_date">Registration End *</Label>
                <Input
                  id="registration_end_date"
                  type="datetime-local"
                  value={formData.registration_end_date}
                  onChange={(e) => handleInputChange("registration_end_date", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="competition_date">Competition Date *</Label>
                <Input
                  id="competition_date"
                  type="datetime-local"
                  value={formData.competition_date}
                  onChange={(e) => handleInputChange("competition_date", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="entry_fee">Entry Fee (EGP)</Label>
                <Input
                  id="entry_fee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.entry_fee}
                  onChange={(e) => handleInputChange("entry_fee", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
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
              <Label htmlFor="rules">Rules & Guidelines</Label>
              <Textarea
                id="rules"
                value={formData.rules}
                onChange={(e) => handleInputChange("rules", e.target.value)}
                rows={4}
              />
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
              <Label>Prizes</Label>
              {formData.prizes.map((prize, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={prize.position}
                    onChange={(e) => handlePrizeChange(index, "position", e.target.value)}
                    placeholder="Position (e.g., 1st Place)"
                    className="w-1/3"
                  />
                  <Input
                    value={prize.prize}
                    onChange={(e) => handlePrizeChange(index, "prize", e.target.value)}
                    placeholder="Prize description"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("prizes", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("prizes")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Prize
              </Button>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Add Competition
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCompetitionForm;