import { Link } from "react-router-dom";
import { IoArrowUndo } from "react-icons/io5";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      

      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-coral-pink">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 flex flex-col justify-center space-y-6">
              <div className="mb-16 flex flex-col items-center text-center">
                <h1 className="text-6xl font-bold text-coral-pink">404</h1>
                <h2 className="text-2xl font-semibold text-coral-pink mt-4">
                  Page non trouvée
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground text-balance text-center">
                  Désolé, la page que vous recherchez n'existe pas ou a été
                  déplacée.
                </p>
              </div>

              <div className="flex items-center gap-4 justify-center">
                <Link
                  to="/"
                  className="px-6 py-2 bg-coral-pink text-white rounded hover:bg-light-coral transition-colors focus:ring-2 focus:ring-melon focus:ring-offset-2"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>

            <div className="hidden md:block relative bg-melon/10">
              <img
                src="/sylvie404.png"
                alt="Sylvie 404"
                className="maxh-full max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
