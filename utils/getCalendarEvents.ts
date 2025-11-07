import supabase from "@/configs/supabase";
export default async function getCalendarEvents() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const id = user?.id;
  const { data: eventdata, error: eventerror } = await supabase
    .from("binder")
    .select("*")
    .eq("id", id);
  return eventdata;
}
