import classNames from 'classnames';
import styles from './TagsPrato.module.scss';
import { Prato } from 'types/Prato';

export default function TagsPrato({ category, size, serving, price }: Prato) {
  return (
    <div className={styles.tags__tags}>
      <div
        className={classNames({
          [styles.tags__tipo]: true,
          [styles[`tags__tipo__${category.label.toLowerCase()}`]]: true,
        })}
      >
        {category.label}
      </div>
      <div className={styles.tags__porcao}>{size}g</div>
      <div className={styles.tags__qtdpessoas}>
        {`Serve ${serving} ${serving > 1 ? 'pessoas' : 'pessoa'}`}
      </div>
      <div className={styles.tags__valor}>R$ {price.toFixed(2)}</div>
    </div>
  );
}
