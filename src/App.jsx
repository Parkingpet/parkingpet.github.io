import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import ParticleBackground from './components/background/ParticleBackground';
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

const styles = {
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