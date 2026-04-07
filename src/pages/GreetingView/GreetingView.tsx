import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGreeting, decodeDataFromUrl, fetchGreetingFromServer, saveGreeting } from '../../utils/storage';
import type { Greeting } from '../../types/greeting';
import { Button } from '../../components/ui/Button';
import { StickerRender } from '../../components/ui/PixelCats';
import { downloadGreetingAsHtml, isGreetingSavedLocally } from '../../utils/greetingDownload';
import styles from './GreetingView.module.css';

const corners = [
  { top: -20, left: -20, rot: -15 },
  { top: -20, right: -20, rot: 15 },
  { bottom: -20, left: -20, rot: 10 },
  { bottom: -20, right: -20, rot: -10 }
];

const getYoutubeEmbedId = (youtubeUrl: string | null) => {
  if (!youtubeUrl) return '';
  const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match?.[1] ?? '';
};

export default function GreetingView() {
  const { id } = useParams<{ id: string }>();
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let dataParam = new URLSearchParams(window.location.search).get('data');
      if (!dataParam) {
        const match = window.location.hash.match(/#data=(.*)/);
        if (match) dataParam = match[1];
      }
      if (dataParam) {
        const decoded = decodeDataFromUrl(dataParam);
        if (decoded) {
          setGreeting(decoded);
          setIsLoading(false);
          return;
        }
      }

      if (id) {
        const serverData = await fetchGreetingFromServer(id);
        if (serverData) {
          setGreeting(serverData);
          setIsLoading(false);
          return;
        }

        const localData = getGreeting(id);
        setGreeting(localData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.viewport} style={{ backgroundColor: 'var(--color-cream)' }}>
        <p style={{ color: 'var(--color-ink)', textAlign: 'center', paddingTop: '100px', fontFamily: 'var(--font-body)' }}>Opening your pawfect note...</p>
      </div>
    );
  }

  if (!greeting) {
    return (
      <div className={styles.notFound}>
        <h2>We couldn't find this greeting.</h2>
        <p>It may have been deleted, or it was created on another device and hasn't been synced.</p>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  const youtubeId = getYoutubeEmbedId(greeting.youtubeUrl);
  const isSavedLocally = savedNotice || isGreetingSavedLocally(greeting.id);

  const handleSaveToLibrary = () => {
    saveGreeting(greeting);
    setSavedNotice(true);
  };

  const handleDownload = () => {
    downloadGreetingAsHtml(greeting);
  };

  return (
    <div className={styles.viewport} style={{ backgroundColor: greeting.backgroundColor }}>
      <div className={styles.decoLayer}></div>

      <main className={styles.container}>
        <div className={styles.cardEntrance}>
          <section className={styles.cover}>
            <h1 style={{ fontFamily: `var(--font-${greeting.fontStyle})`, color: 'var(--color-ink)' }}>
              {greeting.title}
            </h1>
            {greeting.recipientName && (
              <p className={styles.recipient}>
                For {greeting.recipientName}
              </p>
            )}
          </section>

          {greeting.images && greeting.images.length > 0 && (
            <section className={styles.imagesGrid} style={{ position: 'relative' }}>
              {greeting.stickers?.map((s, idx) => {
                const c = corners[idx % 4];
                return (
                  <div key={idx} style={{ position: 'absolute', top: c.top, bottom: c.bottom, left: c.left, right: c.right, transform: `rotate(${c.rot}deg)`, zIndex: 10 }}>
                    <StickerRender type={s.type} style={{ width: 48 }} />
                  </div>
                );
              })}
              {greeting.images.map((img, i) => (
                <div key={i} className={styles.imageWrapper}>
                  <img src={img} alt="Greeting moment" className={styles.image} />
                </div>
              ))}
            </section>
          )}

          {greeting.message && (
            <section className={styles.messageSection} style={{ position: 'relative' }}>
              {greeting.stickers?.map((s, idx) => {
                const c = corners[idx % 4];
                return (
                  <div key={`msg-${idx}`} style={{ position: 'absolute', top: c.top !== undefined ? c.top + 4 : undefined, bottom: c.bottom !== undefined ? c.bottom + 4 : undefined, left: c.left !== undefined ? c.left + 4 : undefined, right: c.right !== undefined ? c.right + 4 : undefined, transform: `rotate(${c.rot}deg)`, zIndex: 10 }}>
                    <StickerRender type={s.type} style={{ width: 48 }} />
                  </div>
                );
              })}
              <div
                style={{
                  fontFamily: greeting.messageStyle === 'handwritten' ? 'var(--font-accent)' : 'var(--font-mono)',
                  fontSize: greeting.messageStyle === 'handwritten' ? '1.5rem' : '1.125rem',
                  lineHeight: '1.8',
                  color: 'var(--color-ink)',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {greeting.message}
              </div>
            </section>
          )}

          {youtubeId && (
            <section className={styles.videoSection}>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 'var(--border-radius-card)' }}
              ></iframe>
            </section>
          )}

          <footer className={styles.footer}>
            <p>Made with PawfectNotes</p>
            <div className={styles.actionRow}>
              <Button variant="secondary" onClick={handleSaveToLibrary}>
                {isSavedLocally ? 'Saved to My Greetings' : 'Save to My Greetings'}
              </Button>
              <Button variant="ghost" onClick={handleDownload}>
                Download Greeting
              </Button>
            </div>
            {isSavedLocally && (
              <p className={styles.savedHint}>This greeting is now saved in your browser on this device.</p>
            )}
            <div style={{ marginTop: '16px' }}>
              <Link to="/create"><Button variant="secondary">Create your own</Button></Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
