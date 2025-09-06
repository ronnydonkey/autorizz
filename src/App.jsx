import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ContentGenerator from './components/ContentGenerator';
import VoiceProfileSetup from './components/VoiceProfileSetup';
import SignalMiningEngine from './components/SignalMiningEngine';
import SignalDetailModal from './components/SignalDetailModal';
import './App.css';
import './scholarly-theme.css';

function App() {
  const [currentView, setCurrentView] = useState('signals'); // 'signals' or 'generator'
  const [voiceProfile, setVoiceProfile] = useState(null);
  const [showVoiceSetup, setShowVoiceSetup] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [signalPrompt, setSignalPrompt] = useState(null);

  const handleVoiceProfileComplete = (profile) => {
    setVoiceProfile(profile);
    setShowVoiceSetup(false);
  };

  const handleSetupVoice = () => {
    setShowVoiceSetup(true);
  };

  const handleSignalSelect = (signal) => {
    setSelectedSignal(signal);
    setShowSignalModal(true);
  };

  const handleGenerateFromSignal = (prompt) => {
    setSignalPrompt(prompt);
    setCurrentView('generator');
    setShowSignalModal(false);
  };

  const handleBackToSignals = () => {
    setCurrentView('signals');
    setSignalPrompt(null);
  };

  return (
    <div className="scholarly-container fade-in-scholarly">
      <Toaster position="top-right" />
      
      {/* Scholarly Header */}
      <header className="scholarly-nav" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="scholarly-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          AutoRizz.bet
        </h1>
        <p className="scholarly-subtitle">
          Research-Driven Content Intelligence Platform
        </p>
        
        {/* Academic Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            onClick={() => setCurrentView('signals')}
            className={`scholarly-nav-item ${currentView === 'signals' ? 'active' : ''}`}
          >
            🔍 Trend Scout
          </button>
          <button 
            onClick={() => setCurrentView('generator')}
            className={`scholarly-nav-item ${currentView === 'generator' ? 'active' : ''}`}
          >
            🏭 Rizz Factory
          </button>
          <button 
            onClick={handleSetupVoice}
            className="scholarly-nav-item"
          >
            {voiceProfile ? '⚙️ Update Style DNA' : '🧬 Setup Style DNA'}
          </button>
        </div>
        
        {voiceProfile && (
          <div style={{ marginTop: '1rem' }}>
            <span className="badge-scholarly">🧬 Style DNA Active</span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="scholarly-section">
        {showVoiceSetup ? (
          <div className="scholarly-card">
            <VoiceProfileSetup onComplete={handleVoiceProfileComplete} />
          </div>
        ) : currentView === 'signals' ? (
          <SignalMiningEngine onSignalSelect={handleSignalSelect} />
        ) : (
          <ContentGenerator 
            voiceProfile={voiceProfile} 
            onSetupVoice={handleSetupVoice}
            signalPrompt={signalPrompt}
            onBackToSignals={handleBackToSignals}
          />
        )}
      </main>

      {/* Signal Detail Modal */}
      <SignalDetailModal
        signal={selectedSignal}
        isOpen={showSignalModal}
        onClose={() => setShowSignalModal(false)}
        onGenerateContent={handleGenerateFromSignal}
      />

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--parchment-light)',
            color: 'var(--ink-dark)',
            border: '1px solid var(--parchment-dark)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px var(--paper-shadow)',
            fontFamily: 'Georgia, serif',
          },
          success: {
            duration: 3000,
            style: {
              background: 'var(--accent-sage)',
              color: 'var(--parchment-light)',
            },
          },
          error: {
            style: {
              background: 'var(--accent-burgundy)',
              color: 'var(--parchment-light)',
            },
          },
        }}
      />
    </div>
  );
}

export default App;

