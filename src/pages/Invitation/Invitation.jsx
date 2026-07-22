import { useEffect, useRef, useState } from 'react';
import cataratas from '../../assets/mis-15-10/paula-cataratas.jpg';
import luces from '../../assets/mis-15-10/paula-luces.jpg';
import silla from '../../assets/mis-15-10/paula-silla.jpg';
import bar from '../../assets/mis-15-10/paula-bar.jpg';
import humo from '../../assets/mis-15-10/paula-humo.jpg';
import recital from '../../assets/mis-15-10/paula-recital.jpg';
import thunderstruck from '../../assets/mis-15-10/thunderstruck.m4a';
import './Invitation.css';

const eventMapUrl = 'https://www.google.com/maps/place/Colegio+De+Psic%C3%B3logos+De+Tucum%C3%A1n/@-26.8322714,-65.2504329,14z/data=!4m10!1m2!2m1!1scolegio+de+psicologos!3m6!1s0x94225c462d61d417:0xb4d79e4bb17d987e!8m2!3d-26.8252238!4d-65.2117686!15sChVjb2xlZ2lvIGRlIHBzaWNvbG9nb3NaFyIVY29sZWdpbyBkZSBwc2ljb2xvZ29zkgEXbm9uX3Byb2ZpdF9vcmdhbml6YXRpb26aASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUjFhWE42TFhSQlJSQULgAQD6AQQIABBE!16s%2Fg%2F1tzgkq_c';

const photoPairs = [
  [
    { src: cataratas, alt: 'Paula frente a las Cataratas del Iguazú' },
    { src: luces, alt: 'Paula bajo luces de colores' },
  ],
  [
    { src: silla, alt: 'Paula sentada y sonriendo' },
    { src: humo, alt: 'Paula en un retrato entre humo' },
  ],
  [
    { src: bar, alt: 'Paula en un bar' },
    { src: recital, alt: 'Paula en un recital' },
  ],
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
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={'party-reveal ' + (visible ? 'is-visible ' : '') + className}>{children}</div>;
}

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 36 }, (_, index) => <span key={index} style={{ '--i': index }} />)}
    </div>
  );
}

