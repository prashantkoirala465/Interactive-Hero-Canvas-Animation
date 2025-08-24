# Doze Studio - Interactive Canvas Animation

A sophisticated, frame-by-frame animation system for the Doze Studio website, featuring scroll-triggered animations and professional-grade JavaScript architecture.

## 🚀 Project Overview

This project demonstrates advanced frontend development techniques including:
- **Frame-by-frame animation system** with 1345+ image frames
- **Scroll-triggered animations** using GSAP ScrollTrigger
- **Canvas-based rendering** with proper scaling and centering
- **Professional JavaScript architecture** following senior software engineering best practices

## 📁 Project Structure

```
Doze-Studio-Practise/
├── images/                 # Animation frames (1345+ JPEG files)
│   ├── frame_0001.jpeg
│   ├── frame_0002.jpeg
│   └── ... (frame_0001.jpeg to frame_1345.jpeg)
├── index.html             # Main HTML file
├── script.js              # Refactored JavaScript application
└── README.md              # This documentation
```

## 🏗️ Architecture Highlights

### Modular Design
- **IIFE (Immediately Invoked Function Expression)** for encapsulation
- **ES6+ Class-based architecture** with `DozeStudioAnimation` class
- **Configuration-driven approach** with centralized constants
- **Separation of concerns** with dedicated methods for each responsibility

### Professional Code Quality
- **Comprehensive error handling** with graceful fallbacks
- **Input validation** and boundary checking
- **Consistent naming conventions** (camelCase, descriptive names)
- **JSDoc documentation** for all public methods
- **Strict mode** enforcement (`'use strict'`)

### Performance Optimizations
- **Efficient image preloading** with progress tracking
- **Canvas optimization** with proper image smoothing
- **Event listener management** with proper binding
- **Memory management** through proper cleanup

## 🔧 Key Features

### Animation System
- **Frame progression** synchronized with scroll position
- **Smooth transitions** between animation states
- **Responsive canvas rendering** with proper aspect ratio handling
- **Scroll-triggered animations** for UI elements

### Canvas Management
- **Dynamic resizing** on window resize events
- **Image scaling** with maintain-aspect-ratio logic
- **Centered positioning** for optimal visual presentation
- **High-quality rendering** with image smoothing enabled

### Error Handling
- **Graceful degradation** when dependencies are missing
- **Comprehensive logging** for debugging and monitoring
- **Fallback behaviors** for critical failures
- **User-friendly error messages**

## 🛠️ Technical Implementation

### Dependencies
- **GSAP (GreenSock)** - Professional animation library
- **ScrollTrigger** - Scroll-based animation triggers
- **Locomotive Scroll** - Smooth scrolling implementation
- **Tailwind CSS** - Utility-first CSS framework

### Browser Support
- **Modern browsers** with ES6+ support
- **Canvas API** compatibility
- **CSS Grid/Flexbox** support
- **Responsive design** principles


### Maintainability Features
- **Configuration constants** for easy customization
- **Modular method structure** for easy testing
- **Clear separation** of concerns
- **Comprehensive documentation** with JSDoc
- **Consistent code style** and formatting

### Testing & Debugging
- **Console logging** for development debugging
- **Error tracking** with detailed error messages
- **Performance monitoring** capabilities
- **State inspection** methods for debugging

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd Doze-Studio-Practise
   ```

2. **Open in browser**
   - Serve the files through a local web server
   - Open `index.html` in a modern browser
   - Ensure all image files are present in the `images/` directory

3. **Development setup**
   - Use a local development server (e.g., Live Server VS Code extension)
   - Monitor browser console for any errors
   - Test responsive behavior across different screen sizes

## 🔍 Customization

### Animation Timing
Modify the `CONFIG` object in `script.js`:
```javascript
const CONFIG = {
    FRAME_MAX_INDEX: 1345,           // Total number of frames
    ANIMATION_SCRUB_DURATION: 3,     // Animation smoothness
    CANVAS_SCALE_FACTOR: 0.5,       // Canvas scaling values
    // ... other configuration options
};
```

### Animation Sequences
Customize the timeline in the `buildAnimationTimeline` method:
```javascript
timeline
    .to(this.frames, this.createFrameUpdate(100), TIMELINE_LABELS.FIRST)
    .to(SELECTORS.ANIMATE1, { opacity: 0, ease: 'linear' }, TIMELINE_LABELS.FIRST)
    // ... add more animation sequences
```

## 📖 API Reference

### Public Methods
- `loadFrame(index)` - Manually load a specific frame
- `getCurrentFrame()` - Get current animation state
- `resizeCanvas()` - Force canvas resize

### Event Handling
- **Window resize** - Automatic canvas resizing
- **Scroll events** - GSAP ScrollTrigger integration
- **Image loading** - Progress tracking and error handling

## 🎯 Performance Considerations

- **Image optimization** - Ensure JPEG files are properly compressed
- **Memory management** - Large numbers of images require careful memory handling
- **Scroll performance** - Smooth scrolling with large content areas
- **Canvas rendering** - Optimized for 60fps performance

## 🔮 Future Enhancements

- **WebGL rendering** for better performance
- **Lazy loading** for image frames
- **Animation presets** for different use cases
- **Performance analytics** and monitoring
- **Accessibility improvements** for screen readers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Prashant Koirala** 

---

*Built with modern web technologies.*
