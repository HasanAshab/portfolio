import HeroContent from '../sub/HeroContent'

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <HeroContent />
    </section>
  )
}

export default Hero
