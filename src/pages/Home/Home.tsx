import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { CatOrange, CatWhite, CatBlack, PawPrint } from '../../components/ui/PixelCats';
import { CatRain } from '../../components/ui/CatRain';

export default function Home() {
  return (
    <div className={styles.container}>
      <CatRain />
      <header className={styles.header} style={{ position: 'relative', zIndex: 1 }}>
        <Link to="/" className={styles.logo} style={{ textDecoration: 'none' }}>PawfectNotes</Link>
        <nav className={styles.nav}>
          <Link to="/create" className={styles.navLink}>Create</Link>
          <Link to="/my-greetings" className={styles.navLink}>My Greetings</Link>
        </nav>
      </header>
      
      <main style={{ position: 'relative', zIndex: 1 }}>
        <section className={styles.hero} style={{ position: 'relative' }}>
          <CatWhite style={{ position: 'absolute', top: -30, right: '10%', width: 56, transform: 'rotate(15deg)' }} />
          <CatBlack style={{ position: 'absolute', bottom: 10, left: '10%', width: 56, transform: 'rotate(-10deg)' }} />
          <h1 className={styles.heroTitle}>Send love that stays.</h1>
          <p className={styles.heroSubtitle}>A little note. A lot of love. Crafted specifically for those you care about.</p>
          <Link to="/create" className={styles.ctaButton}>
            Create a Greeting
          </Link>
        </section>

        <section className={styles.features} style={{ position: 'relative' }}>
          <PawPrint style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%) rotate(15deg)', width: 32, opacity: 0.5 }} />
          <div className={styles.feature}>
            <div className={styles.icon}>🌸</div>
            <h3 className={styles.featureTitle}>Beautiful Templates</h3>
            <p className={styles.featureDesc}>Soft, aesthetic designs for every occasion</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>💌</div>
            <h3 className={styles.featureTitle}>Personal Messages</h3>
            <p className={styles.featureDesc}>Add your words, your way</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>🔗</div>
            <h3 className={styles.featureTitle}>Shareable Links</h3>
            <p className={styles.featureDesc}>One link, forever accessible</p>
          </div>
        </section>

        <footer style={{ position: 'relative', textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)', marginTop: 'var(--spacing-8)' }}>
          <CatOrange style={{ position: 'absolute', top: -40, right: '10%', width: 64, transform: 'rotate(-5deg)' }} />
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-ink)' }}>
            made by <a href="https://github.com/ivaaneoski" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-dusty-rose)', textDecoration: 'underline' }}>ivaan</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
