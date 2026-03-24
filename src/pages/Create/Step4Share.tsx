import { useState } from 'react';
import type { Greeting } from '../../types/greeting';
import { Button } from '../../components/ui/Button';
import { saveGreeting, encodeDataToUrl } from '../../utils/storage';
import styles from './Create.module.css';

interface Props {
  greeting: Greeting;
}

export default function Step4Share({ greeting }: Props) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const link = `${window.location.origin}/g/${greeting.id}?data=${encodeDataToUrl(greeting)}`;

  const handleSave = () => {
    saveGreeting(greeting);
    setSaved(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!saved) {
    return (
      <div className={styles.stepContainer} style={{ textAlign: 'center' }}>
        <h2 className={styles.stepTitle}>Ready to purr?</h2>
        <p style={{ marginBottom: '24px', color: 'var(--color-deep-taupe)' }}>Your personalized greeting has been constructed. Save it to instantly generate your paw print link.</p>
        <Button onClick={handleSave}>Generate Link</Button>
      </div>
    );
  }

  return (
    <div className={styles.stepContainer} style={{ textAlign: 'center' }}>
      <h2 className={styles.stepTitle}>Your Paw Print Link</h2>
      <p style={{ marginBottom: '24px', color: 'var(--color-deep-taupe)' }}>It's ready! Share the warm fuzzies with this link.</p>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: 'var(--color-cream)',
        padding: '16px',
        borderRadius: 'var(--border-radius-card)',
        border: '1px solid var(--color-warm-gray)',
        marginBottom: '32px'
      }}>
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-ink)' }}>{link}</code>
        <Button variant="ghost" onClick={copyLink} style={{ color: 'var(--color-dusty-rose)' }}>
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Button onClick={() => window.location.href = `/g/${greeting.id}`} variant="secondary">View My Greeting</Button>
        <Button onClick={() => window.location.href = `/`} variant="ghost">Return Home</Button>
      </div>
    </div>
  );
}
