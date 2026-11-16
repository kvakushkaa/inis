import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button as BsButton, Col, Container, Navbar, Row, Spinner } from 'react-bootstrap';
import ProductCard from './components/ProductCard/ProductCard';
import CartIcon from './components/CartIcon/CartIcon';
import CartPanel from './components/CartPanel/CartPanel';
import QuickViewModal from './components/QuickViewModal/QuickViewModal';
import { fetchProducts } from './api/productsApi';
import logo from './assets/icons/logo.svg';
import searchIcon from './assets/icons/search.svg';
import userIcon from './assets/icons/user.svg';
import { addToCart, selectCartMessage } from './store/cartSlice';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const statusMessage = useSelector(selectCartMessage);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const items = await fetchProducts();
      if (!cancelled) {
        setProducts(items);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleQuickAdd = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      }),
    );
    setQuickViewProduct(null);
  };

  return (
    <div className={styles.app}>
      <a href="#main-content" className={styles.skipLink}>
        Перейти к содержимому
      </a>

      <header>
        <Navbar
          as="nav"
          sticky="top"
          expand={false}
          className={`${styles.header} py-0`}
          aria-label="Основная навигация DigiVault"
        >
          <Container fluid className="px-3 px-md-4 py-3">
            <Navbar.Brand as="div" className="d-flex align-items-center gap-3 me-0 py-0">
              <img src={logo} alt="DigiVault" className={styles.logo} />
              <span className="d-flex flex-column">
                <span className={styles.brandName}>DigiVault</span>
                <span className={`${styles.brandTagline} d-none d-md-inline`}>
                  Цифровые товары мгновенной доставки
                </span>
              </span>
            </Navbar.Brand>

            <div className="d-flex align-items-center gap-2" role="group" aria-label="Действия">
              <BsButton type="button" variant="light" className={styles.iconButton} aria-label="Поиск">
                <img src={searchIcon} alt="" aria-hidden="true" />
              </BsButton>
              <BsButton type="button" variant="light" className={styles.iconButton} aria-label="Профиль">
                <img src={userIcon} alt="" aria-hidden="true" />
              </BsButton>
              <CartIcon />
            </div>
          </Container>
        </Navbar>
      </header>

      <main id="main-content" tabIndex={-1}>
        <Container className="py-4 py-md-5">
          <section className="mb-4" aria-labelledby="page-title">
            <h1 id="page-title" className={`${styles.title} mb-2`}>
              Интернет-магазин цифровых товаров
            </h1>
            <p className={`${styles.lead} mb-0`}>
              UI-киты, иконки и аудиопресеты с мгновенной доставкой.
            </p>
            <Alert
              variant="light"
              className={`${styles.status} mt-3 mb-0`}
              data-testid="status-message"
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </Alert>
          </section>

          <section aria-labelledby="catalog-title">
            <h2 id="catalog-title" className={`${styles.sectionTitle} mb-2`}>
              Каталог
            </h2>
            <p className={`${styles.lead} mb-3`}>Цены указаны в белорусских рублях (Br)</p>

            {loading ? (
              <div className="d-flex align-items-center gap-2 py-5" data-testid="catalog-loading">
                <Spinner animation="border" size="sm" aria-hidden="true" />
                <span>Загрузка каталога…</span>
              </div>
            ) : (
              <Row className="g-4 align-items-start" data-testid="catalog">
                {products.map((product) => (
                  <Col key={product.id} xs={12} md={6} xl={3} className="d-flex">
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      description={product.description}
                      category={product.category}
                      price={product.price}
                      rating={product.rating}
                      image={product.image}
                      accent={product.accent}
                      onQuickView={setQuickViewProduct}
                    />
                  </Col>
                ))}
                <Col xs={12} xl={3} className="d-flex">
                  <CartPanel />
                </Col>
              </Row>
            )}
          </section>
        </Container>
      </main>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleQuickAdd}
      />
    </div>
  );
}

export default App;
