import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, PlayCircle, Settings, TrendingUp } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';

const Training = () => {
  const { viewMode } = useView();

  const models = [
    { name: 'Random Forest', accuracy: '94.2%', status: 'Entrenado' },
    { name: 'Neural Network', accuracy: '96.8%', status: 'Entrenado' },
    { name: 'SVM', accuracy: '92.5%', status: 'Entrenado' },
    { name: 'XGBoost', accuracy: '95.7%', status: 'Entrenado' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/50">
              <Brain className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="mb-4 glow-text">
            {viewMode === 'kids' ? '¡Enseñando a la Computadora!' : 'Entrenamiento de Modelos ML'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {viewMode === 'kids' 
              ? 'La computadora aprende a reconocer exoplanetas usando matemáticas mágicas'
              : 'Configuración y entrenamiento de modelos de Machine Learning para clasificación de exoplanetas'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {models.map((model, index) => (
            <Card key={index} className="card-cosmic hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{model.name}</span>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </CardTitle>
                <CardDescription>Precisión: {model.accuracy}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estado: {model.status}</span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                    <Button size="sm">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Re-entrenar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle>Configuración de Entrenamiento</CardTitle>
            <CardDescription>
              {viewMode === 'kids' 
                ? 'Ajusta cómo la computadora aprende'
                : 'Parámetros para el entrenamiento de modelos'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Funcionalidad de entrenamiento próximamente...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Training;
