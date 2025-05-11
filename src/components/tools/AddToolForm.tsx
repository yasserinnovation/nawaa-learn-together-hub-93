
import { useState } from "react";
import { Tool, ToolCondition, ToolAvailability, ContributorType } from "@/types/tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Camera, Plus, X } from "lucide-react";

interface AddToolFormProps {
  currentStep: number;
  formData: Partial<Tool>;
  onChange: (data: Partial<Tool>) => void;
  onStepChange: (step: number) => void;
  onSubmit: () => void;
}

const AddToolForm = ({
  currentStep,
  formData,
  onChange,
  onStepChange,
  onSubmit
}: AddToolFormProps) => {
  const [tagInput, setTagInput] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string[]>(formData.photos || []);
  
  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      const newTags = [...(formData.tags || []), tagInput.trim()];
      onChange({ tags: newTags });
      setTagInput("");
    }
  };
  
  const handleTagRemove = (tag: string) => {
    const newTags = formData.tags?.filter(t => t !== tag) || [];
    onChange({ tags: newTags });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = [...photoPreview];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            newPhotos.push(reader.result);
            setPhotoPreview([...newPhotos]);
            onChange({ photos: [...newPhotos] });
          }
        };
        
        reader.readAsDataURL(file);
      }
    }
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photoPreview];
    newPhotos.splice(index, 1);
    setPhotoPreview(newPhotos);
    onChange({ photos: newPhotos });
  };
  
  const renderBasicInfo = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Basic Tool Information</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="contributor-type">You are a</Label>
            <Select 
              value={formData.contributorType || "individual"} 
              onValueChange={(value: ContributorType) => onChange({ contributorType: value })}
            >
              <SelectTrigger id="contributor-type" className="w-full">
                <SelectValue placeholder="Select contributor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual/Maker</SelectItem>
                <SelectItem value="company">Company/Business</SelectItem>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="tool-name">Tool Name*</Label>
            <Input 
              id="tool-name"
              placeholder="e.g., Arduino Starter Kit"
              value={formData.name || ""}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="tool-type">Tool Category*</Label>
            <Select 
              value={formData.toolType || ""} 
              onValueChange={(value) => onChange({ toolType: value })}
            >
              <SelectTrigger id="tool-type" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Robotics">Robotics</SelectItem>
                <SelectItem value="3D Printing">3D Printing</SelectItem>
                <SelectItem value="AI Tools">AI Tools</SelectItem>
                <SelectItem value="Coding">Coding</SelectItem>
                <SelectItem value="Creative Tools">Creative Tools</SelectItem>
                <SelectItem value="STEM Kits">STEM Kits</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea 
              id="description"
              placeholder="Describe your tool, its capabilities, what it comes with, etc."
              value={formData.description || ""}
              onChange={(e) => onChange({ description: e.target.value })}
              className="h-32"
              required
            />
          </div>
          
          <div>
            <Label>Age Suitability*</Label>
            <Select 
              value={formData.ageGroup || ""} 
              onValueChange={(value) => onChange({ ageGroup: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select suitable age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6-9 years">6-9 years</SelectItem>
                <SelectItem value="10-12 years">10-12 years</SelectItem>
                <SelectItem value="13-15 years">13-15 years</SelectItem>
                <SelectItem value="16+ years">16+ years</SelectItem>
                <SelectItem value="All ages">All ages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="safety">Safety Guidelines</Label>
            <Textarea 
              id="safety"
              placeholder="E.g., Adult supervision required, Small parts inside, etc."
              value={formData.safetyGuidelines || ""}
              onChange={(e) => onChange({ safetyGuidelines: e.target.value })}
              className="h-24"
            />
          </div>
          
          <div>
            <Label>Tags (Keywords)</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add keywords like 'coding', 'beginner', etc."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              />
              <Button 
                type="button" 
                onClick={handleTagAdd}
                variant="outline"
              >
                Add
              </Button>
            </div>
            
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X 
                      size={14} 
                      className="cursor-pointer"
                      onClick={() => handleTagRemove(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={() => onStepChange(2)} 
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Next: Photos & Availability
          </Button>
        </div>
      </div>
    );
  };
  
  const renderPhotosAndAvailability = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Photos & Availability</h2>
        
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block">Upload Photos (at least 3 recommended)*</Label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {photoPreview.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img 
                    src={photo} 
                    alt={`Tool photo ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square border border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <Camera size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            <p className="text-sm text-gray-500">
              Upload clear photos of your tool. Include front view, accessories, and details.
            </p>
          </div>
          
          <div>
            <Label>Tool Condition*</Label>
            <RadioGroup 
              value={formData.condition || "new"} 
              onValueChange={(value: ToolCondition) => onChange({ condition: value })}
              className="flex flex-wrap gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">New</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good">Good</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="used" id="used" />
                <Label htmlFor="used">Used with wear</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="needs-care" id="needs-care" />
                <Label htmlFor="needs-care">Needs care</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label>Availability Type*</Label>
            <RadioGroup 
              value={formData.availability} 
              onValueChange={(value: ToolAvailability) => {
                if (value === 'rent' || value === 'sale' || value === 'free') {
                  onChange({ availability: value });
                }
              }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sale" id="sale" />
                <Label htmlFor="sale">For Sale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent">For Rent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free">Free to Share</Label>
              </div>
            </RadioGroup>
          </div>
          
          {formData.availability === "sale" && (
            <div>
              <Label htmlFor="price">Price (SAR)*</Label>
              <Input 
                id="price"
                type="number"
                placeholder="e.g., 250"
                value={formData.price || ""}
                onChange={(e) => onChange({ price: Number(e.target.value) })}
                className="w-full"
                min={0}
              />
            </div>
          )}
          
          {formData.availability === "rent" && (
            <>
              <div>
                <Label htmlFor="rental-rate">Rental Rate (SAR/day)*</Label>
                <Input 
                  id="rental-rate"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.price || ""}
                  onChange={(e) => onChange({ price: Number(e.target.value) })}
                  className="w-full"
                  min={0}
                />
              </div>
              
              <div>
                <Label>Rental Period Options</Label>
                <div className="space-y-2 mt-2">
                  {["1 day", "3 days", "1 week", "2 weeks", "Custom"].map(period => (
                    <div key={period} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`period-${period}`}
                        checked={(formData.rentalPeriods || []).includes(period)}
                        onCheckedChange={(checked) => {
                          const currentPeriods = formData.rentalPeriods || [];
                          onChange({ 
                            rentalPeriods: checked 
                              ? [...currentPeriods, period]
                              : currentPeriods.filter(p => p !== period)
                          });
                        }}
                      />
                      <Label htmlFor={`period-${period}`}>{period}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div>
            <Label htmlFor="quantity">Available Quantity*</Label>
            <Input 
              id="quantity"
              type="number"
              placeholder="e.g., 5"
              value={formData.quantity || ""}
              onChange={(e) => onChange({ quantity: Number(e.target.value) })}
              className="w-full"
              min={1}
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={() => onStepChange(1)}
            variant="outline"
          >
            Back
          </Button>
          <Button 
            onClick={() => onStepChange(3)} 
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Next: Location & Contact
          </Button>
        </div>
      </div>
    );
  };
  
  const renderLocationAndContact = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Location & Contact</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="location">City/Area*</Label>
            <Select 
              value={formData.location || ""} 
              onValueChange={(value) => onChange({ location: value })}
            >
              <SelectTrigger id="location" className="w-full">
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Riyadh">Riyadh</SelectItem>
                <SelectItem value="Jeddah">Jeddah</SelectItem>
                <SelectItem value="Dammam">Dammam</SelectItem>
                <SelectItem value="Mecca">Mecca</SelectItem>
                <SelectItem value="Medina">Medina</SelectItem>
                <SelectItem value="Tabuk">Tabuk</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Delivery Options</Label>
            <div className="space-y-2 mt-2">
              {["Pickup only", "Delivery available (fee applies)", "Free delivery"].map(option => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`delivery-${option}`}
                    checked={(formData.deliveryOptions || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentOptions = formData.deliveryOptions || [];
                      onChange({ 
                        deliveryOptions: checked 
                          ? [...currentOptions, option]
                          : currentOptions.filter(o => o !== option)
                      });
                    }}
                  />
                  <Label htmlFor={`delivery-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="contact">Contact Information*</Label>
            <Input 
              id="contact"
              placeholder="Phone number or email"
              value={formData.contactInfo || ""}
              onChange={(e) => onChange({ contactInfo: e.target.value })}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              This will be visible to interested users.
            </p>
          </div>
          
          <div>
            <Label>Compatible Courses</Label>
            <div className="mt-2 space-y-2">
              {["Introduction to Electronics", "Robotics Basics", "Coding for Kids", "3D Design", "AI for Beginners"].map(course => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`course-${course}`}
                    checked={(formData.compatibleCourses || []).includes(course)}
                    onCheckedChange={(checked) => {
                      const currentCourses = formData.compatibleCourses || [];
                      onChange({ 
                        compatibleCourses: checked 
                          ? [...currentCourses, course]
                          : currentCourses.filter(c => c !== course)
                      });
                    }}
                  />
                  <Label htmlFor={`course-${course}`}>{course}</Label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Connect your tool with compatible courses on the platform.
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={() => onStepChange(2)}
            variant="outline"
          >
            Back
          </Button>
          <Button 
            onClick={() => onStepChange(4)} 
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Preview & Submit
          </Button>
        </div>
      </div>
    );
  };
  
  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Review Your Submission</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-4">{formData.name || "Tool Name"}</h3>
            
            {formData.photos && formData.photos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {formData.photos.slice(0, 3).map((photo, index) => (
                  <img 
                    key={index}
                    src={photo}
                    alt={`Tool preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-200 h-48 flex items-center justify-center rounded-md mb-6">
                <p className="text-gray-500">No photos added</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Basic Information</h4>
                <ul className="mt-2 space-y-1">
                  <li><span className="font-medium">Category:</span> {formData.toolType || "Not specified"}</li>
                  <li><span className="font-medium">Condition:</span> {formData.condition || "Not specified"}</li>
                  <li><span className="font-medium">Age Group:</span> {formData.ageGroup || "Not specified"}</li>
                  <li><span className="font-medium">Quantity:</span> {formData.quantity || "Not specified"}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Availability</h4>
                <ul className="mt-2 space-y-1">
                  <li><span className="font-medium">Type:</span> {formData.availability === "sale" ? "For Sale" : 
                                                             formData.availability === "rent" ? "For Rent" : 
                                                             "Free to Share"}</li>
                  {formData.availability === "sale" && (
                    <li><span className="font-medium">Price:</span> {formData.price} SAR</li>
                  )}
                  {formData.availability === "rent" && (
                    <>
                      <li><span className="font-medium">Rate:</span> {formData.price} SAR/day</li>
                      <li>
                        <span className="font-medium">Rental Periods:</span> {formData.rentalPeriods?.join(", ") || "Not specified"}
                      </li>
                    </>
                  )}
                  <li>
                    <span className="font-medium">Location:</span> {formData.location || "Not specified"}
                  </li>
                  <li>
                    <span className="font-medium">Delivery:</span> {formData.deliveryOptions?.join(", ") || "Not specified"}
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Description</h4>
              <p className="mt-1">{formData.description || "No description provided"}</p>
            </div>
            
            {formData.safetyGuidelines && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Safety Guidelines</h4>
                <p className="mt-1">{formData.safetyGuidelines}</p>
              </div>
            )}
            
            {formData.tags && formData.tags.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Tags</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {formData.compatibleCourses && formData.compatibleCourses.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Compatible Courses</h4>
                <ul className="mt-1 list-disc pl-5">
                  {formData.compatibleCourses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <h4 className="font-medium text-yellow-800">Before You Submit</h4>
          <ul className="mt-2 space-y-2 text-sm text-yellow-700">
            <li>Your submission will be reviewed by our team before it appears on the marketplace.</li>
            <li>You can edit or remove your listing at any time from your dashboard.</li>
            <li>The platform charges a small commission on successful rentals and sales.</li>
            <li>Make sure all information provided is accurate and complete.</li>
          </ul>
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={() => onStepChange(3)}
            variant="outline"
          >
            Back
          </Button>
          <Button 
            onClick={onSubmit} 
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Submit Tool Listing
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {currentStep === 1 && renderBasicInfo()}
      {currentStep === 2 && renderPhotosAndAvailability()}
      {currentStep === 3 && renderLocationAndContact()}
      {currentStep === 4 && renderPreview()}
    </div>
  );
};

export default AddToolForm;
