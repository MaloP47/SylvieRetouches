import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-misty-rose">
      <img src="/sylvie404.png" alt="Sylvie 404" className="w-auto h-96 mb-8" />
      <h1 className="text-6xl font-bold text-coral-pink mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-light-coral mb-6">
        Page non trouvée
      </h2>
      <p className="text-coral-pink-2 mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-coral-pink text-white rounded-lg hover:bg-light-coral transition-colors focus:ring-2 focus:ring-melon focus:ring-offset-2"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};
