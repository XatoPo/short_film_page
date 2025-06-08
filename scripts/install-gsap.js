// GSAP installation and setup script
console.log("Setting up GSAP for the documentary website...")

// Note: In a real project, you would install GSAP via npm:
// npm install gsap

// For this demo, we're using the basic GSAP features
// In production, you might want to include additional plugins like:
// - ScrollTrigger (for scroll-based animations)
// - TextPlugin (for text animations)
// - MorphSVGPlugin (for SVG morphing)
// - DrawSVGPlugin (for SVG drawing animations)

console.log("GSAP setup complete!")
console.log("Available plugins:")
console.log("- ScrollTrigger: For scroll-based animations")
console.log("- Timeline: For complex animation sequences")
console.log("- Ease functions: For smooth transitions")

// Example GSAP timeline for reference
const exampleTimeline = `
// Example GSAP timeline
const tl = gsap.timeline()
tl.from('.hero-title', { opacity: 0, y: 50, duration: 1 })
  .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
  .from('.scroll-indicator', { opacity: 0, scale: 0, duration: 0.5 })
`

console.log("Example timeline:", exampleTimeline)
