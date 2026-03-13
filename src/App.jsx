import React, { useState, useEffect, useRef } from 'react';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';
import Summary from './components/summary/Summary';
import Tools from './components/tools/Tools';
import Experience from './components/experience/Experience';
import Skills from './components/skills/Skills';
import Footer from './components/footer/Footer';
import EmailWidget from './components/email/EmailWidget';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p < 90 ? p + Math.random() * 30 : p);
    }, 100);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
      clearInterval(interval);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loading progress={progress} />;
  }

  return (
    <>
      <div style={styles.grid} />
      <div style={styles.scanline} />
      <ParticleBackground />
      <div style={styles.content}>
        <div style={styles.container}>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Header />
          <main id="main-content">
            <Summary />
            <EmailWidget />
            <Skills />
            <Experience />
            <div id="tools">
              <Tools />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

function ParticleBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = Array.from({length: 30}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1
    }));
    
    const animate = () => {
      ctx.fillStyle = 'rgba(11, 18, 32, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#38bdf8';
      ctx.globalAlpha = 0.3;
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = '#38bdf8';
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} style={styles.canvas} />;
}

const styles = {
  canvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.5
  },
  grid: {
    position: 'fixed',
    inset: 0,
    background: `
      linear-gradient(90deg, rgba(56,189,248,0.01) 1px, transparent 1px),
      linear-gradient(rgba(56,189,248,0.01) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    animation: 'gridMove 40s linear infinite'
  },
  scanline: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(transparent 50%, rgba(56,189,248,0.01) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
    animation: 'scanline 15s linear infinite'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 0.8s ease-out'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px 60px',
    color: '#e2e8f0',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif',
    lineHeight: 1.6,
    fontSize: '20px'
  }
};