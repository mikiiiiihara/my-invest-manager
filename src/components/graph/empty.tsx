import styles from "./empty.module.scss";

export const Empty = () => {
  return (
    <div className={styles.empty}>
      <p>データが登録されていません。</p>
    </div>
  );
};
