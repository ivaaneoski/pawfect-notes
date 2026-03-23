import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllMyGreetings, deleteGreeting } from '../../utils/storage';
import type { Greeting } from '../../types/greeting';
import { Button } from '../../components/ui/Button';
import styles from './MyGreetings.module.css';

export default function MyGreetings() {
  const [greetings, setGreetings] = useState<Greeting[]>([]);

  useEffect(() => {
    setGreetings(getAllMyGreetings());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this greeting?')) {
      deleteGreeting(id);
      setGreetings(getAllMyGreetings());
    }
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/g/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied with paws! 🐾');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>PawfectNotes</Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/create" className={styles.navLink}>Create</Link>
        </nav>
      </header>
      
      <main className={styles.main}>
        <div className={styles.headerArea}>
          <h1 className={styles.title}>The Windowsill</h1>
          <p className={styles.subtitle}>Your handcrafted notes, resting in the sunshine.</p>
        </div>
        
        {greetings.length === 0 ? (
          <div className={styles.emptyState}>
            <p style={{ color: 'var(--color-deep-taupe)', marginBottom: 'var(--spacing-3)' }}>You haven't crafted any notes yet.</p>
            <Link to="/create">
              <Button>Pick your cats</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {greetings.map(g => (
              <div key={g.id} className={styles.card}>
                <div className={styles.cardTop} style={{ backgroundColor: g.backgroundColor }}>
                  <span className={styles.badge}>{g.occasion}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{g.title || 'Untitled Note'}</h3>
                  <p className={styles.cardDate}>{new Date(g.createdAt).toLocaleDateString()}</p>
                  
                  <div className={styles.actions}>
                    <Link to={`/g/${g.id}`}>
                      <Button variant="secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>View</Button>
                    </Link>
                    <Button variant="ghost" onClick={() => copyLink(g.id)} style={{ fontSize: '12px', padding: '8px' }}>Copy Link</Button>
                    <Button variant="ghost" onClick={() => handleDelete(g.id)} style={{ color: 'var(--color-dusty-rose)', fontSize: '12px', padding: '8px' }}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
