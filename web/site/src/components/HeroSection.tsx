import { Telescope } from "lucide-react";
import cosmicHero from "@/assets/cosmic-hero.jpg";
import { useView } from "@/contexts/ViewContext";
  
const HeroSection = () => {
  const { viewMode } = useView();

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${cosmicHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 animate-glow-pulse">
            <Telescope className="w-16 h-16 text-primary" />
          </div>
        </div>
        
        {viewMode === "kids" ? (
          <>
            <h1 className="glow-text mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ¡Explora Exoplanetas!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Descubre planetas lejanos y aprende sobre el espacio de forma divertida. ¡Aventúrate más allá de nuestro sistema solar!
            </p>
          </>
        ) : (
          <>
            <h1 className="glow-text mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Explorador Avanzado de Exoplanetas con IA/ML
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Analiza datos de exoplanetas, visualiza patrones de descubrimiento y accede a características detalladas para investigación científica avanzada.
            </p>
          </>
        )}
        
        <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
          <div className="px-6 py-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <span className="text-primary font-bold">10,000+</span> Exoplanetas Descubiertos
          </div>
          <div className="px-6 py-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <span className="text-accent font-bold">4,000+</span> Sistemas Planetarios
          </div>
          <div className="px-6 py-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <span className="text-primary font-bold">Múltiples</span> Métodos de Detección
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
