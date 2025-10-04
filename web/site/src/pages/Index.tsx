import HeroSection from "@/components/HeroSection";
import DataVisualization from "@/components/DataVisualization";
import { sampleExoplanets } from "@/data/sampleExoplanets";
import { useView } from "@/contexts/ViewContext";

const Index = () => {
  const { viewMode } = useView();

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {viewMode === 'kids' ? (
        <>
          <section className="py-16 px-4 bg-gradient-to-b from-background to-accent/5">
            <div className="container mx-auto max-w-6xl space-y-16">
              {/* Introducción */}
              <div className="text-center space-y-6 animate-fade-in">
                <h2 className="text-4xl font-bold glow-text">¿Qué son los Exoplanetas? 🪐</h2>
                <p className="text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
                  Los exoplanetas son planetas que están fuera de nuestro Sistema Solar, 
                  girando alrededor de otras estrellas en el universo. ¡Hay miles de ellos 
                  esperando ser descubiertos!
                </p>
              </div>

              {/* Video educativo */}
              <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="card-cosmic p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-center">🎬 ¿Cómo encontramos exoplanetas?</h3>
                  <div className="aspect-video bg-accent/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/FMWW8u_ijW0"
                      title="Exoplanets Explained"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Métodos de detección */}
              <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                <div className="card-cosmic p-6 space-y-4 hover-scale">
                  <div className="text-4xl text-center">🔭</div>
                  <h3 className="text-xl font-bold text-center">Método del Tránsito</h3>
                  <p className="text-muted-foreground">
                    ¡Es como cuando pasa un pájaro frente al sol! Cuando un planeta pasa 
                    delante de su estrella, la luz de la estrella se hace un poquito más 
                    débil. ¡Así sabemos que hay un planeta ahí!
                  </p>
                </div>

                <div className="card-cosmic p-6 space-y-4 hover-scale">
                  <div className="text-4xl text-center">🎯</div>
                  <h3 className="text-xl font-bold text-center">Velocidad Radial</h3>
                  <p className="text-muted-foreground">
                    Las estrellas y planetas bailan juntos en el espacio. Cuando un planeta 
                    grande gira alrededor de una estrella, hace que la estrella se mueva 
                    un poquito. ¡Podemos medir ese movimiento!
                  </p>
                </div>

                <div className="card-cosmic p-6 space-y-4 hover-scale">
                  <div className="text-4xl text-center">🌟</div>
                  <h3 className="text-xl font-bold text-center">Telescopio James Webb</h3>
                  <p className="text-muted-foreground">
                    ¡Es el telescopio espacial más poderoso! Puede ver cosas súper lejanas 
                    y detectar qué gases hay en otros planetas. ¡Está en el espacio tomando 
                    fotos increíbles!
                  </p>
                </div>

                <div className="card-cosmic p-6 space-y-4 hover-scale">
                  <div className="text-4xl text-center">🛰️</div>
                  <h3 className="text-xl font-bold text-center">NEOSSat</h3>
                  <p className="text-muted-foreground">
                    Es un satélite canadiense que busca asteroides y también ayuda a 
                    encontrar exoplanetas. ¡Es como un guardián espacial que vigila 
                    objetos cerca de la Tierra!
                  </p>
                </div>
              </div>

              {/* Estadísticas simples */}
              <div className="card-cosmic p-8 space-y-6 animate-fade-in">
                <h3 className="text-3xl font-bold text-center glow-text">📊 Datos Divertidos</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2 p-4 bg-primary/10 rounded-lg">
                    <div className="text-4xl font-bold text-primary">5,000+</div>
                    <div className="text-sm text-muted-foreground">Exoplanetas descubiertos</div>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-accent/10 rounded-lg">
                    <div className="text-4xl font-bold text-accent">3,000+</div>
                    <div className="text-sm text-muted-foreground">Sistemas planetarios</div>
                  </div>
                  <div className="text-center space-y-2 p-4 bg-primary/10 rounded-lg">
                    <div className="text-4xl font-bold text-primary">800+</div>
                    <div className="text-sm text-muted-foreground">Con múltiples planetas</div>
                  </div>
                </div>
              </div>

              {/* Video adicional */}
              <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="card-cosmic p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-center">🚀 El Telescopio James Webb</h3>
                  <div className="aspect-video bg-accent/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/EpZNPjryANw"
                      title="James Webb Space Telescope"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Gráficas simplificadas */}
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-center glow-text mb-8">🎨 Gráficas Coloridas</h3>
                <DataVisualization data={sampleExoplanets} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <DataVisualization data={sampleExoplanets} />
      )}
      
      <footer className="py-8 border-t border-border mt-16">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>Explorador de Exoplanetas - Datos científicos para investigadores</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
