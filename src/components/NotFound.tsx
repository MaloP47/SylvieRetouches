import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100/90">
      <img src="/sylvie404.png" alt="Sylvie 404" className="w-auto h-96 mb-8" />
      <h1 className="text-6xl font-bold text-pink-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-pink-500 mb-6">
        Page non trouvée
      </h2>
      <p className="text-pink-400 mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};
