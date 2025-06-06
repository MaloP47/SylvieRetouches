import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface HomeProps {
  session: Session | null;
  onLogout?: () => void;
}

export function Home({ session, onLogout }: HomeProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error && onLogout) {
      onLogout();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-misty-rose to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/sylvie3.png" alt="Logo" className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <button
                    onClick={() =>
                      navigate(
                        session.user.app_metadata.role === "admin"
                          ? "/tableau-de-bord"
                          : "/mon-espace"
                      )
                    }
                    className="px-4 py-2 text-coral-pink hover:text-light-coral transition-colors text-l"
                  >
                    Retour au tableau de bord
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-coral-pink hover:bg-light-coral focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-melon"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/connexion")}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-coral-pink hover:bg-light-coral focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-melon"
                >
                  Accéder à mon espace
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="/sylvie3.png"
                  alt="Logo"
                  className="h-96 w-auto animate-fade-in"
                />
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Bienvenue chez</span>
                <span className="block text-coral-pink">Retouches Megève</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Votre partenaire de confiance pour toutes vos retouches de
                vêtements. Service professionnel et personnalisé pour sublimer
                votre garde-robe.
              </p>
              {!session && (
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate("/connexion")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-coral-pink hover:bg-light-coral md:py-4 md:text-lg md:px-10"
                    >
                      Commencer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative p-6 bg-melon rounded-lg shadow-md hover:bg-misty-rose transition-colors">
              <div className="text-center">
                <h3 className="text-lg font-medium text-coral-pink">
                  Retouches sur mesure
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Des retouches précises et adaptées à vos besoins spécifiques.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative p-6 bg-melon rounded-lg shadow-md hover:bg-misty-rose transition-colors">
              <div className="text-center">
                <h3 className="text-lg font-medium text-coral-pink">
                  Service rapide
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Délais d'exécution optimisés pour votre satisfaction.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative p-6 bg-melon rounded-lg shadow-md hover:bg-misty-rose transition-colors">
              <div className="text-center">
                <h3 className="text-lg font-medium text-coral-pink">
                  Expertise professionnelle
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Plus de 20 ans d'expérience dans la retouche de vêtements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
