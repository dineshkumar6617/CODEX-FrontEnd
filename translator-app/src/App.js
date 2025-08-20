import React, { useState } from 'react';
const styles = `
/* General Body and App Container Styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #111827; /* Dark background for the whole page */
}

.translator-container {
  width: 100%;
  max-width: 56rem; /* 896px */
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1f2937;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  color: #d1d5db;
  box-sizing: border-box;
}

/* Header */
.translator-header {
  text-align: center;
  margin-bottom: 2rem;
}

.translator-title {
  font-size: 2.25rem;
  font-weight: bold;
  color: #22d3ee;
  margin: 0;
}

.translator-subtitle {
  color: #9ca3af;
  margin-top: 0.5rem;
}

/* Main Translation Area */
.translation-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .translation-section {
    grid-template-columns: 1fr 1fr;
  }
}

.input-section, .output-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-label {
  font-size: 1rem;
  font-weight: 600;
  color: #d1d5db;
}

/* Language Selectors */
.language-selector {
  width: 100%;
  background-color: #374151;
  border: 2px solid #4b5563;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: white;
  transition: border-color 0.3s, box-shadow 0.3s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.language-selector:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.5);
}

/* Text Input and Output Areas */
.text-input, .text-output {
  width: 100%;
  height: 12rem;
  padding: 1rem;
  background-color: #374151;
  border: 2px solid #4b5563;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.text-input {
  resize: vertical;
}

.text-input:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.5);
}

.text-output {
  background-color: #111827;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: auto;
  color: #9ca3af;
}

/* Translate Button */
.translate-button {
  width: 100%;
  background-color: #06b6d4;
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.translate-button:hover {
  background-color: #0891b2;
}

.translate-button:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
  box-shadow: none;
}

/* Loading Spinner */
.loading {
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error Message */
.error-message {
  background-color: rgba(127, 29, 29, 0.5);
  border: 1px solid #ef4444;
  color: #fca5a5;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-top: 1rem;
}
`;


const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
];

export default function App() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('es');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const translateText = async () => {
        if (!inputText.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                    inputText
                )}&langpair=${sourceLang}|${targetLang}`
            );

            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            
            if (data.responseStatus === 200) {
                setOutputText(data.responseData.translatedText);
            } else {
                throw new Error('Translation service error');
            }
        } catch (err) {
            setError('Failed to translate text. Please try again.');
            console.error('Translation error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            translateText();
        }
    };

    return (
        <>
            <style>{styles}</style>
            <div className="translator-container">
                <div className="translator-header">
                    <h1 className="translator-title">Language Translator</h1>
                    <p className="translator-subtitle">
                        Translate text between different languages instantly
                    </p>
                </div>

                <div className="translation-section">
                    <div className="input-section">
                        <label className="section-label">From</label>
                        <select
                            className="language-selector"
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            className="text-input"
                            placeholder="Enter text to translate..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>

                    <div className="output-section">
                        <label className="section-label">To</label>
                        <select
                            className="language-selector"
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                        <div className="text-output">
                            {outputText || 'Translation will appear here...'}
                        </div>
                    </div>
                </div>

                <button
                    className="translate-button"
                    onClick={translateText}
                    disabled={isLoading || !inputText.trim()}
                >
                    {isLoading && <span className="loading"></span>}
                    {isLoading ? 'Translating...' : 'Translate'}
                </button>

                {error && <div className="error-message">{error}</div>}
                
                <p style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
                    Press Ctrl + Enter to translate quickly
                </p>
            </div>
        </>
    );
};
