import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hutlwxobvdiqpigpaztc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1dGx3eG9idmRpcXBpZ3BhenRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3NzIzMjUsImV4cCI6MjAzMjM0ODMyNX0.IRO7mz110ZDUI4hP2a8S4qQb7GZr3m7zF77gTgltg50';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
