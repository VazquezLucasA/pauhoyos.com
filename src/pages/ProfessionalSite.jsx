import { useEffect, useRef, useState } from 'react';
import heroImage from '../assets/img/foto nueva.jpg';
import portraitImage from '../assets/img/retrato2.jpg';
import './ProfessionalSite.css';

const whatsapp = 'https://wa.me/5493816892891';
const linkedin = 'https://www.linkedin.com/in/mar%C3%ADa-paula-hoyos-29a949320/';

const services = [
  {
    icon: 'bi-chat-heart',
    title: 'Terapia psicológica',
    description: 'Un espacio de escucha orientado a niños, adolescentes y adultos.',
  },
  {
    icon: 'bi-clipboard2-pulse',
    title: 'Evaluación y diagnóstico psicológico infanto juvenil',
    lead: '(5 a 12 años)',
    description: 'Procesos integrales de evaluación psicológica: entrevistas, tests e informes.',
    items: [
      'Entrevistas iniciales.',
      'Aplicación de técnicas y herramientas de evaluación.',
      'Redacción de informes detallados.',
      'Instancia de devolución con padres y el niño/a.',
    ],
  },
  {
    icon: 'bi-mortarboard',
    title: 'Apoyo universitario',
    lead: 'Materias de la carrera (UNT)',
    description: 'Acompañamiento pedagógico en materias clave para desglosar la teoría y alcanzar objetivos académicos con claridad.',
    items: [
      'Psicoanálisis Freud.',
      'Evaluación y Diagnóstico Psicológico (Niños y Adultos).',
      'Direcciones Contemporáneas de la Psicología.',
    ],
  },
  {
    icon: 'bi-journal-check',
    title: 'Asesoramiento en trabajos prácticos y finales',
    description: 'Consultoría en la estructuración, revisión y articulación teórica de tus trabajos prácticos y finales, respetando las normativas vigentes.',
  },
];

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={'reveal ' + (visible ? 'is-visible ' : '') + className}>
      {children}
    </div>
  );
}

function MessageLink({ service }) {
  const text = encodeURIComponent('Hola Paula, quisiera consultar por ' + service + '.');
  return (
    <a className="text-link" href={whatsapp + '?text=' + text} target="_blank" rel="noreferrer">
      Consultar <i className="bi bi-arrow-up-right" />
    </a>
  );
}

