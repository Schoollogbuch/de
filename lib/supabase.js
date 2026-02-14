import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.https://supabase.com/dashboard/project/hhlzrbnykzdaoepjlzfn
const supabaseAnonKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhobHpyYm55a3pkYW9lcGpsemZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMzA2NjUsImV4cCI6MjA4NjYwNjY2NX0.OT-ane3yfD6VBI6XqjQvlE5kCp-ffvPjFYeEx-mCyYg

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
