import { useSelector } from 'react-redux';
import { Alert, Button as BsButton, Col, Container, Navbar, Row } from 'react-bootstrap';
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
      <Navbar sticky="top" expand={false} className={`${styles.header} py-0`}>
        <Container fluid className="px-3 px-md-4 py-3">
          <Navbar.Brand as="div" className="d-flex align-items-center gap-3 me-0 py-0">
            <img src={logo} alt="" className={styles.logo} />
            <span className="d-flex flex-column">
              <span className={styles.brandName}>DigiVault</span>
              <span className={`${styles.brandTagline} d-none d-md-inline`}>
                Цифровые товары мгновенной доставки
              </span>
            </span>
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-2">
            <BsButton type="button" variant="light" className={styles.iconButton} aria-label="Поиск">
              <img src={searchIcon} alt="" />
            </BsButton>
            <BsButton type="button" variant="light" className={styles.iconButton} aria-label="Профиль">
              <img src={userIcon} alt="" />
            </BsButton>
            <CartIcon />
          </div>
        </Container>
      </Navbar>

      <main>
        <Container className="py-4 py-md-5">
          <section className="mb-4">
            <h1 className={`${styles.title} mb-2`}>Интернет-магазин цифровых товаров</h1>
            <p className={`${styles.lead} mb-0`}>
              UI-киты, иконки и аудиопресеты с мгновенной доставкой.
            </p>
            <Alert variant="light" className={`${styles.status} mt-3 mb-0`}>
              {statusMessage}
            </Alert>
          </section>

          <section>
            <h2 className={`${styles.sectionTitle} mb-2`}>Каталог</h2>
            <p className={`${styles.lead} mb-3`}>Цены указаны в белорусских рублях (Br)</p>

            <Row className="g-4 align-items-start">
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
                  />
                </Col>
              ))}
              <Col xs={12} xl={3} className="d-flex">
                <CartPanel />
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    </div>
  );
}

export default App;
