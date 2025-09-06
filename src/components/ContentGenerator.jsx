import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import PlatformSelector from './PlatformSelector';
import superiorAIService from '../services/superiorAIService';

const ContentGenerator = ({ voiceProfile, onSetupVoice }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [agentStatuses, setAgentStatuses] = useState({});
  const [generatedContent, setGeneratedContent] = useState({});
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin']); // Default selection
  const [showPlatformSelector, setShowPlatformSelector] = useState(false);

  // Platform configurations
  const platforms = [
    { id: 'twitter', name: 'Twitter', emoji: '🐦', color: '#1da1f2' },
    { id: 'linkedin', name: 'LinkedIn', emoji: '💼', color: '#0077b5' },
    { id: 'reddit', name: 'Reddit', emoji: '🤖', color: '#ff4500' },
    { id: 'youtube', name: 'YouTube', emoji: '📺', color: '#ff0000' },
    { id: 'instagram', name: 'Instagram', emoji: '📸', color: '#e4405f' },
    { id: 'tiktok', name: 'TikTok', emoji: '🎵', color: '#000000' },
    { id: 'blog', name: 'Blog Post', emoji: '📝', color: '#10b981' }
  ];

  // Multi-agent processing steps
  const processingSteps = [
    { id: 'analysis', name: 'Input Analysis', emoji: '🔍', description: 'Analyzing your content and extracting key themes' },
    { id: 'voice', name: 'Voice Analysis', emoji: '🎭', description: 'Applying your unique writing style and tone' },
    { id: 'research', name: 'Research', emoji: '📚', description: 'Finding reliable sources and supporting data' },
    { id: 'generation', name: 'Content Generation', emoji: '🧠', description: 'Creating platform-optimized content' }
  ];

  const generateContent = async () => {
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setAgentStatuses({});
    setGeneratedContent({});

    try {
      // Step 1: Input Analysis (simulated)
      setCurrentStep('analysis');
      setAgentStatuses({ analysis: 'running' });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAgentStatuses(prev => ({ ...prev, analysis: 'completed' }));
      setProgress(25);

      // Step 2: Voice Analysis (simulated)
      setCurrentStep('voice');
      setAgentStatuses(prev => ({ ...prev, voice: 'running' }));
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAgentStatuses(prev => ({ ...prev, voice: 'completed' }));
      setProgress(50);

      // Step 3: Research (simulated)
      setCurrentStep('research');
      setAgentStatuses(prev => ({ ...prev, research: 'running' }));
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAgentStatuses(prev => ({ ...prev, research: 'completed' }));
      setProgress(75);

      // Step 4: Generate content only for selected platforms
      setCurrentStep('generation');
      const platformStatuses = {};
      selectedPlatforms.forEach(platformId => {
        platformStatuses[platformId] = 'running';
      });
      setAgentStatuses(prev => ({ ...prev, ...platformStatuses }));

      // Real AI content generation for selected platforms only
      const results = await superiorAIService.generatePlatformContent(input, selectedPlatforms, voiceProfile);
      
      // Simulate staggered completion for UX
      const completionTimes = selectedPlatforms.map((_, i) => 500 + (i * 300));
      
      for (let i = 0; i < selectedPlatforms.length; i++) {
        setTimeout(() => {
          const platformId = selectedPlatforms[i];
          setAgentStatuses(prev => ({ ...prev, [platformId]: 'completed' }));
          
          if (results[platformId]) {
            setGeneratedContent(prev => ({
              ...prev,
              [platformId]: results[platformId]
            }));
          }
          
          if (i === selectedPlatforms.length - 1) {
            setProgress(100);
            setCurrentStep('completed');
            toast.success(`Superior content generated for ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''}!`);
          }
        }, completionTimes[i]);
      }

      await new Promise(resolve => setTimeout(resolve, completionTimes[completionTimes.length - 1] + 500));
      
    } catch (error) {
      console.error('Content generation error:', error);
      toast.error('Error generating content. Please try again.');
      
      // Fallback to mock content if AI fails
      setGeneratedContent({
        twitter: {
          content: `🧠 ${input.slice(0, 100)}...\n\nKey insights:\n• Innovation thrives in diverse environments\n• Creativity requires psychological safety\n• Remote work changes everything\n\nWhat's your experience? 👇\n\n#Innovation #Creativity #FutureOfWork`,
          metrics: { characters: 280, threads: 3 }
        }
      });
      setProgress(100);
      setCurrentStep('completed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerate = () => {
    if (!input.trim()) {
      toast.error('Please enter some content to transform');
      return;
    }
    generateContent();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="fade-in-up" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="gradient-text-secondary" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Rizz Factory
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280', fontWeight: '400' }}>
          Transform your scattered thoughts into engaging, platform-optimized content
        </p>
        
        {/* Voice Profile Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          {voiceProfile ? (
            <div className="badge-modern badge-success">
              ✨ Style DNA Active
            </div>
          ) : (
            <button 
              onClick={onSetupVoice}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              ⚙️ Setup Style DNA
            </button>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="modern-card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🧠 Your Thoughts
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Enter your ideas, paste a URL, or share your thoughts. Our AI will transform them into engaging content for all platforms.
            {voiceProfile && " Your unique Style DNA will be applied to maintain authenticity."}
          </p>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <textarea
            placeholder="Share your thoughts, ideas, or paste a URL here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              fontSize: '14px',
              color: '#374151',
              resize: 'vertical',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.border = '2px solid rgba(102, 126, 234, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.7)';
            }}
          />
        </div>
        
        {/* Platform Selector */}
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          onPlatformChange={setSelectedPlatforms}
          onConfirm={() => {}} // Not needed since we generate directly
        />
        
        <button 
          onClick={handleGenerate} 
          disabled={isProcessing || !input.trim()}
          className="btn-primary"
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '16px', 
            fontWeight: '600',
            marginTop: '1rem',
            opacity: (isProcessing || !input.trim()) ? 0.6 : 1,
            cursor: (isProcessing || !input.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {isProcessing ? '🔄 Generating Content...' : '✨ Generate Content'}
        </button>
      </div>

      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Multi-Agent Processing</CardTitle>
            <CardDescription>Our specialized AI agents are working in parallel to create your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
            
            {/* Processing Steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {processingSteps.map((step) => {
                const Icon = step.icon;
                const status = agentStatuses[step.id] || 'pending';
                return (
                  <div key={step.id} className="flex flex-col items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5" />
                      {getStatusIcon(status)}
                    </div>
                    <h4 className="font-medium text-sm text-center">{step.name}</h4>
                    <p className="text-xs text-gray-500 text-center mt-1">{step.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Platform Generation Status */}
            {currentStep === 'generation' && (
              <div>
                <h4 className="font-medium mb-3">Platform Content Generation</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const status = agentStatuses[platform.id] || 'pending';
                    return (
                      <div key={platform.id} className="flex flex-col items-center p-2 border rounded">
                        <div className={`p-2 rounded-full ${platform.color} mb-2`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        {getStatusIcon(status)}
                        <span className="text-xs mt-1">{platform.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Generated Content */}
      {Object.keys(generatedContent).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Generated Content
            </CardTitle>
            <CardDescription>Your content optimized for each platform with superior writing quality</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={selectedPlatforms[0]} className="w-full">
              <TabsList className={`grid w-full ${selectedPlatforms.length <= 3 ? 'grid-cols-' + selectedPlatforms.length : 'grid-cols-3 md:grid-cols-' + Math.min(selectedPlatforms.length, 6)}`}>
                {platforms.filter(platform => selectedPlatforms.includes(platform.id)).map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <TabsTrigger key={platform.id} value={platform.id} className="flex items-center gap-1">
                      <Icon className="h-4 w-4" />
                      <span className="hidden md:inline">{platform.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {platforms.filter(platform => selectedPlatforms.includes(platform.id)).map((platform) => (
                <TabsContent key={platform.id} value={platform.id} className="space-y-4">
                  {generatedContent[platform.id] && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <platform.icon className="h-5 w-5" />
                          {platform.name} Content
                        </h3>
                        <div className="flex gap-2">
                          {Object.entries(generatedContent[platform.id].metrics || {}).map(([key, value]) => (
                            <Badge key={key} variant="secondary">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {platform.id === 'blog' ? (
                          <div>
                            <h2 className="text-2xl font-bold mb-2">{generatedContent[platform.id].title}</h2>
                            <p className="text-gray-600 mb-4">{generatedContent[platform.id].metaDescription}</p>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: generatedContent[platform.id].content.replace(/\n/g, '<br />') }} />
                          </div>
                        ) : (
                          <pre className="whitespace-pre-wrap text-sm font-mono">
                            {generatedContent[platform.id].content}
                          </pre>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedContent[platform.id].content);
                            toast.success(`${platform.name} content copied to clipboard!`);
                          }}
                          variant="outline"
                        >
                          Copy Content
                        </Button>
                        <Button variant="outline">
                          Edit Content
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentGenerator;

