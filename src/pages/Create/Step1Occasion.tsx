import type { Greeting, Occasion } from '../../types/greeting';
import { THEMES } from '../../utils/theme';
import { Button } from '../../components/ui/Button';
import styles from './Create.module.css';

interface Props {
  greeting: Partial<Greeting>;
  updateGreeting: (updates: Partial<Greeting>) => void;
  onNext: () => void;
}

const OCCASIONS: { value: Occasion; label: string }[] = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'thankyou', label: 'Thank You' },
  { value: 'congratulations', label: 'Congratulations' },
  { value: 'custom', label: 'Just Because / Custom' }
];

export default function Step1Occasion({ greeting, updateGreeting, onNext }: Props) {
  const filteredThemes = THEMES.filter(
    t => t.occasion === 'any' || t.occasion === greeting.occasion
  );

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Pick Your Theme</h2>
      
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <p style={{ marginBottom: '16px', color: 'var(--color-deep-taupe)' }}>What's the occasion?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {OCCASIONS.map(occ => (
            <button
              key={occ.value}
              onClick={() => updateGreeting({ occasion: occ.value, theme: THEMES.find(t => t.occasion === occ.value || t.occasion === 'any')?.id || THEMES[0].id })}
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                border: `1px solid ${greeting.occasion === occ.value ? 'var(--color-dusty-rose)' : 'var(--color-warm-gray)'}`,
                backgroundColor: greeting.occasion === occ.value ? 'var(--color-blush)' : 'transparent',
                color: greeting.occasion === occ.value ? 'var(--color-ink)' : 'var(--color-deep-taupe)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem'
              }}
            >
              {occ.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {filteredThemes.map(theme => (
          <div
            key={theme.id}
            onClick={() => updateGreeting({ 
              theme: theme.id, 
              backgroundColor: theme.backgroundColor,
              fontStyle: theme.primaryFont
            })}
            style={{
              padding: '24px',
              border: `2px solid ${greeting.theme === theme.id ? 'var(--color-dusty-rose)' : 'var(--color-warm-gray)'}`,
              borderRadius: 'var(--border-radius-card)',
              backgroundColor: theme.backgroundColor,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'transform 0.15s ease'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', color: theme.accentColor, marginBottom: '8px' }}>
              {theme.name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: ['midnight-bloom', 'pixel-arcade'].includes(theme.id) ? 'var(--color-lavender)' : 'var(--color-ink)' }}>{theme.vibe}</p>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button onClick={onNext}>Next: Write the Note</Button>
      </div>
    </div>
  );
}
