import React from 'react';
import { WandIcon } from './icons';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  recentPrompts: string[];
  onClearHistory: () => void;
}

const surprisePrompts = [
    'Minimalist Japanese tea garden in spring',
    'Cyberpunk cityscape at night, neon reflections on wet streets',
    'Art Deco hotel lobby with velvet furniture',
    'Bohemian desert oasis at sunset',
    'Cozy Scandinavian cabin in a snowy forest',
    'Underwater coral reef teeming with bioluminescent creatures',
    'Steampunk workshop filled with brass gears and gadgets',
    'Tropical brutalist architecture overgrown with jungle vines',
    'A whimsical enchanted forest with glowing mushrooms',
    'Retro-futuristic diner on a distant planet',
];

const ControlPanel: React.FC<ControlPanelProps> = ({ prompt, setPrompt, onGenerate, isLoading, recentPrompts, onClearHistory }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onGenerate();
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
        <div className="relative">
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 'A cozy retro-futuristic study room'"
                className="w-full pl-5 pr-48 py-3.5 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isLoading}
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button
                    onClick={handleSurpriseMe}
                    disabled={isLoading}
                    className="p-2 text-gray-500 hover:text-indigo-600 disabled:text-gray-300 transition-colors rounded-full"
                    aria-label="Surprise me with a random prompt"
                >
                    <WandIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={onGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center justify-center font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                >
                    Generate
                </button>
            </div>
        </div>

        {recentPrompts.length > 0 && (
            <div className="mt-6 text-center">
                <h4 className="text-sm font-medium text-gray-600 mb-3">Recent Themes</h4>
                <div className="flex flex-wrap justify-center gap-2">
                    {recentPrompts.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPrompt(p)}
                            disabled={isLoading}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 disabled:opacity-50 transition-colors"
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={onClearHistory}
                    disabled={isLoading}
                    className="mt-4 text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                    Clear History
                </button>
            </div>
        )}
    </div>
  );
};

export default ControlPanel;