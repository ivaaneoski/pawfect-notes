import type { Greeting } from '../../types/greeting';
import { Button } from '../../components/ui/Button';
import { StickerRender } from '../../components/ui/PixelCats';
import styles from './Create.module.css';

interface Props {
  greeting: Greeting;
  updateGreeting: (updates: Partial<Greeting>) => void;
  onNext: () => void;
  onEdit: () => void;
}

const corners = [
  { top: -20, left: -20, rot: -15 },
  { top: -20, right: -20, rot: 15 },
  { bottom: -20, left: -20, rot: 10 },
  { bottom: -20, right: -20, rot: -10 }
];

export default function Step3Preview({ greeting, onNext, onEdit }: Props) {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Preview Your Greeting</h2>
      
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        border: '1px solid var(--color-warm-gray)', 
        borderRadius: 'var(--border-radius-card)',
        backgroundColor: greeting.backgroundColor,
        padding: '32px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontFamily: `var(--font-${greeting.fontStyle})`, color: 'var(--color-ink)', marginBottom: '16px' }}>{greeting.title}</h1>
        {greeting.recipientName && (
          <p style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem', marginBottom: '24px', color: 'var(--color-dusty-rose)' }}>Dear {greeting.recipientName},</p>
        )}
        
        {greeting.images && greeting.images.length > 0 && (
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            {greeting.stickers?.map((s, idx) => {
               const c = corners[idx % 4];
               return (
                 <div key={idx} style={{ position: 'absolute', top: c.top, bottom: c.bottom, left: c.left, right: c.right, transform: `rotate(${c.rot}deg)`, zIndex: 10 }}>
                   <StickerRender type={s.type} style={{ width: 48 }} />
                 </div>
               );
            })}
            <img src={greeting.images[0]} style={{ width: '100%', borderRadius: '4px', border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} alt="Preview" />
          </div>
        )}

        <div style={{ 
          position: 'relative',
          fontFamily: greeting.messageStyle === 'handwritten' ? 'var(--font-accent)' : 'var(--font-mono)', 
          fontSize: greeting.messageStyle === 'handwritten' ? '1.5rem' : '1rem',
          whiteSpace: 'pre-wrap',
          color: 'var(--color-ink)',
          marginBottom: '24px',
          lineHeight: greeting.messageStyle === 'handwritten' ? '1.8' : '1.6'
        }}>
          {greeting.stickers?.map((s, idx) => {
             const c = corners[idx % 4];
             return (
               <div key={`msg-${idx}`} style={{ position: 'absolute', top: c.top !== undefined ? c.top + 4 : undefined, bottom: c.bottom !== undefined ? c.bottom + 4 : undefined, left: c.left !== undefined ? c.left + 4 : undefined, right: c.right !== undefined ? c.right + 4 : undefined, transform: `rotate(${c.rot}deg)`, zIndex: 10 }}>
                 <StickerRender type={s.type} style={{ width: 48 }} />
               </div>
             );
          })}
          {greeting.message}
        </div>
      </div>

      <div className={styles.actions} style={{ marginTop: '32px' }}>
        <Button variant="secondary" onClick={onEdit}>Make Changes</Button>
        <Button onClick={onNext}>Looks Good — Send It With Paws</Button>
      </div>
    </div>
  );
}
