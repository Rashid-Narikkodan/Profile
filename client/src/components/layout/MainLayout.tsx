import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      
      {/* Header */}
      <Header />

      {/* Main content area */}
      <main className="flex grow w-full p-2">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default MainLayout;
