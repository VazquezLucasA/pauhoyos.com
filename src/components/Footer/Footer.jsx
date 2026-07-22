import { Link } from 'react-router-dom';
import './Footer.css';

const linkedin = 'https://www.linkedin.com/in/mar%C3%ADa-paula-hoyos-29a949320/';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Paula Hoyos</p>
          <p className="footer-text">
            Un lugar para la escucha, la palabra y la singularidad de cada historia.
          </p>
          <div className="footer-social-links">
            <a href="https://www.instagram.com/pau_hoyossss/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram" />
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin" />
            </a>
            <a href="https://www.facebook.com/pauli.hoyos" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="bi bi-facebook" />
            </a>
            <a href="https://wa.me/5493816892891" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="bi bi-whatsapp" />
            </a>
          </div>
        </div>

        <div>
          <p className="footer-title">Navegación</p>
          <a href="/#inicio">Inicio</a>
          <a href="/#servicios">Servicios</a>
          <a href="/#sobre-mi">Sobre mí</a>
          <a href="/#contacto">Contacto</a>
          <Link to="/psikipedia">Psikipedia</Link>
        </div>

        <div>
          <p className="footer-title">Contacto</p>
          <a href="tel:+5493816892891">+54 9 381 689-2891</a>
          <a href="mailto:psicopauhoyos@gmail.com">psicopauhoyos@gmail.com</a>
          <span>Tucumán, Argentina</span>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Paula Hoyos. Todos los derechos reservados.
      </div>
    </footer>
  );
}
