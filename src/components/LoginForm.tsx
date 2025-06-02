import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface LoginFormProps {
  onLogin: (session: Session) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoginError(error.message);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      } else if (data.session) {
        onLogin(data.session);
        // Check if user is admin and redirect accordingly
        const isAdmin = data.session.user.app_metadata.role === "admin";
        navigate(isAdmin ? "/homeadmin" : "/home");
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      setLoginError("An unexpected error occurred");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  }

  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-md w-96 ${
        isShaking ? "animate-shake" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={signInWithEmail} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        {loginError && (
          <div className="text-red-500 text-sm text-center">{loginError}</div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
