# AutoRizz.bet

**Research-Driven Content Intelligence Platform**

AutoRizz.bet is a sophisticated AI-powered content creation platform that helps users discover trending topics and create engaging, platform-optimized social media content while maintaining their authentic writing style.

## 🎯 Features

### 🔍 Trend Scout
- **AI-powered signal mining** for trending topics
- **Real-time trend analysis** across Reddit, Twitter, and other platforms
- **Engagement metrics** and reach predictions
- **Content angle suggestions** for each trending topic
- **Urgency indicators** to prioritize timely content

### 🏭 Rizz Factory
- **Multi-platform content generation** (Twitter, LinkedIn, Reddit, YouTube, Instagram, TikTok, Blog Posts)
- **Sub-15 second processing** with informative loading screens
- **Platform-specific optimization** for maximum engagement
- **Unique hooks** for each piece of content (no repetitive formulas)
- **SEO-optimized blog content** with meta descriptions and keywords

### 🧬 Style DNA
- **Advanced voice learning** and personalization system
- **Authentic content** that matches user's writing style
- **Continuous improvement** through user feedback
- **Voice profile setup** and management

## 🎨 Design Philosophy

AutoRizz.bet features a **scholarly parchment aesthetic** inspired by academic research and da Vinci's notebooks:

- **Warm parchment backgrounds** with subtle texture
- **Academic color palette** - muted earth tones, burgundy, sage green
- **Professional typography** with serif fonts
- **Research-focused branding** and messaging
- **Sophisticated, credible appearance** for serious content creators

## 🚀 Technology Stack

- **Frontend:** React 18 + Vite
- **Styling:** Custom CSS with scholarly theme system
- **AI Integration:** OpenAI API for content generation
- **State Management:** React hooks
- **Notifications:** React Hot Toast
- **Build Tool:** Vite for fast development and optimized builds

## 📁 Project Structure

```
autorizz-ai/
├── src/
│   ├── components/
│   │   ├── ContentGenerator.jsx      # Main content generation interface
│   │   ├── SignalMiningEngine.jsx    # Trend discovery and analysis
│   │   ├── SignalDetailModal.jsx     # Detailed signal information
│   │   ├── VoiceProfileSetup.jsx     # Style DNA configuration
│   │   └── PlatformSelector.jsx      # Platform selection component
│   ├── services/
│   │   └── superiorAIService.js      # AI content generation service
│   ├── App.jsx                       # Main application component
│   ├── App.css                       # Base application styles
│   ├── scholarly-theme.css           # Scholarly parchment theme
│   └── main.jsx                      # Application entry point
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
└── vite.config.js                   # Vite configuration
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd autorizz-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file with your OpenAI API key
   echo "VITE_OPENAI_API_KEY=your_api_key_here" > .env
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Fonts
To customize the typography, edit the font-family declarations in `src/scholarly-theme.css`:

```css
:root {
  --font-primary: 'Your-Font-Here', Georgia, serif;
  --font-secondary: 'Your-Secondary-Font', sans-serif;
}
```

### Colors
The scholarly color palette can be customized in the CSS variables:

```css
:root {
  --parchment-bg: #f4f1e8;
  --ink-dark: #2c3e50;
  --accent-burgundy: #8b4513;
  --accent-sage: #87a96b;
  /* ... more color variables */
}
```

### Themes
The application supports multiple themes. To create a new theme:

1. Create a new CSS file (e.g., `modern-theme.css`)
2. Define your color palette and styling
3. Import it in `App.jsx` instead of `scholarly-theme.css`

## 🔧 Configuration

### AI Service Configuration
Edit `src/services/superiorAIService.js` to:
- Adjust content generation prompts
- Modify platform-specific optimizations
- Update hook pools and content strategies
- Configure processing timeframes

### Platform Settings
Platform-specific configurations can be found in:
- `ContentGenerator.jsx` - Platform selection and UI
- `superiorAIService.js` - Platform-specific generation logic

## 📊 Content Generation

### Supported Platforms
- **Twitter:** Optimized for engagement, hashtags, and character limits
- **LinkedIn:** Professional tone, industry insights, thought leadership
- **Reddit:** Community-specific language, authentic discussions
- **YouTube:** Video descriptions, engaging titles, SEO optimization
- **Instagram:** Visual storytelling, hashtag strategies
- **TikTok:** Trend-aware, Gen Z language, viral potential
- **Blog Posts:** SEO-optimized, comprehensive structure, meta descriptions

### Content Quality Features
- **Unique hooks** for every piece of content
- **Platform-specific optimization** for maximum engagement
- **Authentic voice matching** through Style DNA
- **Science-based information** from trustworthy sources
- **Sub-15 second generation** with real-time progress tracking

## 🚀 Deployment

### Static Hosting
The application builds to static files and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Build Command
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software. All rights reserved.

## 🔗 Links

- **Live Application:** [AutoRizz.bet](https://autorizz.bet)
- **Documentation:** See this README
- **Support:** Contact the development team

## 🎯 Roadmap

- [ ] Advanced analytics and performance tracking
- [ ] Team collaboration features
- [ ] Content calendar integration
- [ ] Advanced AI model fine-tuning
- [ ] Mobile application
- [ ] API for third-party integrations

---

**AutoRizz.bet** - Transforming scattered thoughts into engaging, platform-optimized content with scholarly sophistication and AI-powered intelligence.

