import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vdvozheydssbkpzupgmr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdm96aGV5ZHNzYmtwenVwZ21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjI2OTIsImV4cCI6MjA3ODM5ODY5Mn0.OiJPWBspCWZ2atYxftY70hpYAWEpwMsfPwghwXy_Gho';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
