// src/layouts/MainLayout.jsx
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FooterDova from '../components/Footer dova/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', minHeight: '80vh' }}>
        {children}
      </main>
      <FooterDova />
    </>
  );
}