export default function ProfessionalSite() {
  return (
    <div className="professional-site">
      <section id="inicio" className="professional-hero">
        <div className="hero-orb hero-orb-left" />
        <div className="hero-orb hero-orb-right" />
        <div className="professional-container hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">Psicología · Tucumán</p>
            <h1>Hola, soy <em>Paula.</em></h1>
            <p className="hero-lede">Apasionada de la vida y de las historias que cada persona trae consigo.</p>
            <div className="hero-body">
              <p>Creo que no hay nada malo en ser diferente; lo difícil es intentar encajar en moldes que no nos pertenecen.</p>
              <p>Mi propuesta es generar un espacio donde no tengas que adaptarte a lo que el mundo espera de ti, sino un lugar donde puedas reconocerte y sentirte libre de ser quien eres.</p>
              <p>Entiendo la psicología como un compromiso con esa singularidad. Mi objetivo es que, a través de la palabra, podamos interrogar aquello que se presenta como una dificultad para que logres abrir nuevos caminos y apuestes por tu propia autonomía.</p>
            </div>
            <a className="primary-link" href="#contacto">Conversemos <i className="bi bi-arrow-down-right" /></a>
          </Reveal>

          <Reveal className="hero-image-wrap">
            <img src={heroImage} alt="Paula Hoyos sonriendo al aire libre" className="hero-image" />
            <span className="hero-image-caption">Escuchar también es abrir espacio.</span>
          </Reveal>
        </div>
      </section>

      <section id="servicios" className="services-section">
        <div className="professional-container">
          <Reveal className="section-heading">
            <p className="eyebrow">Acompañamientos</p>
            <h2>Servicios para cada <em>proceso.</em></h2>
            <p>Propuestas de trabajo cuidadas, con escucha, claridad y herramientas acordes a cada momento.</p>
          </Reveal>

          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} className={'service-card service-card-' + index}>
                <i className={'service-icon bi ' + service.icon} />
                <h3>{service.title}</h3>
                {service.lead && <p className="service-lead">{service.lead}</p>}
                <p>{service.description}</p>
                {service.items && (
                  <ul>
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                <MessageLink service={service.title} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre-mi" className="about-section">
        <div className="professional-container about-grid">
          <Reveal className="about-image-wrap">
            <img src={portraitImage} alt="Retrato de Paula Hoyos" className="about-image" />
            <div className="about-stamp">Psicología<br />con escucha</div>
          </Reveal>

          <Reveal className="about-copy">
            <p className="eyebrow">Sobre mí</p>
            <h2>Un poco de mi <em>recorrido.</em></h2>
            <p>La curiosidad por la Psicología me llevó a formarme en la Universidad Nacional de Tucumán, donde descubrí que mi verdadera vocación reside en la clínica y en el valor de la palabra.</p>
            <p>Me especializo en Evaluación y Diagnóstico Infantil, y en el abordaje de la Clínica Psicoanalítica tanto en adultos como en niños y adolescentes.</p>
            <p>Quienes asisten a mi consultorio encuentran un espacio de calma y orden; un ambiente diseñado para que el pensamiento y la escucha tengan lugar.</p>
            <blockquote>“La vida no examinada no vale la pena ser vivida.” <span>— Sócrates</span></blockquote>
          </Reveal>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="professional-container">
          <Reveal className="section-heading contact-heading">
            <p className="eyebrow">Contacto</p>
            <h2>Estoy para <em>escucharte.</em></h2>
            <p>Elegí el canal que te resulte más cómodo o encontrame en el consultorio.</p>
          </Reveal>

          <div className="contact-grid">
            <Reveal className="contact-card">
              <p className="contact-card-kicker">Hablemos</p>
              <a className="contact-phone" href="https://wa.me/5493816892891" target="_blank" rel="noreferrer">
                +54 9 381 689-2891
              </a>
              <a className="contact-email" href="mailto:psicopauhoyos@gmail.com">psicopauhoyos@gmail.com</a>
              <div className="contact-socials">
                <a href="https://www.instagram.com/pau_hoyossss/" target="_blank" rel="noreferrer"><i className="bi bi-instagram" /> Instagram</a>
                <a href={linkedin} target="_blank" rel="noreferrer"><i className="bi bi-linkedin" /> LinkedIn</a>
                <a href="https://www.facebook.com/pauli.hoyos" target="_blank" rel="noreferrer"><i className="bi bi-facebook" /> Facebook</a>
              </div>
            </Reveal>

            <Reveal className="location-card">
              <div className="location-card-top">
                <div>
                  <p className="contact-card-kicker">Consultorio</p>
                  <h3>ALIWE</h3>
                  <p>Centro de atención integral de la niñez y adolescencia.</p>
                </div>
                <i className="bi bi-geo-alt location-pin" />
              </div>
              <div className="map-frame">
                <iframe
                  title="Ubicación de ALIWE"
                  src="https://www.google.com/maps?q=-26.7986746,-65.2350958&z=17&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                className="map-link"
                href="https://www.google.com/maps/place/ALIWE+Centro+de+atenci%C3%B3n+integral+de+la+ni%C3%B1ez+y+adolescencia/@-26.7986698,-65.2376707,17z/data=!3m1!4b1!4m6!3m5!1s0x94225d005e662093:0x42a1fa52cc732b18!8m2!3d-26.7986746!4d-65.2350958!16s%2Fg%2F11y57ybv2w"
                target="_blank"
                rel="noreferrer"
              >
                Abrir en Google Maps <i className="bi bi-arrow-up-right" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
