import { useEffect, useRef } from 'react';

const FLAKE_COUNT = 10;
const PARTICLE_CHARS = ['a', 'b', 'c', 'd'] as const;

const ClickFx = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const spawnFlakes = (x: number, y: number) => {
      if (reducedMotion) return;

      for (let i = 0; i < FLAKE_COUNT; i += 1) {
        const flake = document.createElement('span');
        const driftX = (Math.random() - 0.5) * 110;
        const driftY = -20 - Math.random() * 100;
        const rotate = (Math.random() - 0.5) * 220;
        const startScale = 0.7 + Math.random() * 0.5;
        const endScale = startScale + 0.45;
        const duration = 600 + Math.random() * 350;

        flake.className = 'click-snowflake';
        flake.dataset.char = PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)];
        flake.style.left = `${x}px`;
        flake.style.top = `${y}px`;
        flake.style.setProperty('--dx', `${driftX}px`);
        flake.style.setProperty('--dy', `${driftY}px`);
        flake.style.setProperty('--rotate', `${rotate}deg`);
        flake.style.setProperty('--start-scale', `${startScale}`);
        flake.style.setProperty('--end-scale', `${endScale}`);
        flake.style.setProperty('--duration', `${duration}ms`);

        document.body.append(flake);
        window.setTimeout(() => flake.remove(), duration + 80);
      }
    };

    const playClickSound = () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new window.AudioContext();
        }

        const context = audioContextRef.current;
        if (context.state === 'suspended') {
          void context.resume();
        }

        const now = context.currentTime;

        const attackOsc = context.createOscillator();
        const attackGain = context.createGain();
        attackOsc.type = 'square';
        attackOsc.frequency.setValueAtTime(2450, now);
        attackOsc.frequency.exponentialRampToValueAtTime(1320, now + 0.018);
        attackGain.gain.setValueAtTime(0.0001, now);
        attackGain.gain.exponentialRampToValueAtTime(0.12, now + 0.0025);
        attackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        const pingOsc = context.createOscillator();
        const pingGain = context.createGain();
        pingOsc.type = 'triangle';
        pingOsc.frequency.setValueAtTime(1880, now + 0.008);
        pingOsc.frequency.exponentialRampToValueAtTime(960, now + 0.07);
        pingGain.gain.setValueAtTime(0.0001, now + 0.006);
        pingGain.gain.exponentialRampToValueAtTime(0.075, now + 0.013);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

        const clackOsc = context.createOscillator();
        const clackGain = context.createGain();
        clackOsc.type = 'sawtooth';
        clackOsc.frequency.setValueAtTime(940, now + 0.004);
        clackOsc.frequency.exponentialRampToValueAtTime(520, now + 0.04);
        clackGain.gain.setValueAtTime(0.0001, now + 0.003);
        clackGain.gain.exponentialRampToValueAtTime(0.04, now + 0.008);
        clackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        attackOsc.connect(attackGain);
        pingOsc.connect(pingGain);
        clackOsc.connect(clackGain);
        attackGain.connect(context.destination);
        pingGain.connect(context.destination);
        clackGain.connect(context.destination);

        attackOsc.start(now);
        pingOsc.start(now + 0.006);
        clackOsc.start(now + 0.003);
        attackOsc.stop(now + 0.032);
        pingOsc.stop(now + 0.095);
        clackOsc.stop(now + 0.052);
      } catch {
        // Ignore audio failures to avoid breaking click interactions.
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      spawnFlakes(event.clientX, event.clientY);
      playClickSound();
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  return null;
};

export default ClickFx;
