import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import styles from "./layout.module.css";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <div className={`${styles.sidebarDesktop} ${styles.thinScrollbar}`}>
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
      <div
        className={`${styles.sidebarMobile} ${sidebarOpen ? styles.sidebarMobileOpen : ""}`}
      >
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className={styles.rightSection}>
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className={`${styles.main} ${styles.thinScrollbar}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
