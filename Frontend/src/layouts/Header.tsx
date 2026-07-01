import styles from "./layout.module.css";

interface HeaderProps {
  onToggleSidebar: () => void;
  title?: string;
}

const Header = ({ onToggleSidebar, title = "Dashboard" }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        {/* <button
          type="button"
          className={styles.iconBtn}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-chevron-left" />
        </button> */}
        <h3 className={styles.headerTitle}>{title}</h3>
      </div>

      <div className={styles.searchWrap}>
        <i className="bi bi-search" />
        <input
          type="text"
          placeholder="Search for anything more"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.headerRight}>
        <button className={styles.iconBtnDark} aria-label="Add">
          <i className="bi bi-plus-lg" />
        </button>
        <button className={styles.iconBtn} aria-label="Help">
          <i className="bi bi-question-circle" />
        </button>
        <button className={styles.iconBtn} aria-label="Activity">
          <i className="bi bi-graph-up" />
        </button>
        <button className={styles.iconBtn} aria-label="Settings">
          <i className="bi bi-gear" />
        </button>
        <button className={styles.flagBtn} aria-label="Notifications">
          <i className="bi bi-flag-fill" />
          <span>1/4</span>
        </button>
      </div>
    </header>
  );
};

export default Header;