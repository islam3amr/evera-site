"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg("❌ خطأ: " + error.message);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMsg("❌ خطأ: " + error.message);
    } else {
      setMsg("✅ تم إنشاء الحساب! راجع بريدك لتأكيد الإيميل.");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", fontFamily: "Arial" }}>
      <h1>تسجيل الدخول / إنشاء حساب</h1>

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, margin: "10px 0" }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, margin: "10px 0" }}
      />

      <button onClick={handleLogin} style={{ width: "100%", padding: 10 }}>
        Login
      </button>

      <button
        onClick={handleSignup}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      >
        Sign Up
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}
