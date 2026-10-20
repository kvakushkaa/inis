import { useSelector } from 'react-redux';
import ProductCard from './components/ProductCard/ProductCard';
import CartIcon from './components/CartIcon/CartIcon';
import CartPanel from './components/CartPanel/CartPanel';
import products from './data/products';
import logo from './assets/icons/logo.svg';
import searchIcon from './assets/icons/search.svg';
import userIcon from './assets/icons/user.svg';
import { selectCartMessage } from './store/cartSlice';
import styles from './App.module.css';

function App() {
  const statusMessage = useSelector(selectCartMessage);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img src={logo} alt="DigiVault" className={styles.logo} />
          <div>
            <p className={styles.brandName}>DigiVault</p>
            <p className={styles.brandTagline}>Цифровые товары мгновенной доставки</p>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button type="button" className={styles.iconButton} aria-label="Поиск">
            <img src={searchIcon} alt="" />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Профиль">
            <img src={userIcon} alt="" />
          </button>
          <CartIcon />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Интернет-магазин цифровых товаров</h1>
          <p>
            UI-киты, иконки и аудиопресеты с мгновенной доставкой.
          </p>
          <p className={styles.status}>{statusMessage}</p>
        </section>

        <section className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <h2>Каталог</h2>
          </div>
          <div className={styles.layout}>
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                  rating={product.rating}
                  image={product.image}
                  accent={product.accent}
                />
              ))}
            </div>
            <CartPanel />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
