import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <header>{/* Header content */}</header>

      <main>
        <Outlet />
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default MainLayout;
