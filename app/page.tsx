'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, Code2, Sparkles, Copy, Check, Share2, Github, Twitter } from 'lucide-react';

export default function SnapCode() {
  const [code, setCode] = useState('// Paste your code here\nfunction hello() {\n  console.log("Hello, World!");\n}');
  const [language, setLanguage] = useState('javascript');
  const [gradient, setGradient] = useState('sunset');
  const [padding, setPadding] = useState([60]);
  const [cornerRadius, setCornerRadius] = useState([16]);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  const gradients = {
    sunset: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ocean: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
    fire: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    forest: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    midnight: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    candy: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    aurora: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    lava: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)',
    peachy: 'linear-gradient(135deg, #ed4264 0%, #ffedbc 100%)',
    purple: 'linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)',
    green: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    orange: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    blue: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
    pink: 'linear-gradient(135deg, #ff0084 0%, #33001b 100%)',
    retro: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
    matrix: 'linear-gradient(135deg, #000000 0%, #0f9b0f 100%)',
  };

  const languageColors = {
    javascript: '#f7df1e',
    python: '#3776ab',
    typescript: '#3178c6',
    java: '#007396',
    cpp: '#00599c',
    ruby: '#cc342d',
    go: '#00add8',
    rust: '#dea584',
    php: '#777bb4',
    swift: '#fa7343',
  };

  const generateCanvas = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const scale = 2;
    canvas.width = 1200 * scale;
    canvas.height = 800 * scale;
    ctx.scale(scale, scale);

    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    const selectedGradient = gradients[gradient as keyof typeof gradients];
    const colors = selectedGradient.match(/#[a-f0-9]{6}/gi) || ['#667eea', '#764ba2'];
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    const codeX = padding[0];
    const codeY = padding[0];
    const codeWidth = 1200 - padding[0] * 2;
    const codeHeight = 800 - padding[0] * 2;

    ctx.fillStyle = '#1e1e1e';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 20;
    
    if (cornerRadius[0] > 0) {
      ctx.beginPath();
      ctx.moveTo(codeX + cornerRadius[0], codeY);
      ctx.lineTo(codeX + codeWidth - cornerRadius[0], codeY);
      ctx.quadraticCurveTo(codeX + codeWidth, codeY, codeX + codeWidth, codeY + cornerRadius[0]);
      ctx.lineTo(codeX + codeWidth, codeY + codeHeight - cornerRadius[0]);
      ctx.quadraticCurveTo(codeX + codeWidth, codeY + codeHeight, codeX + codeWidth - cornerRadius[0], codeY + codeHeight);
      ctx.lineTo(codeX + cornerRadius[0], codeY + codeHeight);
      ctx.quadraticCurveTo(codeX, codeY + codeHeight, codeX, codeY + codeHeight - cornerRadius[0]);
      ctx.lineTo(codeX, codeY + cornerRadius[0]);
      ctx.quadraticCurveTo(codeX, codeY, codeX + cornerRadius[0], codeY);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(codeX, codeY, codeWidth, codeHeight);
    }

    ctx.shadowColor = 'transparent';

    const dotSize = 12;
    const dotY = codeY + 20;
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath();
    ctx.arc(codeX + 20, dotY, dotSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath();
    ctx.arc(codeX + 45, dotY, dotSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#27c93f';
    ctx.beginPath();
    ctx.arc(codeX + 70, dotY, dotSize / 2, 0, Math.PI * 2);
    ctx.fill();

    const langColor = languageColors[language as keyof typeof languageColors] || '#ffffff';
    ctx.fillStyle = langColor;
    ctx.font = 'bold 14px "SF Mono", Monaco, "Courier New", monospace';
    ctx.fillText(language.toUpperCase(), codeX + codeWidth - 100, dotY + 5);

    const lines = code.split('\n');
    let y = codeY + 70;
    const lineHeight = 28;
    
    lines.forEach((line, index) => {
      if (showLineNumbers) {
        ctx.fillStyle = '#6e6e6e';
        ctx.font = '16px "SF Mono", Monaco, "Courier New", monospace';
        ctx.fillText(String(index + 1).padStart(2, ' '), codeX + 20, y);
        
        ctx.fillStyle = '#d4d4d4';
        ctx.font = '18px "SF Mono", Monaco, "Courier New", monospace';
        ctx.fillText(line, codeX + 60, y);
      } else {
        ctx.fillStyle = '#d4d4d4';
        ctx.font = '18px "SF Mono", Monaco, "Courier New", monospace';
        ctx.fillText(line, codeX + 30, y);
      }
      
      y += lineHeight;
      if (y > codeY + codeHeight - 30) return;
    });

    return canvas;
  };

  const downloadImage = () => {
    const canvas = generateCanvas();
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `snapcode-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const copyToClipboard = async () => {
    const canvas = generateCanvas();
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        });
      });

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy image:', err);
      alert('Failed to copy image. Your browser might not support this feature.');
    }
  };

  const shareToTwitter = () => {
    const text = `Just created this beautiful code screenshot with SnapCode! 🎨✨\n\nFree tool for developers: ${window.location.origin}\n\n#coding #webdev #developer`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* SEO-optimized Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              SnapCode
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">Features</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - SEO Optimized */}
          <section className="text-center mb-12" aria-labelledby="hero-heading">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code2 className="w-10 h-10 text-purple-400" />
              <h2 id="hero-heading" className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Beautiful Code Screenshots
              </h2>
              <Sparkles className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-gray-300 text-xl mb-4">
              Create stunning code images instantly - Perfect for Twitter, LinkedIn & GitHub
            </p>
            <p className="text-gray-400 text-sm">
              Free online tool • No signup required • 16+ gradient themes • Instant copy to clipboard
            </p>
          </section>

          {/* Main Tool */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Left Panel - Controls */}
            <div className="space-y-6">
              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                  <Code2 className="w-5 h-5" />
                  Your Code
                </h3>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm bg-[#1e1e1e] border-gray-600 text-white placeholder:text-gray-400"
                  placeholder="Paste your code here..."
                  aria-label="Code input"
                />
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4 text-white">Customize</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="language-select" className="text-sm text-gray-300 mb-2 block font-medium">
                      Programming Language
                    </label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language-select" className="bg-gray-900 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="ruby">Ruby</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                        <SelectItem value="swift">Swift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="gradient-select" className="text-sm text-gray-300 mb-2 block font-medium">
                      Background Gradient Theme
                    </label>
                    <Select value={gradient} onValueChange={setGradient}>
                      <SelectTrigger id="gradient-select" className="bg-gray-900 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600 max-h-[300px]">
                        <SelectItem value="sunset">Sunset Purple</SelectItem>
                        <SelectItem value="ocean">Ocean Blue</SelectItem>
                        <SelectItem value="fire">Fire Pink</SelectItem>
                        <SelectItem value="forest">Forest Cyan</SelectItem>
                        <SelectItem value="midnight">Midnight Blue</SelectItem>
                        <SelectItem value="candy">Candy Pop</SelectItem>
                        <SelectItem value="aurora">Aurora Dream</SelectItem>
                        <SelectItem value="lava">Lava Red</SelectItem>
                        <SelectItem value="peachy">Peachy Sunset</SelectItem>
                        <SelectItem value="purple">Royal Purple</SelectItem>
                        <SelectItem value="green">Fresh Green</SelectItem>
                        <SelectItem value="orange">Orange Burst</SelectItem>
                        <SelectItem value="blue">Sky Blue</SelectItem>
                        <SelectItem value="pink">Hot Pink</SelectItem>
                        <SelectItem value="retro">Retro Wave</SelectItem>
                        <SelectItem value="matrix">Matrix Green</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-gray-300 font-medium">Show Line Numbers</label>
                      <button
                        onClick={() => setShowLineNumbers(!showLineNumbers)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          showLineNumbers 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        aria-pressed={showLineNumbers}
                      >
                        {showLineNumbers ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="padding-slider" className="text-sm text-gray-300 mb-2 block font-medium">
                      Padding: {padding[0]}px
                    </label>
                    <Slider
                      id="padding-slider"
                      value={padding}
                      onValueChange={setPadding}
                      min={20}
                      max={120}
                      step={10}
                      className="w-full"
                      aria-label="Adjust padding"
                    />
                  </div>

                  <div>
                    <label htmlFor="radius-slider" className="text-sm text-gray-300 mb-2 block font-medium">
                      Corner Radius: {cornerRadius[0]}px
                    </label>
                    <Slider
                      id="radius-slider"
                      value={cornerRadius}
                      onValueChange={setCornerRadius}
                      min={0}
                      max={40}
                      step={4}
                      className="w-full"
                      aria-label="Adjust corner radius"
                    />
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-6"
                  aria-label="Copy image to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy
                    </>
                  )}
                </Button>

                <Button 
                  onClick={downloadImage}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-6"
                  aria-label="Download image"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>

                <Button 
                  onClick={shareToTwitter}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-6"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="space-y-6">
              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4 text-white">Live Preview</h3>
                <div
                  className="rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    background: gradients[gradient as keyof typeof gradients],
                    padding: `${padding[0]}px`,
                    minHeight: '400px',
                  }}
                  role="img"
                  aria-label="Code screenshot preview"
                >
                  <div
                    className="bg-gray-900 text-gray-100 p-6 font-mono text-sm overflow-auto shadow-xl"
                    style={{ borderRadius: `${cornerRadius[0]}px` }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="flex-1"></div>
                      <span 
                        className="text-xs font-bold uppercase"
                        style={{ color: languageColors[language as keyof typeof languageColors] || '#ffffff' }}
                      >
                        {language}
                      </span>
                    </div>
                    
                    <pre className="whitespace-pre-wrap break-words text-gray-300">
                      {showLineNumbers ? (
                        code.split('\n').map((line, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-gray-600 select-none w-6 text-right">{i + 1}</span>
                            <span>{line}</span>
                          </div>
                        ))
                      ) : (
                        code
                      )}
                    </pre>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/50 backdrop-blur">
                <h3 className="font-semibold mb-2 text-purple-200">✨ New Features!</h3>
                <ul className="text-sm text-gray-200 space-y-2">
                  <li>• <strong className="text-white">Share to Twitter</strong> - One-click sharing!</li>
                  <li>• <strong className="text-white">Copy to Clipboard</strong> - Instant paste!</li>
                  <li>• <strong className="text-white">16 Gradients</strong> - Beautiful backgrounds!</li>
                  <li>• <strong className="text-white">Line Numbers</strong> - Toggle on/off!</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Features Section - SEO */}
          <section id="features" className="mb-16" aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-3xl font-bold text-center mb-8 text-white">
              Why Developers Love SnapCode
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="text-purple-400 mb-4">
                  <Sparkles className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">16+ Beautiful Gradients</h3>
                <p className="text-gray-300">Choose from stunning gradient backgrounds to make your code stand out on social media.</p>
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="text-blue-400 mb-4">
                  <Copy className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">One-Click Copy</h3>
                <p className="text-gray-300">Copy images directly to clipboard and paste anywhere - no downloads needed!</p>
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="text-pink-400 mb-4">
                  <Share2 className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Social Media Ready</h3>
                <p className="text-gray-300">Perfect dimensions for Twitter, LinkedIn, and GitHub. Share with one click!</p>
              </Card>
            </div>
          </section>

          {/* FAQ Section - Great for SEO! */}
          <section id="faq" className="mb-16" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl font-bold text-center mb-8 text-white">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-white">Is SnapCode really free?</h3>
                <p className="text-gray-300">Yes! SnapCode is 100% free with no signup required. All features are available to everyone.</p>
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-white">What programming languages are supported?</h3>
                <p className="text-gray-300">We support 10+ languages including JavaScript, Python, TypeScript, Java, C++, Ruby, Go, Rust, PHP, and Swift.</p>
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-white">Can I use these images commercially?</h3>
                <p className="text-gray-300">Yes! All screenshots you create are yours to use however you like - social media, documentation, presentations, or commercial projects.</p>
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-white">How do I copy to clipboard?</h3>
                <p className="text-gray-300">Just click the "Copy" button and the image is instantly copied. Then paste (Ctrl+V) anywhere - Twitter, Discord, Slack, or any app!</p>
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <h3 className="text-lg font-semibold mb-2 text-white">What's the image quality?</h3>
                <p className="text-gray-300">All images are exported at 2400x1600 pixels (2x scale) for crisp, high-quality screenshots perfect for any display.</p>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Footer - SEO Links */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">Built with Next.js, React, Tailwind CSS, and shadcn/ui</p>
            <p>Made with ❤️ for developers worldwide | © 2025 SnapCode</p>
            <p className="mt-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              {' · '}
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              {' · '}
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}