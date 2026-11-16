import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import logoIcon from './assets/icons/logo.svg';
import searchIcon from './assets/icons/search.svg';
import userIcon from './assets/icons/user.svg';
import cartIcon from './assets/icons/cart.svg';

export default function App() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <img src={logoIcon} alt="" className="logo" aria-hidden="true" />
          <span>DigiVault</span>
        </div>
        <nav className="nav" aria-label="Основная навигация">
          <NavLink to="/" end>
            Каталог
          </NavLink>
          <NavLink to="/analytics">Аналитика</NavLink>
        </nav>
        <div className="actions" role="group" aria-label="Действия">
          <button type="button" className="iconButton" aria-label="Поиск">
            <img src={searchIcon} alt="" aria-hidden="true" />
          </button>
          <button type="button" className="iconButton" aria-label="Профиль">
            <img src={userIcon} alt="" aria-hidden="true" />
          </button>
          <button type="button" className="iconButton" aria-label="Корзина">
            <img src={cartIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </div>
  );
}
