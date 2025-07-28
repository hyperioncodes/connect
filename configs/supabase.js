import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okqyuyhvwqqeacwqzmyb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcXl1eWh2d3FxZWFjd3F6bXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NjUyNDksImV4cCI6MjA2OTI0MTI0OX0.Er3oD2HbWnNQS33twijDPJ1Gu4gqVCLy29dnXedcNMY"
export default supabase = createClient(supabaseUrl, supabaseKey)