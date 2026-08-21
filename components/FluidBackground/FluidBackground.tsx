import styles from "./FluidBackground.module.css";

export function FluidBackground() {
  return (
    <div className={styles.root} data-fluid-background aria-hidden="true">
      <span className={`${styles.wash} ${styles.washPrimary}`} />
      <span className={`${styles.wash} ${styles.washSecondary}`} />
      <span className={`${styles.wash} ${styles.washNeutral}`} />
    </div>
  );
}
