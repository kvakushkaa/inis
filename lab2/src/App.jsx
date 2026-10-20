import { useState } from 'react';
import ProductCard from './components/ProductCard/ProductCard';
import CartIcon from './components/CartIcon/CartIcon';
import Button from './components/Button/Button';
import QuantitySelector from './components/QuantitySelector/QuantitySelector';
import products from './data/products';
import logo from './assets/icons/logo.svg';
import searchIcon from './assets/icons/search.svg';
import userIcon from './assets/icons/user.svg';
import styles from './App.module.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    'Выберите товар и добавьте его в корзину.',
  );
  const [demoDisabled, setDemoDisabled] = useState(false);

  const handleAddToCart = ({ title, quantity }) => {
    setCartCount((prev) => prev + quantity);
    setStatusMessage(`В корзину добавлено: ${title} × ${quantity}`);
  };

  const handleBuyNow = ({ title, quantity, price }) => {
    const total = (price * quantity).toFixed(2);
    setStatusMessage(`Покупка: ${title} × ${quantity} на сумму ${total} Br`);
  };

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
          <CartIcon count={cartCount} />
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

        <section className={styles.playground} aria-label="Демонстрация компонентов">
          <h2>Базовые компоненты</h2>
          <div className={styles.playgroundRow}>
            <Button
              label="Add to Cart"
              variant="addToCart"
              disabled={demoDisabled}
              onClick={() =>
                setStatusMessage('Кнопка Add to Cart обработала клик.')
              }
            />
            <Button
              label="Buy Now"
              variant="buyNow"
              disabled={demoDisabled}
              onClick={() => setStatusMessage('Кнопка Buy Now обработала клик.')}
            />
            <Button
              label={demoDisabled ? 'Enable buttons' : 'Disable buttons'}
              variant="addToCart"
              onClick={() => setDemoDisabled((prev) => !prev)}
            />
            <QuantitySelector
              onChange={(value) =>
                setStatusMessage(`QuantitySelector: количество = ${value}`)
              }
            />
            <CartIcon count={cartCount} />
          </div>
        </section>

        <section className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <h2>Каталог</h2>
          </div>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                category={product.category}
                price={product.price}
                rating={product.rating}
                image={product.image}
                accent={product.accent}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
