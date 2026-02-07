"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function login(e) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setMsg("❌ " + error.message);
    else router.push("/dashboard");
  }

  async function signup() {
    setMsg("");
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) setMsg("❌ " + error.message);
    else setMsg("✅ تم إنشاء الحساب! راجع بريدك لتأكيد الإيميل.");
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>تسجيل الدخول / إنشاء حساب</h1>

      <form onSubmit={login}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
          required
        />

        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>

      <button
        onClick={signup}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      >
        Sign Up
      </button>

      {msg && <p style={{ marginTop: 12, textAlign: "center" }}>{msg}</p>}
    </div>
  );
}
