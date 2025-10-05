import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, PlayCircle, Settings, TrendingUp, Loader2 } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';
import { useState } from 'react';
import { trainModel, TrainRequest } from '@/lib/api';

interface TrainingStatus {
  isLoading: boolean;
  message: string | null;
  error: string | null;
}

const Training = () => {
  const { viewMode } = useView();
  const [trainingStates, setTrainingStates] = useState<Record<string, TrainingStatus>>({});

  const initialModels = [
    { name: 'Random Forest', accuracy: '94.2%', status: 'Entrenado', model_type: 'rf' },
    { name: 'Neural Network', accuracy: '96.8%', status: 'Entrenado', model_type: 'nn' },
    { name: 'SVM', accuracy: '92.5%', status: 'Entrenado', model_type: 'svm' },
    { name: 'XGBoost', accuracy: '95.7%', status: 'Entrenado', model_type: 'xgb' },
  ];

  const handleTrainModel = async (modelType: string, modelName: string) => {
    setTrainingStates(prev => ({
      ...prev,
      [modelName]: { isLoading: true, message: null, error: null }
    }));

    const request: TrainRequest = {
      model_type: modelType,
      params: { // Using default params for now, can be configured later
        "n_estimators": 100,
        "max_depth": 4,
        "learning_rate": 0.1
      }
    };

    try {
      const result = await trainModel(request);
      setTrainingStates(prev => ({
        ...prev,
        [modelName]: { isLoading: false, message: result.message, error: null }
      }));
    } catch (err) {
      setTrainingStates(prev => ({
        ...prev,
        [modelName]: { isLoading: false, message: null, error: err instanceof Error ? err.message : "An unknown error occurred." }
      }));
    }
  };

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
          {initialModels.map((model) => {
            const state = trainingStates[model.name] || { isLoading: false, message: null, error: null };
            return (
            <Card key={model.name} className="card-cosmic hover:border-primary/50 transition-all">
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
                    <Button size="sm" onClick={() => handleTrainModel(model.model_type, model.name)} disabled={state.isLoading}>
                      {state.isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <PlayCircle className="w-4 h-4 mr-2" />
                      )}
                      {state.isLoading ? 'Entrenando...' : 'Re-entrenar'}
                    </Button>
                  </div>
                </div>
                {state.error && <p className="text-red-500 mt-4 text-sm">{state.error}</p>}
                {state.message && <p className="text-green-400 mt-4 text-sm">{state.message}</p>}
              </CardContent>
            </Card>
          )})}
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
