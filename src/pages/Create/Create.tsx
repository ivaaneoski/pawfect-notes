import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Greeting } from '../../types/greeting';
import { nanoid } from 'nanoid';
import { THEMES } from '../../utils/theme';
import styles from './Create.module.css';

import Step1Occasion from './Step1Occasion';
import Step2Details from './Step2Details';
import Step3Preview from './Step3Preview';
import Step4Share from './Step4Share';

export default function Create() {
  const [step, setStep] = useState(1);
  const [greeting, setGreeting] = useState<Partial<Greeting>>({
    id: nanoid(6),
    occasion: 'birthday',
    theme: THEMES[0].id,
    title: '',
    recipientName: '',
    message: '',
    messageStyle: 'normal',
    images: [],
    youtubeUrl: null,
    stickers: [],
    fontStyle: THEMES[0].primaryFont,
    backgroundColor: THEMES[0].backgroundColor,
    createdAt: Date.now(),
    viewCount: 0,
    replies: []
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  
  // Jump to step (e.g., from preview back to edit)
  const setExactStep = (s: number) => setStep(s);

  const updateGreeting = (updates: Partial<Greeting>) => {
    setGreeting(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo} style={{ textDecoration: 'none' }}>PawfectNotes</Link>
        <div className={styles.progress}>Step {step} of 4</div>
      </header>
      
      <main className={styles.main}>
        {step === 1 && (
          <Step1Occasion 
            greeting={greeting} 
            updateGreeting={updateGreeting} 
            onNext={nextStep} 
          />
        )}
        {step === 2 && (
          <Step2Details 
            greeting={greeting} 
            updateGreeting={updateGreeting} 
            onNext={nextStep} 
            onPrev={prevStep} 
          />
        )}
        {step === 3 && (
          <Step3Preview 
            greeting={greeting as Greeting} 
            updateGreeting={updateGreeting} 
            onNext={nextStep} 
            onEdit={() => setExactStep(2)} 
          />
        )}
        {step === 4 && (
          <Step4Share 
            greeting={greeting as Greeting} 
          />
        )}
      </main>
    </div>
  );
}
