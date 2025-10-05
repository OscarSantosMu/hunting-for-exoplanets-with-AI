import HeroSection from "@/components/HeroSection";
import DataVisualization from "@/components/DataVisualization";
import { sampleExoplanets } from "@/data/sampleExoplanets";
import { useView } from "@/contexts/ViewContext";
import { getHealth, getHealth2, HealthResponse, predictRealtime, PredictResponse, PredictRequest } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { viewMode } = useView();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [prediction, setPrediction] = useState<PredictResponse | null>(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkApiHealth = async () => {
    try {
      const healthStatus = await getHealth();
      setHealth(healthStatus);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setHealth(null);
    }
  };

  const checkApiHealth2 = async () => {
    try {
      const healthStatus = await getHealth2();
      setHealth(healthStatus);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setHealth(null);
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setPrediction(null);
    setPredictionError(null);

    const request: PredictRequest = {
      kicid: "KIC 8193315",
      model_type: "xgb",
      mission: "Kepler" // Assuming default mission
    };
    try {
      const result = await predictRealtime(request);
      setPrediction(result);
    } catch (err) {
      setPredictionError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto max-w-4xl py-8 space-y-8">
        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle className="glow-text">API Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Button onClick={checkApiHealth}>Refresh Status</Button>
            {error && <p className="text-red-500">Error: {error}</p>}
            {health && <p className="text-green-500 font-semibold">Health: {health.Health}</p>}
          </CardContent>
        </Card>

        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle className="glow-text">API2 Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Button onClick={checkApiHealth2}>Refresh Status</Button>
            {error && <p className="text-red-500">Error: {error}</p>}
            {health && <p className="text-green-500 font-semibold">Health: {health.Health}</p>}
          </CardContent>
        </Card>

        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle className="glow-text">Real-time Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handlePredict} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Loading..." : "Predict for KIC 8193315"}
            </Button>
            {predictionError && <p className="text-red-500 mt-4">Error: {predictionError}</p>}
            {prediction && (
              <div className="mt-4 p-4 bg-background/50 rounded text-left">
                <h3 className="text-lg font-semibold mb-2">Prediction Result:</h3>
                <pre className="whitespace-pre-wrap text-sm"><code>{JSON.stringify(prediction, null, 2)}</code></pre>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

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
                      src="https://www.youtube.com/watch?v=cB3aF47Aoxs"
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
                  <div>
                    <h4 className="text-2xl font-bold text-center glow-text mb-2">🪐¡Así se descubre un nuevo planeta!</h4>
                    <h5 className="text-center text-sm text-muted-foreground mb-4">Método del Tránsito: El paso de un planeta frente a una estrella</h5>
                  </div>
                    <div className="w-full flex justify-center items-center py-4">
                    <img
                      src="/images/Exoplanet_transit_method.gif"
                      alt="Método del tránsito de exoplanetas"
                      className="rounded-lg shadow-lg max-h-120"
                    />
                    </div>
                  <h3 className="text-2xl font-bold text-center py-2">🚀 El Telescopio James Webb</h3>
                  <h4 className="text-center text-sm text-muted-foreground mb-4">¡Nuestros ojo en el espacio!</h4>
                  <div className="aspect-video bg-accent/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/watch?v=Twv6bjNbWxk"
                      title="James Webb Space Telescope"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Gráficas simplificadas */}
              {/* <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-center glow-text mb-8">🎨 Gráficas Coloridas</h3>
                <DataVisualization data={sampleExoplanets} />
              </div> */}
            </div>
          </section>
        </>
      ) : (
        <section className="py-16 px-4 bg-gradient-to-b from-background to-accent/5">
            <div className="container mx-auto max-w-6xl space-y-16">
              <DataVisualization data={sampleExoplanets} />
            </div>
          </section>
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
