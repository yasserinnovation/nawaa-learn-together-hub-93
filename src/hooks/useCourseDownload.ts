import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useCourseDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCourseAsWord = async (courseId: number, courseTitle: string) => {
    setIsDownloading(true);
    
    try {
      // Call the edge function to generate the Word document
      const { data, error } = await supabase.functions.invoke('generate-course-word', {
        body: { courseId }
      });

      if (error) throw error;

      // If we get a response, it means the function returned JSON (likely an error)
      if (data && typeof data === 'object') {
        throw new Error(data.error || 'Failed to generate document');
      }

      // If we reach here, there might be an issue with the response
      // Let's try a different approach using fetch directly
      const response = await fetch(
        `https://lyzyexfkivhhhfcggeif.supabase.co/functions/v1/generate-course-word`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5enlleGZraXZoaGhmY2dnZWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTA4NDgsImV4cCI6MjA3MjcyNjg0OH0.weu6fUdhPi4cIGyda1OB_cPiMVD2JxO6Rq1IFs4ZnoY`,
          },
          body: JSON.stringify({ courseId })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to generate document');
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${courseTitle.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}.docx`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Course downloaded successfully!');
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to download course');
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadCourseAsWord,
    isDownloading
  };
};