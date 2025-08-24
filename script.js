/**
 * Doze Studio - Interactive Canvas Animation Controller
 * 
 * This module handles the frame-by-frame animation system for the Doze Studio website,
 * managing image preloading, canvas rendering, and scroll-triggered animations.
 * 
 * @author Prashant Koirala
 * @version 1.0.0
 * @license MIT
 */

(function() {
    'use strict';

    // Configuration constants
    const CONFIG = {
        FRAME_PADDING: 4,
        FRAME_MAX_INDEX: 1345,
        ANIMATION_SCRUB_DURATION: 3,
        HEADING_ANIMATION_SCRUB: 2,
        CANVAS_SCALE_FACTOR: 0.5,
        PANELISM_SCALE_FACTOR: 2,
        LINE_WIDTH_EXPANDED: 190
    };

    // Animation timeline labels
    const TIMELINE_LABELS = {
        FIRST: 'first',
        SECOND: 'second',
        THIRD: 'third',
        FOURTH: 'fourth',
        FIFTH: 'fifth',
        SIXTH: 'sixth',
        SEVENTH: 'seventh',
        EIGHTH: 'eight',
        NINTH: 'ninth',
        TENTH: 'tenth',
        ELEVENTH: 'eleventh',
        TWELFTH: 'twelveth',
        THIRTEENTH: '13th',
        FOURTEENTH: '14th',
        FIFTEENTH: '15th'
    };

    // DOM element selectors
    const SELECTORS = {
        CANVAS: 'canvas',
        PARENT: '.parent',
        ANIMATE1: '.animate1',
        ANIMATE2: '.animate2',
        ANIMATE3: '.animate3',
        PANEL: '.panel',
        PANELISM: '.panelism',
        PANELISM_SPAN: '.panelism span',
        HEADINGS: '.headings h3'
    };

    /**
     * Main application class for managing the animation system
     */
    class DozeStudioAnimation {
        constructor() {
            this.canvas = null;
            this.context = null;
            this.frames = {
                currentIndex: 0,
                maxIndex: CONFIG.FRAME_MAX_INDEX
            };
            this.images = [];
            this.imagesLoaded = 0;
            this.isInitialized = false;
            
            this.init();
        }

        /**
         * Initialize the animation system
         */
        init() {
            try {
                this.initializeCanvas();
                this.initializeLocomotiveScroll();
                this.preloadImages();
                this.setupEventListeners();
            } catch (error) {
                console.error('Failed to initialize Doze Studio Animation:', error);
                this.handleInitializationError(error);
            }
        }

        /**
         * Initialize canvas and context
         */
        initializeCanvas() {
            this.canvas = document.querySelector(SELECTORS.CANVAS);
            if (!this.canvas) {
                throw new Error('Canvas element not found');
            }

            this.context = this.canvas.getContext('2d');
            if (!this.context) {
                throw new Error('Failed to get canvas context');
            }

            // Set initial canvas dimensions
            this.resizeCanvas();
        }

        /**
         * Initialize Locomotive Scroll
         */
        initializeLocomotiveScroll() {
            if (typeof LocomotiveScroll !== 'undefined') {
                new LocomotiveScroll();
            } else {
                console.warn('Locomotive Scroll not available');
            }
        }

        /**
         * Preload all frame images
         */
        preloadImages() {
            for (let i = 1; i <= this.frames.maxIndex; i++) {
                const imageUrl = this.generateImageUrl(i);
                const img = new Image();
                
                img.onload = () => this.handleImageLoad();
                img.onerror = (error) => this.handleImageLoadError(i, error);
                
                img.src = imageUrl;
                this.images.push(img);
            }
        }

        /**
         * Generate image URL for a given frame index
         * @param {number} index - Frame index
         * @returns {string} Image URL
         */
        generateImageUrl(index) {
            const paddedIndex = index.toString().padStart(CONFIG.FRAME_PADDING, '0');
            return `./images/frame_${paddedIndex}.jpeg`;
        }

        /**
         * Handle successful image load
         */
        handleImageLoad() {
            this.imagesLoaded++;
            
            if (this.imagesLoaded === this.frames.maxIndex) {
                this.onAllImagesLoaded();
            }
        }

        /**
         * Handle image load error
         * @param {number} index - Failed frame index
         * @param {Error} error - Load error
         */
        handleImageLoadError(index, error) {
            console.warn(`Failed to load frame ${index}:`, error);
            // Continue with available images
            this.imagesLoaded++;
            
            if (this.imagesLoaded === this.frames.maxIndex) {
                this.onAllImagesLoaded();
            }
        }

        /**
         * Called when all images are loaded
         */
        onAllImagesLoaded() {
            this.isInitialized = true;
            this.loadImage(this.frames.currentIndex);
            this.startAnimation();
        }

        /**
         * Load and display a specific frame
         * @param {number} index - Frame index to display
         */
        loadImage(index) {
            if (!this.isValidFrameIndex(index)) {
                return;
            }

            const img = this.images[index];
            if (!img) {
                console.warn(`Image not available for frame ${index}`);
                return;
            }

            this.resizeCanvas();
            this.renderImage(img);
            this.frames.currentIndex = index;
        }

        /**
         * Validate frame index
         * @param {number} index - Frame index to validate
         * @returns {boolean} Whether index is valid
         */
        isValidFrameIndex(index) {
            return index >= 0 && index <= this.frames.maxIndex;
        }

        /**
         * Resize canvas to match window dimensions
         */
        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        /**
         * Render image on canvas with proper scaling and centering
         * @param {HTMLImageElement} img - Image to render
         */
        renderImage(img) {
            const { width: canvasWidth, height: canvasHeight } = this.canvas;
            
            // Calculate scaling factors
            const scaleX = canvasWidth / img.width;
            const scaleY = canvasHeight / img.height;
            const scale = Math.max(scaleX, scaleY);

            // Calculate new dimensions
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            // Calculate centering offsets
            const offsetX = (canvasWidth - newWidth) / 2;
            const offsetY = (canvasHeight - newHeight) / 2;

            // Clear canvas and render image
            this.context.clearRect(0, 0, canvasWidth, canvasHeight);
            this.context.imageSmoothingEnabled = true;
            this.context.imageSmoothingQuality = 'high';
            this.context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        }

        /**
         * Start the main animation timeline
         */
        startAnimation() {
            if (typeof gsap === 'undefined') {
                console.error('GSAP not available');
                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: SELECTORS.PARENT,
                    start: 'top top',
                    scrub: CONFIG.ANIMATION_SCRUB_DURATION
                }
            });

            this.buildAnimationTimeline(timeline);
        }

        /**
         * Build the complete animation timeline
         * @param {GSAPTimeline} timeline - GSAP timeline instance
         */
        buildAnimationTimeline(timeline) {
            // Frame progression animations
            timeline
                .to(this.frames, this.createFrameUpdate(100), TIMELINE_LABELS.FIRST)
                .to(SELECTORS.ANIMATE1, { opacity: 0, ease: 'linear' }, TIMELINE_LABELS.FIRST)
                
                .to(this.frames, this.createFrameUpdate(200), TIMELINE_LABELS.SECOND)
                .to(SELECTORS.ANIMATE2, { opacity: 1, ease: 'linear' }, TIMELINE_LABELS.SECOND)

                .to(this.frames, this.createFrameUpdate(220), TIMELINE_LABELS.THIRD)
                .to(this.frames, this.createFrameUpdate(260), TIMELINE_LABELS.FOURTH)
                .to(SELECTORS.ANIMATE2, { opacity: 0, ease: 'linear' }, TIMELINE_LABELS.FOURTH)

                .to(this.frames, this.createFrameUpdate(270), TIMELINE_LABELS.FIFTH)
                .to(SELECTORS.ANIMATE3, { opacity: 1, ease: 'linear' }, TIMELINE_LABELS.FIFTH)

                .to(this.frames, this.createFrameUpdate(330), TIMELINE_LABELS.SIXTH)
                .to(SELECTORS.ANIMATE3, { opacity: 0, ease: 'linear' }, TIMELINE_LABELS.SIXTH)

                .to(this.frames, this.createFrameUpdate(360), TIMELINE_LABELS.SEVENTH)
                .to(this.frames, this.createFrameUpdate(380), TIMELINE_LABELS.EIGHTH)
                .to(SELECTORS.PANEL, { x: '0%', ease: 'expo' }, TIMELINE_LABELS.EIGHTH)

                .to(this.frames, this.createFrameUpdate(400), TIMELINE_LABELS.NINTH)
                .to(SELECTORS.PANEL, { x: '100%', ease: 'linear' }, TIMELINE_LABELS.NINTH)

                .to(this.frames, this.createFrameUpdate(430), TIMELINE_LABELS.TENTH)
                .to(this.frames, this.createFrameUpdate(460), TIMELINE_LABELS.ELEVENTH)
                .to(SELECTORS.CANVAS, { scale: CONFIG.CANVAS_SCALE_FACTOR, ease: 'linear' }, TIMELINE_LABELS.ELEVENTH)
                
                .to(this.frames, this.createFrameUpdate(480), TIMELINE_LABELS.TWELFTH)
                .to(SELECTORS.PANELISM, { opacity: 1, ease: 'expo' }, TIMELINE_LABELS.TWELFTH)
                
                .to(this.frames, this.createFrameUpdate(500), TIMELINE_LABELS.TWELFTH)
                .to(SELECTORS.PANELISM_SPAN, { width: CONFIG.LINE_WIDTH_EXPANDED, ease: 'expo' }, TIMELINE_LABELS.TWELFTH)
                
                .to(this.frames, this.createFrameUpdate(530), TIMELINE_LABELS.THIRTEENTH)
                .to(SELECTORS.CANVAS, { scale: 1, ease: 'linear' }, TIMELINE_LABELS.THIRTEENTH)

                .to(this.frames, this.createFrameUpdate(550), TIMELINE_LABELS.FOURTEENTH)
                .to(SELECTORS.PANELISM, { scale: CONFIG.PANELISM_SCALE_FACTOR, ease: 'circ' }, TIMELINE_LABELS.FOURTEENTH)

                .to(this.frames, this.createFrameUpdate(570), TIMELINE_LABELS.FIFTEENTH)
                .to(SELECTORS.PANELISM, { scale: CONFIG.PANELISM_SCALE_FACTOR, ease: 'circ' }, TIMELINE_LABELS.FIFTEENTH);
        }

        /**
         * Create frame update animation configuration
         * @param {number} targetIndex - Target frame index
         * @returns {Object} Animation configuration object
         */
        createFrameUpdate(targetIndex) {
            return {
                currentIndex: targetIndex,
                ease: 'linear',
                onUpdate: () => {
                    this.loadImage(Math.floor(this.frames.currentIndex));
                }
            };
        }

        /**
         * Setup heading animations
         */
        setupHeadingAnimations() {
            if (typeof gsap === 'undefined') {
                return;
            }

            const headings = document.querySelectorAll(SELECTORS.HEADINGS);
            headings.forEach(heading => {
                gsap.from(heading, {
                    scrollTrigger: {
                        trigger: heading,
                        start: 'top 90%',
                        end: 'bottom 20%',
                        scrub: CONFIG.HEADING_ANIMATION_SCRUB
                    },
                    opacity: 0.3
                });
            });
        }

        /**
         * Setup event listeners
         */
        setupEventListeners() {
            window.addEventListener('resize', this.handleResize.bind(this));
            this.setupHeadingAnimations();
        }

        /**
         * Handle window resize
         */
        handleResize() {
            if (this.isInitialized) {
                this.loadImage(Math.floor(this.frames.currentIndex));
            }
        }

        /**
         * Handle initialization errors gracefully
         * @param {Error} error - Initialization error
         */
        handleInitializationError(error) {
            // Log error and potentially show user-friendly message
            console.error('Animation system failed to initialize:', error);
            
            // Could add fallback behavior here
            // e.g., show static content, disable animations, etc.
        }

        /**
         * Public method to manually load a specific frame
         * @param {number} index - Frame index to load
         */
        loadFrame(index) {
            if (this.isInitialized) {
                this.loadImage(index);
            }
        }

        /**
         * Public method to get current frame information
         * @returns {Object} Current frame state
         */
        getCurrentFrame() {
            return {
                index: this.frames.currentIndex,
                maxIndex: this.frames.maxIndex,
                isInitialized: this.isInitialized,
                imagesLoaded: this.imagesLoaded
            };
        }
    }

    // Initialize the animation system when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new DozeStudioAnimation();
        });
    } else {
        new DozeStudioAnimation();
    }

})();
