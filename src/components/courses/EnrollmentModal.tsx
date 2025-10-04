import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import type { Course } from "@/types/course";

const enrollmentSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, { message: "Student name must be at least 2 characters" })
    .max(100, { message: "Student name must be less than 100 characters" }),
  parentName: z
    .string()
    .trim()
    .min(2, { message: "Parent/Guardian name must be at least 2 characters" })
    .max(100, { message: "Parent/Guardian name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address (example: you@example.com)" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Phone number can only contain numbers, +, -, spaces, and parentheses" }),
  notes: z
    .string()
    .trim()
    .max(500, { message: "Notes must be less than 500 characters" })
    .optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
}

const EnrollmentModal = ({ open, onOpenChange, course }: EnrollmentModalProps) => {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnrollmentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof EnrollmentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = enrollmentSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EnrollmentFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof EnrollmentFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call (replace with actual Supabase call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual Supabase enrollment
      // const { error } = await supabase
      //   .from('enrollments')
      //   .insert({
      //     course_id: course.id,
      //     student_name: result.data.studentName,
      //     parent_name: result.data.parentName,
      //     email: result.data.email,
      //     phone: result.data.phone,
      //     notes: result.data.notes,
      //   });

      setIsSuccess(true);
      toast.success("Enrollment request submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit enrollment. Please try again.");
      console.error("Enrollment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after closing
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        notes: "",
      });
      setErrors({});
    }, 300);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-3">Enrollment Request Received!</DialogTitle>
            <DialogDescription className="text-base mb-6">
              Thank you for your interest in <strong>{course.title}</strong>. We've sent a confirmation email to{" "}
              <strong>{formData.email}</strong> with next steps.
            </DialogDescription>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 w-full text-left mb-6">
              <h4 className="font-semibold text-sm mb-2 text-primary-900">What happens next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ You'll receive a confirmation email within 24 hours</li>
                <li>✓ Our team will contact you to schedule your first session</li>
                <li>✓ Check your spam folder if you don't see our email</li>
              </ul>
            </div>
            <Button onClick={handleClose} variant="cta" className="w-full">
              Got It
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Enroll in {course.title}</DialogTitle>
          <DialogDescription>
            Fill out this form to reserve your spot. We'll contact you within 24 hours with payment details and schedule.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Student Name */}
          <div>
            <Label htmlFor="studentName" className="text-base font-medium">
              Student Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student's full name"
              aria-required="true"
              aria-invalid={!!errors.studentName}
              aria-describedby={errors.studentName ? "studentName-error" : undefined}
              className="mt-1.5"
            />
            {errors.studentName && (
              <p id="studentName-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.studentName}
              </p>
            )}
          </div>

          {/* Parent/Guardian Name */}
          <div>
            <Label htmlFor="parentName" className="text-base font-medium">
              Parent/Guardian Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Enter parent or guardian's name"
              aria-required="true"
              aria-invalid={!!errors.parentName}
              aria-describedby={errors.parentName ? "parentName-error" : undefined}
              className="mt-1.5"
            />
            {errors.parentName && (
              <p id="parentName-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.parentName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-base font-medium">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="mt-1.5"
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-base font-medium">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+20 123 456 7890"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="mt-1.5"
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Optional Notes */}
          <div>
            <Label htmlFor="notes" className="text-base font-medium">
              Additional Notes <span className="text-muted-foreground text-sm">(Optional)</span>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requirements or questions?"
              rows={3}
              maxLength={500}
              aria-invalid={!!errors.notes}
              aria-describedby={errors.notes ? "notes-error" : undefined}
              className="mt-1.5 resize-none"
            />
            {errors.notes && (
              <p id="notes-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.notes}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">{formData.notes?.length || 0} / 500 characters</p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="cta" disabled={isSubmitting} className="min-w-[140px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Enrollment"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentModal;
