'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, Code2, Sparkles } from 'lucide-react';

export default function SnapCode() {
  const [code, setCode] = useState('// Paste your code here\nfunction hello() {\n  console.log("Hello, World!");\n}');
  const [language, setLanguage] = useState('javascript');
  const [gradient, setGradient] = useState('sunset');
  const [padding, setPadding] = useState([60]);
  const [cornerRadius, setCornerRadius] = useState([16]);

  const gradients = {
    sunset: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ocean: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
    fire: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    forest: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    midnight: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    candy: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
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

  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    ctx.fillStyle = '#d4d4d4';
    ctx.font = '18px "SF Mono", Monaco, "Courier New", monospace';
    const lines = code.split('\n');
    let y = codeY + 70;
    lines.forEach((line) => {
      ctx.fillText(line, codeX + 30, y);
      y += 28;
      if (y > codeY + codeHeight - 30) return;
    });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              SnapCode
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-gray-400 text-lg">
            Create beautiful code screenshots in seconds
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Your Code
              </h2>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm bg-[#1e1e1e] border-gray-700 text-white placeholder:text-gray-500"
                placeholder="Paste your code here..."
              />
            </Card>

            <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Customize</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
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
                  <label className="text-sm text-gray-400 mb-2 block">Background Gradient</label>
                  <Select value={gradient} onValueChange={setGradient}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="sunset">Sunset Purple</SelectItem>
                      <SelectItem value="ocean">Ocean Blue</SelectItem>
                      <SelectItem value="fire">Fire Pink</SelectItem>
                      <SelectItem value="forest">Forest Cyan</SelectItem>
                      <SelectItem value="midnight">Midnight Blue</SelectItem>
                      <SelectItem value="candy">Candy Pop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Padding: {padding[0]}px
                  </label>
                  <Slider
                    value={padding}
                    onValueChange={setPadding}
                    min={20}
                    max={120}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Corner Radius: {cornerRadius[0]}px
                  </label>
                  <Slider
                    value={cornerRadius}
                    onValueChange={setCornerRadius}
                    min={0}
                    max={40}
                    step={4}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            <Button 
              onClick={downloadImage}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-6 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Image
            </Button>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div
                className="rounded-lg overflow-hidden shadow-2xl"
                style={{
                  background: gradients[gradient as keyof typeof gradients],
                  padding: `${padding[0]}px`,
                  minHeight: '400px',
                }}
              >
                <div
                  className="bg-gray-900 text-gray-100 p-6 font-mono text-sm overflow-auto shadow-xl"
                  style={{ borderRadius: `${cornerRadius[0]}px` }}
                >
                  {/* Window Controls */}
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
                  
                  {/* Code Content */}
                  <pre className="whitespace-pre-wrap break-words text-gray-300">
                    {code}
                  </pre>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/50 backdrop-blur">
              <h3 className="font-semibold mb-2 text-purple-300">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Share on Twitter/LinkedIn to showcase your code</li>
                <li>• Use different gradients for different vibes</li>
                <li>• Adjust padding for more breathing room</li>
                <li>• Perfect for tutorials and documentation</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Next.js, Tailwind CSS, and shadcn/ui</p>
          <p className="mt-2">Made with ❤️ for developers</p>
        </div>
      </div>
    </div>
  );
}