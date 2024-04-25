import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iomrlheznpwuxywelwmi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbXJsaGV6bnB3dXh5d2Vsd21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTA3NzQsImV4cCI6MjAyOTMyNjc3NH0.e3vEtSkZ1C-E7121L3FETz_QJ78lUeTgGYU1p43untM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
