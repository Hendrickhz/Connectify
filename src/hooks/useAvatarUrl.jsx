import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';


const useAvatarUrl = (filePath) => {
  const [publicUrl, setPublicUrl] = useState(null);

  useEffect(() => {
    if (filePath) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setPublicUrl(data.publicUrl);
    }
  }, [filePath]);

  return publicUrl;
};

export default useAvatarUrl;