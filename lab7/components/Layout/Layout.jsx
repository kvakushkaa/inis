import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Layout.module.css';

export default function Layout({ children }) {
  const router = useRouter();
  const isProducts = router.pathname.startsWith('/products');

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Link href="/products" className={styles.brand}>
          <img src="/icons/logo.svg" alt="DigiVault" className={styles.logo} />
          <div>
            <p className={styles.brandName}>DigiVault</p>
            <p className={styles.brandTagline}>Цифровые товары мгновенной доставки</p>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/products"
            className={`${styles.navLink} ${isProducts ? styles.navLinkActive : ''}`}
          >
            Каталог
          </Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
