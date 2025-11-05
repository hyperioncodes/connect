import { useState } from "react";

import supabase from "@/configs/supabase";
export default async function getCurrentUser() {
  const {
    data: { user: curUser },
    error,
  } = await supabase.auth.getUser();
  return curUser;
}
