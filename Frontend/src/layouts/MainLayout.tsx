import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./layout.module.css";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Desktop sidebar */}
      <div className={`${styles.sidebarDesktop} ${styles.thinScrollbar}`} >
        <Sidebar />
      </div>

      {/* Mobile off-canvas sidebar */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
      <div
        className={`${styles.sidebarMobile} ${sidebarOpen ? styles.sidebarMobileOpen : ""
          }`}
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