import { supabase } from "./supabase.js";

const form = document.getElementById("authForm");
const msg = document.getElementById("msg");
const signupBtn = document.getElementById("signupBtn");

function setMsg(text) {
  msg.textContent = text;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return setMsg("❌ " + error.message);
  }

  // نجاح → روح الداشبورد
  location.href = "dashboard.html";
});

signupBtn.addEventListener("click", async () => {
  setMsg("");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return setMsg("❌ " + error.message);
  }

  setMsg("✅ تم إنشاء الحساب! راجع بريدك لتأكيد الإيميل ثم سجّل دخول.");
});
