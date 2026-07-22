import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/img/pph logo.png';
import './Navbar.css';

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState('inicio');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== '/') return undefined;

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="main-navbar">
      <a className="brand-link" href="/#inicio" aria-label="Volver al inicio">
        <img src={logo} alt="Paula Hoyos" />
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">Abrir menú</span>
      </button>

      <nav id="main-navigation" className={open ? 'nav-links is-open' : 'nav-links'}>
        {navItems.map((item) => {
          const href = pathname === '/' ? '#' + item.id : '/#' + item.id;
          const active = pathname === '/' && activeSection === item.id;
          return (
            <a
              key={item.id}
              href={href}
              className={active ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
