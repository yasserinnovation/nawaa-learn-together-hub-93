
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin, Upload, Info } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Space name must be at least 3 characters.",
  }),
  type: z.enum(["library", "classroom", "makerspace", "coworking", "hall"]),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  city: z.string().min(2, {
    message: "Please enter a city name.",
  }),
  capacity: z.coerce.number().min(1, {
    message: "Capacity must be at least 1 person.",
  }),
  days: z.array(z.string()).min(1, {
    message: "Please select at least one day of availability.",
  }),
  hours: z.string().min(3, {
    message: "Please specify available hours.",
  }),
  rentalType: z.enum(["free", "fixed", "donation"]),
  pricePerHour: z.coerce.number().optional(),
  equipment: z.array(z.string()).optional(),
  safetyNotes: z.string().optional(),
  hostName: z.string().min(2, {
    message: "Please enter your name.",
  }),
  hostBio: z.string().optional(),
  bankDetails: z.string().optional(),
});

type FormData = z.infer<typeof formSchema> & {
  coordinates: { lat: number; lng: number };
  images: string[];
};

type SpaceFormProps = {
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
};

const SpaceForm = ({ initialData = {}, onSubmit }: SpaceFormProps) => {
  const [images, setImages] = useState<string[]>(initialData.images || []);
  const [coordinates, setCoordinates] = useState(initialData.coordinates || { lat: 24.7136, lng: 46.6753 });

  // Form setup with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || "",
      type: initialData.type || "classroom",
      address: initialData.address || "",
      city: initialData.city || "",
      capacity: initialData.capacity || 10,
      days: initialData.days || [],
      hours: initialData.hours || "",
      rentalType: initialData.rentalType || "fixed",
      pricePerHour: initialData.pricePerHour || 50,
      equipment: initialData.equipment || [],
      safetyNotes: initialData.safetyNotes || "",
      hostName: initialData.hostName || "",
      hostBio: initialData.hostBio || "",
      bankDetails: initialData.bankDetails || "",
    },
  });

  const rentalType = form.watch("rentalType");
  
  // Handle image upload (mock)
  const handleImageUpload = () => {
    // In a real implementation, this would open a file picker and upload files
    // For now, we'll add placeholder images
    const newImage = `https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=500&auto=format&fit=crop`;
    setImages([...images, newImage]);
  };

  const daysOfWeek = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ];

  const equipmentItems = [
    { id: "projector", label: "Projector" },
    { id: "whiteboard", label: "Whiteboard" },
    { id: "speakers", label: "Speakers" },
    { id: "tables", label: "Tables & Chairs" },
    { id: "wifi", label: "WiFi" },
    { id: "computers", label: "Computers" },
    { id: "tools", label: "Maker Tools" },
    { id: "kitchen", label: "Kitchen Access" },
  ];

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const completeData = {
      ...values,
      coordinates,
      images,
    };
    onSubmit(completeData as FormData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Step 1: Create Your Space Listing</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Al Rawdah Library Makerspace" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your space a descriptive name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Space</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="classroom">Classroom</SelectItem>
                      <SelectItem value="library">Library Room</SelectItem>
                      <SelectItem value="makerspace">Makerspace</SelectItem>
                      <SelectItem value="coworking">Co-working Space</SelectItem>
                      <SelectItem value="hall">Community Hall</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-yellow-600" />
                <h4 className="text-md font-medium">Pin Your Location</h4>
              </div>
              <p className="text-sm text-gray-500 mb-4">Click on the map to pinpoint your exact location.</p>
              
              <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
                <p className="text-sm text-gray-500">Map will be displayed here</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Capacity & Availability</h3>
            
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of students the space can accommodate.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="days"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Available Days</FormLabel>
                    <FormDescription>
                      Select all days when your space will be available.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {daysOfWeek.map((day) => (
                      <FormField
                        key={day.value}
                        control={form.control}
                        name="days"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={day.value}
                              className="flex flex-row items-start space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(day.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, day.value])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== day.value
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {day.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 4 PM - 8 PM" {...field} />
                  </FormControl>
                  <FormDescription>
                    Specify the hours when your space is available.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Space Details & Equipment</h3>
            
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="h-5 w-5 text-yellow-600" />
                <h4 className="text-md font-medium">Upload Photos</h4>
              </div>
              <p className="text-sm text-gray-500 mb-4">Upload 3-5 high-quality photos of your space.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded overflow-hidden">
                    <img src={image} alt="Space" className="w-full h-full object-cover" />
                  </div>
                ))}
                
                {images.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="aspect-video flex flex-col items-center justify-center gap-1"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-5 w-5" />
                    <span className="text-xs">Add Photo</span>
                  </Button>
                )}
              </div>
              
              {images.length === 0 && (
                <p className="text-sm text-amber-600">Please upload at least one photo of your space.</p>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="equipment"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Available Equipment</FormLabel>
                    <FormDescription>
                      Select all equipment available in your space.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {equipmentItems.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="equipment"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="safetyNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Safety Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any rules or guidelines for kids using the space..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Rental Information</h3>
            
            <FormField
              control={form.control}
              name="rentalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="free" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Free (Community Contribution)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="fixed" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Fixed Price (Per Hour/Session)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="donation" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Donation Based (Pay What You Can)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {rentalType === "fixed" && (
              <FormField
                control={form.control}
                name="pricePerHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per Hour (SAR)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Host Information</h3>
            
            <FormField
              control={form.control}
              name="hostName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hostBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us a bit about yourself..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This helps build trust with potential renters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bankDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="IBAN or other payment details..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex items-center gap-2 mt-2">
                    <Info className="h-4 w-4 text-yellow-600" />
                    <p className="text-xs text-gray-500">
                      This information is stored securely and only shared with confirmed bookings.
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
              Continue to Preview
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SpaceForm;
