import React from 'react';
import type { Greeting } from '../../types/greeting';
import { Button } from '../../components/ui/Button';
import styles from './Create.module.css';
import { compressImage } from '../../utils/storage';
import type { StickerType } from '../../types/greeting';
import { StickerRender } from '../../components/ui/PixelCats';

interface Props {
  greeting: Partial<Greeting>;
  updateGreeting: (updates: Partial<Greeting>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2Details({ greeting, updateGreeting, onNext, onPrev }: Props) {
  const stickerOptions: StickerType[] = ['cat-orange', 'cat-black', 'cat-white', 'paw-print', 'cat-calico', 'cat-siamese', 'cat-gray', 'yarn-ball'];
  const handleStickerToggle = (type: StickerType) => {
    const current = greeting.stickers || [];
    const exists = current.find(s => s.type === type);
    if (exists) {
      updateGreeting({ stickers: current.filter(s => s.type !== type) });
    } else {
      updateGreeting({ stickers: [...current, { type, position: 'scattered' }] });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const compressed = await compressImage(base64, 800);
        updateGreeting({ images: [...(greeting.images || []), compressed].slice(0, 3) });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(greeting.images || [])];
    newImages.splice(index, 1);
    updateGreeting({ images: newImages });
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Write the Note</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-ink)', fontWeight: 600 }}>Title / Cover Text *</label>
          <input 
            type="text" 
            value={greeting.title || ''} 
            onChange={e => updateGreeting({ title: e.target.value })} 
            placeholder="Happy Birthday, Aarav! 🎂"
            style={{ width: '100%', padding: '12px', border: '1px solid var(--color-warm-gray)', borderRadius: 'var(--border-radius-card)', fontFamily: 'var(--font-body)' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-ink)', fontWeight: 600 }}>Recipient Name</label>
          <input 
            type="text" 
            value={greeting.recipientName || ''} 
            onChange={e => updateGreeting({ recipientName: e.target.value })} 
            placeholder="Aarav"
            style={{ width: '100%', padding: '12px', border: '1px solid var(--color-warm-gray)', borderRadius: 'var(--border-radius-card)', fontFamily: 'var(--font-body)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-ink)', fontWeight: 600 }}>Personal Message</label>
          <textarea 
            value={greeting.message || ''} 
            onChange={e => updateGreeting({ message: e.target.value })} 
            placeholder="Write something from the heart..."
            rows={5}
            maxLength={500}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid var(--color-warm-gray)', 
              borderRadius: 'var(--border-radius-card)', 
              fontFamily: greeting.messageStyle === 'handwritten' ? 'var(--font-accent)' : 'var(--font-mono)',
              fontSize: greeting.messageStyle === 'handwritten' ? '1.25rem' : '1rem'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-deep-taupe)', marginTop: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={greeting.messageStyle === 'handwritten'} onChange={e => updateGreeting({ messageStyle: e.target.checked ? 'handwritten' : 'normal' })} />
              Handwritten Style
            </label>
            <span>{greeting.message?.length || 0} / 500</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-ink)', fontWeight: 600 }}>Add Photos (Max 3)</label>
          <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleImageUpload} disabled={(greeting.images?.length || 0) >= 3} />
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {greeting.images?.map((img, i) => (
              <div key={i} style={{ position: 'relative', width: '80px', height: '80px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px', border: '1px solid var(--color-warm-gray)' }}>
                <button onClick={() => removeImage(i)} style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-dusty-rose)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}>x</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-ink)', fontWeight: 600 }}>YouTube Video URL (Optional)</label>
          <input 
            type="text" 
            value={greeting.youtubeUrl || ''} 
            onChange={e => updateGreeting({ youtubeUrl: e.target.value })} 
            placeholder="https://youtube.com/watch?v=..."
            style={{ width: '100%', padding: '12px', border: '1px solid var(--color-warm-gray)', borderRadius: 'var(--border-radius-card)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-ink)', fontWeight: 600 }}>Cutesy Pixel Stickers</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {stickerOptions.map(type => (
              <button 
                key={type}
                onClick={() => handleStickerToggle(type)}
                style={{
                  background: 'transparent',
                  border: greeting.stickers?.some(s => s.type === type) ? '2px solid var(--color-dusty-rose)' : '2px solid transparent',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <StickerRender type={type} style={{ width: 48, height: 48 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onPrev}>Back</Button>
        <Button onClick={onNext} disabled={!greeting.title}>Customize & Preview</Button>
      </div>
    </div>
  );
}
