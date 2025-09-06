import React, { useState } from 'react';

const SignalDetailModal = ({ signal, isOpen, onClose, onGenerateContent }) => {
  const [selectedAngle, setSelectedAngle] = useState(null);
  const [selectedHook, setSelectedHook] = useState(null);
  const [activeTab, setActiveTab] = useState('angles');

  if (!isOpen || !signal) return null;

  const handleGenerateContent = () => {
    const contentPrompt = {
      signal: signal.title,
      angle: selectedAngle || signal.content_angles[0],
      hook: selectedHook || signal.hook_suggestions[0],
      keywords: signal.keywords,
      sentiment: signal.sentiment,
      source: signal.source,
      estimated_reach: signal.estimated_reach
    };
    
    onGenerateContent(contentPrompt);
    onClose();
  };

  const getTrendIcon = (score) => {
    if (score >= 90) return '🔥';
    if (score >= 80) return '📈';
    if (score >= 70) return '⚡';
    return '💡';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="modern-card fade-in-up"
        style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{getTrendIcon(signal.trend_score)}</span>
                <div>
                  <div className="badge-modern" style={{ marginBottom: '0.5rem', fontSize: '11px' }}>
                    {signal.source === 'reddit' ? signal.subreddit : signal.handle}
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', lineHeight: '1.2', margin: 0 }}>
                    {signal.title}
                  </h2>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem', fontSize: '14px', color: '#6b7280' }}>
                <span>💬 {signal.engagement} engagements</span>
                <span>👀 {signal.estimated_reach}</span>
                <span>📊 Score: {signal.trend_score}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div className={`badge-modern ${signal.difficulty === 'High' ? 'badge-warning' : 'badge-success'}`}>
                  {signal.difficulty} Difficulty
                </div>
                <div className={`badge-modern ${signal.urgency.includes('High') ? 'badge-warning' : 'badge-success'}`}>
                  {signal.urgency.split(' - ')[0]}
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                e.target.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.color = '#6b7280';
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {[
              { id: 'angles', label: 'Content Angles' },
              { id: 'hooks', label: 'Hook Ideas' },
              { id: 'insights', label: 'Insights' },
              { id: 'strategy', label: 'Strategy' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 1.5rem',
                  background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid var(--primary-gradient)' : '3px solid transparent',
                  color: activeTab === tab.id ? '#374151' : '#6b7280',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '8px 8px 0 0'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
          {activeTab === 'angles' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#374151' }}>
                Choose Your Content Angle
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {signal.content_angles.map((angle, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedAngle(angle)}
                    style={{
                      padding: '1.5rem',
                      background: selectedAngle === angle 
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: selectedAngle === angle 
                        ? '2px solid rgba(102, 126, 234, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedAngle !== angle) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedAngle !== angle) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontWeight: '500', color: '#374151', margin: 0 }}>{angle}</p>
                      {selectedAngle === angle && (
                        <span style={{ color: '#667eea', fontSize: '18px', fontWeight: '600' }}>✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hooks' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#374151' }}>
                Choose Your Hook
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {signal.hook_suggestions.map((hook, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedHook(hook)}
                    style={{
                      padding: '1.5rem',
                      background: selectedHook === hook 
                        ? 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: selectedHook === hook 
                        ? '2px solid rgba(240, 147, 251, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedHook !== hook) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedHook !== hook) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontStyle: 'italic', color: '#374151', margin: 0 }}>"{hook}"</p>
                      {selectedHook === hook && (
                        <span style={{ color: '#f093fb', fontSize: '18px', fontWeight: '600' }}>✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div className="modern-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#374151' }}>Audience Sentiment</h4>
                <p style={{ color: '#6b7280', textTransform: 'capitalize', margin: '0 0 0.5rem 0' }}>{signal.sentiment}</p>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
                  People are feeling {signal.sentiment} about this topic
                </p>
              </div>

              <div className="modern-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#374151' }}>Keywords</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {signal.keywords.map(keyword => (
                    <span key={keyword} className="badge-modern badge-success" style={{ fontSize: '12px' }}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modern-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#374151' }}>Visual Concept</h4>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{signal.thumbnail_brief}</p>
              </div>

              <div className="modern-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#374151' }}>Reach Potential</h4>
                <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>{signal.estimated_reach}</p>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
                  Based on similar trending content
                </p>
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div className="modern-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>Content Strategy</h4>
                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '14px' }}>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#374151' }}>Best Platforms:</strong>{' '}
                    <span style={{ color: '#6b7280' }}>
                      {signal.difficulty === 'High' ? 'LinkedIn, Medium' :
                       signal.difficulty === 'Medium' ? 'Twitter, LinkedIn, YouTube' :
                       'TikTok, Instagram, Twitter'}
                    </span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#374151' }}>Optimal Timing:</strong>{' '}
                    <span style={{ color: '#6b7280' }}>
                      {signal.urgency.includes('High') ? 'Post within 24 hours' :
                       signal.urgency.includes('Medium') ? 'Post within 3 days' :
                       'Evergreen - post anytime'}
                    </span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#374151' }}>Content Format:</strong>{' '}
                    <span style={{ color: '#6b7280' }}>
                      {signal.source === 'reddit' ? 'Long-form explanation, thread' : 'Quick take, viral angle'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="modern-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>Success Factors</h4>
                <ul style={{ margin: 0, paddingLeft: '1rem', color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>
                  <li>Strong hook that addresses the {signal.sentiment} sentiment</li>
                  <li>Include personal experience or data</li>
                  <li>Use keywords: {signal.keywords.slice(0, 3).join(', ')}</li>
                  <li>End with engaging question or call-to-action</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '1.5rem 2rem', 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <p style={{ margin: '0 0 0.25rem 0' }}>
                <strong>Selected:</strong> {selectedAngle || signal.content_angles[0]}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Hook:</strong> {(selectedHook || signal.hook_suggestions[0]).substring(0, 50)}...
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ padding: '10px 20px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateContent}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '14px' }}
              >
                Generate Content ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalDetailModal;

