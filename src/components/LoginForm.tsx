import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

    if (!email) {
      setLoginError("Email de connexion requis");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoginError("Email ou mot de passe incorrect");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      } else if (data.session) {
        onLogin(data.session);
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex flex-col items-center justify-center p-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-pink-600 hover:text-pink-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="text-pink-600">Retour à l'accueil</span>
      </Link>

      <div
        className={`relative p-8 rounded-lg shadow-lg w-96 max-w-full ${
          isShaking ? "animate-shake" : ""
        }`}
        style={{
          backgroundImage: 'url("/sylvieGIF.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-6 text-center text-pink-600">
            Connexion
          </h1>

          <div className="bg-pink-50/80 p-4 rounded-lg mb-6 text-sm text-pink-700">
            <p className="mb-2">
              Cette page est réservée aux personnes titulaires d'un compte.
            </p>
            <p>
              Si vous n'avez pas encore de compte, veuillez contacter Sylvie par
              téléphone au +33 6 75 00 00 00 pour vous inscrire.
            </p>
          </div>

          <form onSubmit={signInWithEmail} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-pink-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-pink-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-pink-200 rounded focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            {loginError && (
              <div className="text-pink-500 text-sm text-center">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
