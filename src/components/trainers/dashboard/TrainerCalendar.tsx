
import { useState } from "react";
import { Trainer, TrainerBooking } from "@/types/trainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, Calendar as CalendarIcon } from "lucide-react";

interface TrainerCalendarProps {
  trainer: Trainer;
}

const TrainerCalendar = ({ trainer }: TrainerCalendarProps) => {
  const [bookings, setBookings] = useState<TrainerBooking[]>(trainer.bookings || []);
  
  const handleStatusChange = (bookingId: string, status: "confirmed" | "cancelled") => {
    // In a real app, this would make an API call
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
    
    toast.success(`Booking ${status === "confirmed" ? "confirmed" : "cancelled"} successfully`);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendar & Bookings</h2>
        <Button className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Sync Calendar
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Manage your scheduled and pending bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.courseName}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{booking.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{booking.timeSlot}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <User className="h-4 w-4 mr-1" />
                        <span>{booking.studentCount} students</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  
                  {booking.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => handleStatusChange(booking.id, "confirmed")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1" 
                        onClick={() => handleStatusChange(booking.id, "cancelled")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-lg">No bookings yet</h3>
              <p className="text-gray-500 mt-2">
                When you receive bookings, they will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Set Your Availability</CardTitle>
          <CardDescription>Define when you are available to teach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-lg">Calendar Integration Coming Soon</h3>
            <p className="text-gray-500 mt-2 mb-4">
              We're working on a full calendar interface to manage your availability.
            </p>
            <Button variant="outline">Update Availability</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerCalendar;
