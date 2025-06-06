import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { IoArrowUndo } from "react-icons/io5";

interface ConnexionProps {
  onLogin: (session: Session) => void;
}

export function Connexion({ onLogin }: ConnexionProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        navigate(isAdmin ? "/tableau-de-bord" : "/mon-espace");
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      setLoginError("An unexpected error occurred");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  }

  return (
    // <div className="min-h-screen bg-gradient-to-b from-misty-rose to-white flex flex-col items-center justify-center p-4">
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-coral-pink hover:text-light-coral transition-colors flex items-center gap-2"
      >
        <IoArrowUndo className="h-6 w-6" />
        <span className="text-coral-pink">Retour à l'accueil</span>
      </Link>

      <div className="w-full max-w-4xl">
        <div
          className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 border-coral-pink ${
            isShaking ? "animate-shake" : ""
          }`}
        >
          <div className="grid md:grid-cols-2">
            <form
              onSubmit={signInWithEmail}
              className="p-6 md:p-8 flex flex-col justify-center space-y-6"
            >
              <div className="mb-16 flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold text-coral-pink">
                  Connexion
                </h1>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground text-balance text-center">
                  Page réservée aux personnes titulaires d'un compte.
                </p>

                <div className="bg-melon/50 p-4 rounded-lg text-sm text-justify text-black/80">
                  <p>
                    Si vous n'avez pas encore de compte, veuillez contacter
                    Sylvie par téléphone au +33 6 75 00 00 00 pour vous
                    inscrire.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-coral-pink"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-melon rounded focus:ring-2 focus:ring-coral-pink focus:border-coral-pink bg-white/80"
                  placeholder="Entrez votre email"
                  required
                />
              </div>

              <div className="grid gap-3">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-coral-pink"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-melon rounded focus:ring-2 focus:ring-coral-pink focus:border-coral-pink bg-white/80"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coral-pink hover:text-light-coral"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="text-light-coral text-sm text-center">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 bg-coral-pink text-white rounded hover:bg-light-coral transition-colors focus:ring-2 focus:ring-melon focus:ring-offset-2"
              >
                Se connecter
              </button>
            </form>

            <div className="hidden md:block relative bg-melon/10">
              <img
                src="/sylvieGIF.png"
                alt="Sylvie"
                className="maxh-full max-w-full object-cover"
              />
              <div className="absolute inset-0 bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
