import styles from './PieceOfData.module.css';

function PieceOfData({ keyy, value }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.key}>{keyy}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default PieceOfData;
