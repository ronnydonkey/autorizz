import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const SignalMiningEngine = ({ onSignalSelect }) => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNiches, setSelectedNiches] = useState(['tech', 'business']);
  const [timeframe, setTimeframe] = useState('24h');

  // Mock signal data - in production this would come from Reddit/X APIs
  const mockSignals = [
    {
      id: 1,
      source: 'reddit',
      subreddit: 'r/entrepreneur',
      title: 'Why most productivity apps fail (and what actually works)',
      engagement: 847,
      trend_score: 92,
      keywords: ['productivity', 'apps', 'workflow', 'efficiency'],
      sentiment: 'frustrated',
      content_angles: [
        'The psychology behind productivity app addiction',
        'Why simple tools beat complex systems',
        '3 productivity myths that waste your time',
        'Building habits vs. relying on apps'
      ],
      hook_suggestions: [
        'Stop me if this sounds familiar: You download a new productivity app...',
        'I tried 47 productivity apps so you don\'t have to',
        'The $2B productivity app industry has a dirty secret',
        'Why your productivity app is making you less productive'
      ],
      thumbnail_brief: 'Split screen: cluttered app interface vs simple notebook',
      estimated_reach: '50K-100K views',
      difficulty: 'Medium',
      urgency: 'High - trending now'
    },
    {
      id: 2,
      source: 'twitter',
      handle: '@naval',
      title: 'Remote work is creating a new class divide',
      engagement: 1243,
      trend_score: 88,
      keywords: ['remote work', 'inequality', 'future of work', 'class divide'],
      sentiment: 'concerned',
      content_angles: [
        'The hidden costs of remote work privilege',
        'Why location independence isn\'t for everyone',
        'Remote work: liberation or new form of inequality?',
        'The geography of opportunity in 2024'
      ],
      hook_suggestions: [
        'Remote work is creating winners and losers...',
        'The uncomfortable truth about remote work privilege',
        'Why "work from anywhere" is a myth for most people',
        'Remote work: the great equalizer or the great divider?'
      ],
      thumbnail_brief: 'World map showing digital nomad hotspots vs excluded areas',
      estimated_reach: '75K-150K views',
      difficulty: 'High',
      urgency: 'Medium - evergreen topic'
    },
    {
      id: 3,
      source: 'reddit',
      subreddit: 'r/SaaS',
      title: 'AI tools are commoditizing faster than anyone expected',
      engagement: 623,
      trend_score: 85,
      keywords: ['AI', 'SaaS', 'commoditization', 'competition'],
      sentiment: 'analytical',
      content_angles: [
        'The AI tool graveyard: what went wrong',
        'How to build defensible AI products',
        'Why AI features aren\'t enough anymore',
        'The race to the bottom in AI pricing'
      ],
      hook_suggestions: [
        'Every AI startup is building the same thing...',
        'Why 90% of AI tools will be dead by 2025',
        'The AI bubble is about to burst (here\'s why)',
        'I analyzed 500 AI startups and found a pattern'
      ],
      thumbnail_brief: 'Graveyard of AI logos with "RIP" tombstones',
      estimated_reach: '30K-60K views',
      difficulty: 'High',
      urgency: 'High - market timing critical'
    },
    {
      id: 4,
      source: 'reddit',
      subreddit: 'r/getmotivated',
      title: 'Why "follow your passion" is terrible advice',
      engagement: 1456,
      trend_score: 90,
      keywords: ['passion', 'career advice', 'motivation', 'success'],
      sentiment: 'contrarian',
      content_angles: [
        'The passion trap: why it keeps you stuck',
        'Skills vs passion: what really matters',
        'How to find work you love (without following passion)',
        'The dark side of "do what you love"'
      ],
      hook_suggestions: [
        '"Follow your passion" is the worst career advice ever',
        'I followed my passion and it ruined my life',
        'Why successful people ignore their passions',
        'The passion myth that\'s keeping you broke'
      ],
      thumbnail_brief: 'Person at crossroads: "Passion" vs "Skills" signposts',
      estimated_reach: '100K-200K views',
      difficulty: 'Medium',
      urgency: 'Medium - evergreen but trending'
    },
    {
      id: 5,
      source: 'twitter',
      handle: '@elonmusk',
      title: 'The attention economy is broken and we\'re all addicted',
      engagement: 2847,
      trend_score: 95,
      keywords: ['attention economy', 'social media', 'addiction', 'mental health'],
      sentiment: 'concerned',
      content_angles: [
        'How social media hijacked your brain',
        'The true cost of infinite scroll',
        'Breaking free from the attention trap',
        'Why your phone is designed to be addictive'
      ],
      hook_suggestions: [
        'Your phone is literally rewiring your brain...',
        'I deleted social media for 30 days and here\'s what happened',
        'The attention economy is stealing your life',
        'Why you can\'t focus (and it\'s not your fault)'
      ],
      thumbnail_brief: 'Brain with social media icons as neural pathways',
      estimated_reach: '200K-500K views',
      difficulty: 'Medium',
      urgency: 'High - mental health trending'
    }
  ];

  const niches = [
    { id: 'tech', name: 'Technology', color: 'bg-blue-100 text-blue-800' },
    { id: 'business', name: 'Business', color: 'bg-green-100 text-green-800' },
    { id: 'productivity', name: 'Productivity', color: 'bg-purple-100 text-purple-800' },
    { id: 'career', name: 'Career', color: 'bg-orange-100 text-orange-800' },
    { id: 'lifestyle', name: 'Lifestyle', color: 'bg-pink-100 text-pink-800' },
    { id: 'finance', name: 'Finance', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const timeframes = [
    { id: '1h', name: 'Last Hour' },
    { id: '24h', name: 'Last 24 Hours' },
    { id: '7d', name: 'Last Week' },
    { id: '30d', name: 'Last Month' }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setSignals(mockSignals);
      setLoading(false);
    }, 1500);
  }, [selectedNiches, timeframe]);

  const handleNicheToggle = (nicheId) => {
    setSelectedNiches(prev => 
      prev.includes(nicheId) 
        ? prev.filter(id => id !== nicheId)
        : [...prev, nicheId]
    );
  };

  const getTrendIcon = (score) => {
    if (score >= 90) return '🔥';
    if (score >= 80) return '📈';
    if (score >= 70) return '⚡';
    return '💡';
  };

  const getUrgencyColor = (urgency) => {
    if (urgency.includes('High')) return 'bg-red-100 text-red-800';
    if (urgency.includes('Medium')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'High') return 'bg-red-100 text-red-800';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="fade-in-up" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="gradient-text-secondary" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Trend Scout
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280', fontWeight: '400' }}>
          Discovers what's trending before everyone else
        </p>
      </div>

      {/* Filters */}
      <div className="modern-card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>Select Your Niches</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {niches.map(niche => (
              <button
                key={niche.id}
                onClick={() => handleNicheToggle(niche.id)}
                className={selectedNiches.includes(niche.id) ? 'btn-primary' : 'btn-secondary'}
                style={{ 
                  padding: '8px 16px',
                  fontSize: '14px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease'
                }}
              >
                {niche.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>Timeframe</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {timeframes.map(tf => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={timeframe === tf.id ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                {tf.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="modern-card" style={{ padding: '4rem', textAlign: 'center' }}>
          <div className="loading-modern" style={{ width: '48px', height: '48px', margin: '0 auto 2rem' }}></div>
          <div>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Scouting trends...</p>
            <p style={{ fontSize: '1rem', color: '#6b7280' }}>
              Analyzing Reddit discussions, Twitter trends, and viral content patterns
            </p>
          </div>
        </div>
      )}

      {/* Signals Grid */}
      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {signals.map(signal => (
            <div key={signal.id} className="signal-card">
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{getTrendIcon(signal.trend_score)}</span>
                  <div className="badge-modern" style={{ fontSize: '11px', padding: '4px 8px' }}>
                    {signal.source === 'reddit' ? signal.subreddit : signal.handle}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>
                  Score: {signal.trend_score}
                </div>
              </div>

              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', lineHeight: '1.4', marginBottom: '1rem', color: '#1f2937' }}>
                {signal.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '14px', color: '#6b7280' }}>
                <span>💬 {signal.engagement}</span>
                <span>👀 {signal.estimated_reach}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div className={`badge-modern ${signal.difficulty === 'High' ? 'badge-warning' : signal.difficulty === 'Medium' ? 'badge-success' : 'badge-modern'}`}>
                  {signal.difficulty}
                </div>
                <div className={`badge-modern ${signal.urgency.includes('High') ? 'badge-warning' : 'badge-success'}`}>
                  {signal.urgency.split(' - ')[0]}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {signal.keywords.slice(0, 3).map(keyword => (
                  <span key={keyword} style={{ 
                    padding: '4px 8px', 
                    background: 'rgba(255, 255, 255, 0.7)', 
                    color: '#4b5563', 
                    fontSize: '12px', 
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    {keyword}
                  </span>
                ))}
                {signal.keywords.length > 3 && (
                  <span style={{ 
                    padding: '4px 8px', 
                    background: 'rgba(255, 255, 255, 0.7)', 
                    color: '#4b5563', 
                    fontSize: '12px', 
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    +{signal.keywords.length - 3}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Top Hook:</p>
                <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic', lineHeight: '1.4' }}>
                  "{signal.hook_suggestions[0]}"
                </p>
              </div>

              <button
                onClick={() => onSignalSelect(signal)}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '600' }}
              >
                Create Content ✨
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      {!loading && (
        <div className="modern-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#6b7280' }}>
            <span>Found {signals.length} trending signals</span>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalMiningEngine;

