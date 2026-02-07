import { supabase } from "./supabase.js";

const emailEl = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

async function protect() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    location.href = "login.html";
    return;
  }

  emailEl.textContent = data.user.email;
}

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  location.href = "login.html";
});

protect();
