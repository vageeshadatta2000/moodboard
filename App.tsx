import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import MoodBoardGrid from './components/MoodBoardGrid';
import Spinner from './components/Spinner';
import { generateMoodBoardConcepts } from './services/geminiService';
import { PinData, SharedMoodBoard } from './types';
import { ShareIcon } from './components/icons';
import Modal from './components/Modal';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [pins, setPins] = useState<PinData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const [selectedPin, setSelectedPin] = useState<PinData | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string>('Share Board');
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedPrompts = localStorage.getItem('moodboard_recent_prompts');
      if (storedPrompts) {
        setRecentPrompts(JSON.parse(storedPrompts));
      }
    } catch (error) {
      console.error("Failed to load recent prompts:", error);
    }
  }, []);

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;

    setIsLoading(true);
    setPins([]);
    setError(null);
    setLoadingMessage('Warming up the creative engines...');

    try {
      const newPins = await generateMoodBoardConcepts(trimmedPrompt, (message) => {
        setLoadingMessage(message);
      });
      setPins(newPins);

      // Update recent prompts
      setRecentPrompts(prevPrompts => {
        const updatedPrompts = [trimmedPrompt, ...prevPrompts.filter(p => p !== trimmedPrompt)].slice(0, 10);
        try {
          localStorage.setItem('moodboard_recent_prompts', JSON.stringify(updatedPrompts));
        } catch (error) {
          console.error("Failed to save recent prompts:", error);
        }
        return updatedPrompts;
      });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleShare = () => {
    if (pins.length === 0 || shareFeedback === 'Link Copied!') return;

    const sharedData: SharedMoodBoard = {
      prompt,
      pins,
    };
    const base64Data = btoa(JSON.stringify(sharedData));
    const url = `${window.location.origin}${window.location.pathname}?moodboard=${base64Data}`;
    
    navigator.clipboard.writeText(url).then(() => {
        setShareFeedback('Link Copied!');
        setTimeout(() => setShareFeedback('Share Board'), 2000);
    });
  };

  const handleClearHistory = () => {
    setRecentPrompts([]);
    try {
      localStorage.removeItem('moodboard_recent_prompts');
    } catch (error) {
      console.error("Failed to clear recent prompts:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const moodboardData = params.get('moodboard');
    if (moodboardData) {
      try {
        const decodedData: SharedMoodBoard = JSON.parse(atob(moodboardData));
        setPrompt(decodedData.prompt);
        setPins(decodedData.pins);
      } catch (e) {
        console.error("Failed to parse shared mood board data:", e);
        setError("Could not load the shared mood board. The link may be corrupted.");
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full p-4 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
            <header className="py-6 px-4 text-center">
                <h1 className="text-4xl font-bold text-gray-900">AI Mood Board Generator</h1>
                <p className="text-lg text-gray-600 mt-2">Bring your creative visions to life with a single prompt.</p>
            </header>
            
            <main>
                <ControlPanel 
                    prompt={prompt} 
                    setPrompt={setPrompt} 
                    onGenerate={handleGenerate} 
                    isLoading={isLoading} 
                    recentPrompts={recentPrompts}
                    onClearHistory={handleClearHistory}
                />
                
                {isLoading && (
                <div className="flex justify-center my-10">
                    <Spinner message={loadingMessage} />
                </div>
                )}

                {error && (
                <div className="text-center my-10 text-red-600 bg-red-100 p-4 rounded-md max-w-2xl mx-auto">
                    <p><strong>Error:</strong> {error}</p>
                </div>
                )}

                {!isLoading && pins.length > 0 && (
                <div className="text-center mb-8">
                    <button 
                        onClick={handleShare}
                        className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center justify-center font-semibold hover:bg-green-600 transition-all duration-200 mx-auto"
                    >
                        <ShareIcon className="w-5 h-5 mr-2"/>
                        {shareFeedback}
                    </button>
                </div>
                )}

                <MoodBoardGrid pins={pins} onPinClick={(pin) => setSelectedPin(pin)} />
            </main>
      </div>

      <Modal 
        isOpen={!!selectedPin} 
        onClose={() => setSelectedPin(null)} 
        pin={selectedPin} 
      />
    </div>
  );
}

export default App;