import mealsImg from '../../../assets/meals.jpg';
import HeaderCartButton from '../headerCartButton/HeaderCartButton';
import styles from './Header.module.css';

type Props = {
  onShowCartChange: () => void ;
}

const Header = ({ onShowCartChange }: Props) => {
  return (
    <>
        <header className={styles.header}>
            <h1>React Food</h1>
            <HeaderCartButton onClick={onShowCartChange}/>
        </header>
        <div className={styles.main_image}>
            <img src={mealsImg} alt="A table full of food" />
        </div>
    </>
  );
};
export default Header;
