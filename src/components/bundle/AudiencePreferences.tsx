
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudiencePreferencesProps {
  bundle: any;
  updateBundle: (key: string, value: any) => void;
}

const AudiencePreferences = ({ bundle, updateBundle }: AudiencePreferencesProps) => {
  const [audience, setAudience] = useState({
    type: bundle.audience?.type || "public",
    parentJoin: bundle.audience?.parentJoin || false,
    gender: bundle.audience?.gender || "mixed",
    language: bundle.audience?.language || "arabic",
    ageRange: bundle.audience?.ageRange || "9-12",
    groupSize: bundle.audience?.groupSize || 10,
    duration: bundle.audience?.duration || 2,
    sessions: bundle.audience?.sessions || 2,
  });

  const handleChange = (key: string, value: any) => {
    setAudience(prev => ({
      ...prev,
      [key]: value
    }));
    
    updateBundle("audience", {
      ...bundle.audience,
      [key]: value
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        <Settings className="h-8 w-8 text-yellow-500 mr-3" />
        <h2 className="text-2xl font-semibold">Set Your Audience Preferences</h2>
      </div>
      
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Group Type</h3>
            
            <RadioGroup 
              value={audience.type} 
              onValueChange={(value) => handleChange("type", value)}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="public" id="public" className="mt-1" />
                <div>
                  <Label htmlFor="public" className="font-medium">Public Group</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Open to enrollment for anyone. Your session will be listed publicly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="private" id="private" className="mt-1" />
                <div>
                  <Label htmlFor="private" className="font-medium">Private Group</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Exclusive to your invited participants only. Will not be listed publicly.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Parent Involvement</h3>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="parent-join" 
                checked={audience.parentJoin}
                onCheckedChange={(checked) => handleChange("parentJoin", Boolean(checked))}
                className="mt-1"
              />
              <div>
                <Label htmlFor="parent-join" className="font-medium">Parents can join</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Allow parents to participate in the sessions alongside their children.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Gender Preference</h3>
            
            <RadioGroup 
              value={audience.gender} 
              onValueChange={(value) => handleChange("gender", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="mixed" id="gender-mixed" />
                <Label htmlFor="gender-mixed">Mixed group (all genders)</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="boys" id="gender-boys" />
                <Label htmlFor="gender-boys">Boys only</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="girls" id="gender-girls" />
                <Label htmlFor="gender-girls">Girls only</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Language Preference</h3>
            
            <RadioGroup 
              value={audience.language} 
              onValueChange={(value) => handleChange("language", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="arabic" id="lang-arabic" />
                <Label htmlFor="lang-arabic">Arabic</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="english" id="lang-english" />
                <Label htmlFor="lang-english">English</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="bilingual" id="lang-bilingual" />
                <Label htmlFor="lang-bilingual">Bilingual (Arabic & English)</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Age Range</h3>
                
                <RadioGroup 
                  value={audience.ageRange} 
                  onValueChange={(value) => handleChange("ageRange", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="6-8" id="age-6-8" />
                    <Label htmlFor="age-6-8">6-8 years</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="9-12" id="age-9-12" />
                    <Label htmlFor="age-9-12">9-12 years</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="13-15" id="age-13-15" />
                    <Label htmlFor="age-13-15">13-15 years</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="16+" id="age-16+" />
                    <Label htmlFor="age-16+">16+ years</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Group Size</h3>
                  <span>{audience.groupSize} participants</span>
                </div>
                
                <Slider
                  value={[audience.groupSize]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => handleChange("groupSize", value[0])}
                  className="mb-6"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>15</span>
                  <span>30</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Duration per Session</h3>
                  <span>{audience.duration} hours</span>
                </div>
                
                <Slider
                  value={[audience.duration]}
                  min={1}
                  max={4}
                  step={0.5}
                  onValueChange={(value) => handleChange("duration", value[0])}
                  className="mb-6"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 hour</span>
                  <span>2.5 hours</span>
                  <span>4 hours</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Number of Sessions</h3>
                  <span>{audience.sessions} sessions</span>
                </div>
                
                <Slider
                  value={[audience.sessions]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleChange("sessions", value[0])}
                  className="mb-6"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 session</span>
                  <span>5 sessions</span>
                  <span>10 sessions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudiencePreferences;
