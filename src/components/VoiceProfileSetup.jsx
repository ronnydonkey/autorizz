import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';
import { User, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import aiService from '../services/aiService';

const VoiceProfileSetup = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState(['', '', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState(null);

  const questions = [
    {
      title: "Share Your Perspective",
      prompt: "Write about a topic you're passionate about. This could be your industry, a hobby, or a cause you care deeply about. Write as if you're explaining it to a friend.",
      placeholder: "I'm passionate about sustainable technology because...",
      minWords: 50
    },
    {
      title: "Describe Your Experience",
      prompt: "Tell us about a recent challenge you faced and how you overcame it. Focus on your thought process and what you learned.",
      placeholder: "Recently, I encountered a problem when...",
      minWords: 75
    },
    {
      title: "Express Your Opinion",
      prompt: "What's a controversial or unpopular opinion you hold in your field? Explain your reasoning and why you think others might disagree.",
      placeholder: "I believe that most people are wrong about...",
      minWords: 60
    }
  ];

  const handleInputChange = (value) => {
    const newResponses = [...responses];
    newResponses[currentStep] = value;
    setResponses(newResponses);
  };

  const handleNext = () => {
    const currentResponse = responses[currentStep];
    const wordCount = currentResponse.trim().split(/\s+/).length;
    const minWords = questions[currentStep].minWords;

    if (wordCount < minWords) {
      toast.error(`Please write at least ${minWords} words for a good voice analysis.`);
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      analyzeVoice();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const analyzeVoice = async () => {
    setIsAnalyzing(true);
    try {
      const validResponses = responses.filter(r => r.trim().length > 0);
      const profile = await aiService.analyzeUserVoice(validResponses);
      
      if (profile) {
        setVoiceProfile(profile);
        toast.success('Voice profile created successfully!');
        setTimeout(() => {
          onComplete(profile);
        }, 2000);
      } else {
        toast.error('Failed to analyze voice. Please try again.');
      }
    } catch (error) {
      console.error('Voice analysis error:', error);
      toast.error('Error analyzing your writing style. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getCurrentWordCount = () => {
    return responses[currentStep].trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const isCurrentStepValid = () => {
    const wordCount = getCurrentWordCount();
    return wordCount >= questions[currentStep].minWords;
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  if (voiceProfile) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Voice Profile Created!</CardTitle>
          <CardDescription>
            Your unique writing style has been analyzed and saved. AutoRizz will now generate content that matches your authentic voice.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Your Voice Profile Preview:</h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {voiceProfile.slice(0, 200)}...
            </p>
          </div>
          <Button onClick={() => onComplete(voiceProfile)} size="lg">
            Start Creating Content
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold">Let's Learn Your Voice</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          To create authentic content that sounds like you, we need to understand your unique writing style. 
          Please answer these questions in your natural voice.
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            {questions[currentStep].title}
          </CardTitle>
          <CardDescription>
            {questions[currentStep].prompt}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={questions[currentStep].placeholder}
            value={responses[currentStep]}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-40"
            disabled={isAnalyzing}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant={isCurrentStepValid() ? "default" : "secondary"}>
                {getCurrentWordCount()} / {questions[currentStep].minWords} words
              </Badge>
              {isCurrentStepValid() && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Ready
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={isAnalyzing}
                >
                  Previous
                </Button>
              )}
              <Button 
                onClick={handleNext}
                disabled={!isCurrentStepValid() || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing Voice...
                  </>
                ) : currentStep === questions.length - 1 ? (
                  <>
                    Create Voice Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for Better Voice Analysis:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Write naturally, as if you're talking to a friend</li>
            <li>• Use your typical vocabulary and sentence structure</li>
            <li>• Include your personal opinions and perspectives</li>
            <li>• Don't worry about perfect grammar - authenticity matters more</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceProfileSetup;

