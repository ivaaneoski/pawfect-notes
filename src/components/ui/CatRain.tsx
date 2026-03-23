import { useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import type { StickerType } from '../../types/greeting';
import { StickerRender } from './PixelCats';

const ALL_CATS: StickerType[] = [
  'cat-orange', 'cat-black', 'cat-white', 'paw-print', 
  'cat-calico', 'cat-siamese', 'cat-gray', 'yarn-ball'
];

interface RaindropProps {
  delay: number;
  startX: string;
  type: StickerType;
  duration: number;
  size: number;
}

const RaindropCat = ({ delay, startX, type, duration, size }: RaindropProps) => {
  const y = useMotionValue(-150);
  const opacity = useMotionValue(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useAnimationFrame((_, delta) => {
    if (!hasStarted || isInteractive) return;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const speed = screenH / duration;
    let currentY = y.get();
    currentY += speed * (delta / 1000);
    if (currentY > screenH + 150) {
      currentY = -150;
      opacity.set(0);
    }
    y.set(currentY);

    let targetOpacity = 0.7;
    if (currentY < -50) {
      targetOpacity = 0.7 * Math.max(0, (currentY + 150) / 100);
    } else if (currentY > screenH - 50) {
      targetOpacity = 0.7 * Math.max(0, (screenH + 150 - currentY) / 200);
    }
    opacity.set(targetOpacity);
  });

  return (
    <motion.div
      drag
      dragMomentum
      whileDrag={{ scale: 1.5, cursor: 'grabbing', opacity: 0.95 }}
      whileHover={{ cursor: 'grab' }}
      onDragStart={() => setIsInteractive(true)}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: startX, 
        y, 
        zIndex: 0, 
        opacity
      }}
    >
      <StickerRender type={type} style={{ width: size, height: size, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
    </motion.div>
  );
};

export const CatRain = () => {
  const [cats, setCats] = useState<any[]>([]);

  useEffect(() => {
    const newCats = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      type: ALL_CATS[Math.floor(Math.random() * ALL_CATS.length)],
      startX: `${Math.random() * 92}vw`,
      duration: 8 + Math.random() * 7, 
      delay: Math.random() * 15, 
      size: 24 + Math.random() * 36 
    }));
    setCats(newCats);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {cats.map(cat => (
        <div key={cat.id} style={{ pointerEvents: 'auto' }}>
           <RaindropCat {...cat} />
        </div>
      ))}
    </div>
  );
};
