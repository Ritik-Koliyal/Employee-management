import { NavLink } from "react-router-dom";
import styles from "./layout.module.css";

const navSections = [
  {
    label: "Clinic",
    items: [
      { to: "/registration", icon: "bi-calendar-check", label: "Registration" },
      { to: "/patients", icon: "bi-people", label: "Patients" },
      { to: "/treatments", icon: "bi-heart-pulse", label: "Treatments" },
      { to: "/staff", icon: "bi-person-badge", label: "Staff list" },
    ],
  },
  {
    label: "Finance",
    items: [
      { to: "/accounts", icon: "bi-wallet2", label: "Accounts" },
      { to: "/sales", icon: "bi-grid", label: "Sales" },
      { to: "/purchases", icon: "bi-bag", label: "Purchases" },
      {
        to: "/payment-method",
        icon: "bi-credit-card",
        label: "Payment Method",
      },
    ],
  },
  {
    label: "Physical Asset",
    items: [
      { to: "/stocks", icon: "bi-box-seam", label: "Stocks" },
      { to: "/peripherals", icon: "bi-hdd-stack", label: "Peripherals" },
    ],
  },
];

const Sidebar = ({ onNavigate }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Logo</h2>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
          }
        >
          <i className="bi bi-grid-1x2-fill" />
          <span>Dashboard</span>
        </NavLink>

        {navSections.map((section) => (
          <div key={section.label} className={styles.navSection}>
            <p className={styles.navSectionLabel}>{section.label}</p>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
              >
                <i className={`bi ${item.icon}`} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}

        <div className={styles.navSection}>
          <NavLink
            to="/report"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            <i className="bi bi-clock-history" />
            <span>Report</span>
          </NavLink>
          <NavLink
            to="/support"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            <i className="bi bi-headset" />
            <span>Customer Support</span>
          </NavLink>
        </div>
      </nav>

      <div className={styles.profile}>
        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className={styles.profileAvatar}
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileName}>Alfonso Dorwart</div>
          <div className={styles.profileRole}>Super admin</div>
        </div>
        <i className="bi bi-chevron-expand" />
      </div>
    </aside>
  );
};

export default Sidebar;