export default function Invitation() {
  const audioRef = useRef(null);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [audioNotice, setAudioNotice] = useState('');
  const [form, setForm] = useState({ nombre: '', asistencia: 'si', mensaje: '', website: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [formStatus, setFormStatus] = useState({ kind: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const oldTitle = document.title;
    const meta = document.querySelector('meta[name="robots"]');
    const oldRobots = meta ? meta.content : '';
    document.title = 'Paula · Mis 15+10';
    if (meta) {
      meta.content = 'noindex, nofollow';
    } else {
      const created = document.createElement('meta');
      created.name = 'robots';
      created.content = 'noindex, nofollow';
      document.head.appendChild(created);
    }

    return () => {
      document.title = oldTitle;
      const current = document.querySelector('meta[name="robots"]');
      if (current) current.content = oldRobots;
    };
  }, []);

  useEffect(() => {
    if (!siteKey || !turnstileContainerRef.current) return undefined;

    const renderWidget = () => {
      if (!window.turnstile || turnstileWidgetRef.current !== null) return;
      turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: siteKey,
        theme: 'dark',
        appearance: 'interaction-only',
        action: 'rsvp',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    const existing = document.querySelector('script[data-turnstile-script="true"]');
    if (existing) {
      existing.addEventListener('load', renderWidget);
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = 'true';
      script.addEventListener('load', renderWidget);
      document.head.appendChild(script);
    }

    return () => {
      if (window.turnstile && turnstileWidgetRef.current !== null) {
        window.turnstile.remove(turnstileWidgetRef.current);
        turnstileWidgetRef.current = null;
      }
    };
  }, [siteKey]);

  useEffect(() => () => {
    audioRef.current?.pause();
  }, []);

  const syncAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(!audio.paused);
    setMuted(audio.muted);
    setVolume(audio.volume);
  };

  const enterParty = async () => {
    setEntered(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    try {
      await audio.play();
      setAudioNotice('');
    } catch {
      setAudioNotice('El navegador bloqueó el sonido. Podés iniciarlo desde los controles de abajo.');
    }
    syncAudio();
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setAudioNotice('');
      } catch {
        setAudioNotice('No se pudo iniciar el audio. Volvé a intentarlo.');
      }
    } else {
      audio.pause();
    }
    syncAudio();
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    syncAudio();
  };

  const adjustVolume = (amount) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(1, Math.max(0, Number((audio.volume + amount).toFixed(1))));
    audio.volume = next;
    audio.muted = next === 0;
    syncAudio();
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ kind: '', message: '' });

    if (!siteKey || !turnstileToken) {
      setFormStatus({ kind: 'error', message: 'Completá la verificación antes de enviar tu confirmación.' });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          turnstileToken,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'No pudimos guardar tu confirmación.');
      }

      setFormStatus({ kind: 'success', message: '¡Gracias! Tu confirmación quedó guardada.' });
      setForm({ nombre: '', asistencia: 'si', mensaje: '', website: '' });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      window.turnstile?.reset(turnstileWidgetRef.current);
      setTurnstileToken('');
    } catch (error) {
      setFormStatus({ kind: 'error', message: error.message || 'Hubo un problema. Probá nuevamente en un momento.' });
      window.turnstile?.reset(turnstileWidgetRef.current);
      setTurnstileToken('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="party-page">
      <audio
        ref={audioRef}
        src={thunderstruck}
        preload="auto"
        loop
        onPlay={syncAudio}
        onPause={syncAudio}
        onVolumeChange={syncAudio}
      />

      {!entered && (
        <div className="party-gate">
          <div className="gate-glow" />
          <p>Paula cumple</p>
          <strong>15+10</strong>
          <span>Una invitación con volumen</span>
          <button type="button" onClick={enterParty}><i className="bi bi-volume-up-fill" /> Entrar a la fiesta</button>
          <small>Con sonido</small>
        </div>
      )}

      <div className={entered ? 'party-content is-visible' : 'party-content'}>
        <section className="party-hero">
          <p>te invito a celebrar</p>
          <h1>Mis <span>15+10</span><br />Paula</h1>
          <div className="party-number">15+10</div>
          <blockquote>Porque los <strong>15</strong> se festejan una vez, pero cumplirlos <strong>dos veces</strong> se festeja el doble. Vení a bailar, a reír y a hacer ruido conmigo.</blockquote>
          <div className="scroll-cue"><span>Deslizá</span><i /></div>
        </section>

        <section className="party-section party-gallery-section">
          <Reveal>
            <p className="party-eyebrow">Recuerdos</p>
            <h2>Un poco de mí</h2>
          </Reveal>
          <div className="party-gallery">
            {photoPairs.map((pair, index) => (
              <Reveal key={index} className="photo-pair">
                {pair.map((photo, photoIndex) => (
                  <figure key={photo.src} className={'party-photo photo-' + index + '-' + photoIndex}>
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                  </figure>
                ))}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="party-section">
          <Reveal>
            <p className="party-eyebrow">Dónde y cuándo</p>
            <h2>La fiesta</h2>
            <div className="party-location-card">
              <div className="location-item">
                <i className="bi bi-calendar-event" />
                <div><strong>Domingo 23 de agosto de 2026</strong><span>19:00 hs</span></div>
              </div>
              <div className="location-item">
                <i className="bi bi-geo-alt" />
                <div><strong>Colegio de Psicólogos de Tucumán</strong><span>Córdoba 1027, San Miguel de Tucumán</span></div>
              </div>
              <div className="party-map">
                <iframe title="Mapa del Colegio de Psicólogos de Tucumán" src="https://www.google.com/maps?q=-26.8252238,-65.2117686&z=16&output=embed" loading="lazy" />
              </div>
              <a href={eventMapUrl} target="_blank" rel="noreferrer">Abrir en Google Maps <i className="bi bi-arrow-up-right" /></a>
            </div>
          </Reveal>
        </section>

        <section className="party-section party-rsvp-section">
          <Reveal>
            <p className="party-eyebrow">Último paso</p>
            <h2>Confirmá tu asistencia</h2>
            <form className="party-form" onSubmit={handleSubmit}>
              <label>
                Nombre y apellido
                <input name="nombre" value={form.nombre} onChange={handleInput} placeholder="¿Cómo te llamás?" minLength="2" maxLength="100" required />
              </label>

              <fieldset>
                <legend>¿Vas a poder venir?</legend>
                <div className="attendance-options">
                  <label><input type="radio" name="asistencia" value="si" checked={form.asistencia === 'si'} onChange={handleInput} /> <span>🎉 Sí, voy</span></label>
                  <label><input type="radio" name="asistencia" value="quizas" checked={form.asistencia === 'quizas'} onChange={handleInput} /> <span>🤔 Todavía no sé</span></label>
                  <label><input type="radio" name="asistencia" value="no" checked={form.asistencia === 'no'} onChange={handleInput} /> <span>😔 No puedo</span></label>
                </div>
              </fieldset>

              <label>
                ¿Algún mensaje para Paula? <small>(opcional)</small>
                <textarea name="mensaje" value={form.mensaje} onChange={handleInput} placeholder="Escribí algo lindo" maxLength="500" rows="3" />
              </label>

              <label className="honeypot" aria-hidden="true">
                No completar
                <input name="website" value={form.website} onChange={handleInput} tabIndex="-1" autoComplete="off" />
              </label>

              <div ref={turnstileContainerRef} className="turnstile-slot" />
              {!siteKey && <p className="form-help">La verificación se habilitará al configurar la clave pública de Cloudflare.</p>}
              {formStatus.message && <p className={'form-status ' + formStatus.kind} aria-live="polite">{formStatus.message}</p>}
              <button type="submit" disabled={submitting}>{submitting ? 'Enviando…' : 'Confirmar'}</button>
            </form>
          </Reveal>
        </section>

        <footer className="party-footer">
          <strong>PAULA · 15+10</strong>
          <span>Te espero para celebrar juntos ✨</span>
        </footer>
      </div>

      {entered && (
        <div className="music-dock" aria-label="Controles de música">
          <button type="button" onClick={togglePlay} aria-label={playing ? 'Pausar música' : 'Reproducir música'}><i className={'bi ' + (playing ? 'bi-pause-fill' : 'bi-play-fill')} /></button>
          <button type="button" onClick={toggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'}><i className={'bi ' + (muted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill')} /></button>
          <button type="button" onClick={() => adjustVolume(-0.1)} aria-label="Bajar volumen"><i className="bi bi-dash-lg" /></button>
          <span>{Math.round(volume * 100)}%</span>
          <button type="button" onClick={() => adjustVolume(0.1)} aria-label="Subir volumen"><i className="bi bi-plus-lg" /></button>
        </div>
      )}

      <p className="audio-notice" aria-live="polite">{audioNotice}</p>
      <Confetti active={showConfetti} />
    </div>
  );
}
