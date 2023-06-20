import styles from './styles.module.scss';

const ResultBox = ({ leftText, rightText, value }) => {

  return (
    <div className={styles.container}>
      <div>
        <span>{leftText}</span>
      </div>
      <div className={styles['bar-container']}>
        <div className={`${styles.bar} ${value < 0 ? styles.invert : ''}`}></div>
      </div>
      <div>
        <span>{rightText}</span>
      </div>
    </div>
  );
}

export default ResultBox;