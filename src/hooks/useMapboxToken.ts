import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useMapboxToken = () => {
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) {
          throw error;
        }

        if (data && data.token) {
          setToken(data.token);
        } else {
          setError('No token received from server');
        }
      } catch (err) {
        console.error('Error fetching Mapbox token:', err);
        setError('Failed to fetch Mapbox token');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading, error };
};