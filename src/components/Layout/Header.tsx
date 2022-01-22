import mealsImg from '../../assets/meals.jpg';
import styles from './Header.module.css';

const Header = (props: any) => {
  return (
    <>
        <header className={styles.header}>
            <h1>React Food</h1>
            <button>Cart</button>
        </header>
        <div className={styles.main_image}>
            <img src={mealsImg} alt="A table full of food" />
        </div>
    </>
  );
};
export default Header;
