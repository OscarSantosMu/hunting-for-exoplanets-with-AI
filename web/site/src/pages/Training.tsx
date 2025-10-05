import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, PlayCircle, Settings, TrendingUp, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';
import { useState } from 'react';
import { trainModel, TrainRequest, predictRealtime, PredictRequest, PredictResponse } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface TrainingStatus {
  isLoading: boolean;
  message: string | null;
  error: string | null;
}

interface ModelParams {
  [key: string]: number | undefined;
}

const modelHyperparameters: Record<string, Record<string, number[]>> = {
  xgb: {
    n_estimators: [50, 100, 200, 300],
    max_depth: [3, 4, 5, 6],
    learning_rate: [0.01, 0.1, 0.2, 0.3],
    subsample: [0.6, 0.8, 0.9, 1.0],
    colsample_bytree: [0.6, 0.8, 0.9, 1.0],
  },
  lgbm: {
    n_estimators: [50, 100, 200, 300],
    max_depth: [3, 5, 7, -1],
    learning_rate: [0.01, 0.05, 0.1, 0.2],
    num_leaves: [20, 31, 40, 50],
  },
  nn: {
    hidden_layer_sizes: [50, 100, 150, 200],
    learning_rate_init: [0.001, 0.01, 0.05, 0.1],
    alpha: [0.0001, 0.001, 0.01, 0.1],
  },
  catboost: {
    iterations: [200, 500, 1000, 1500],
    depth: [4, 6, 8, 10],
    learning_rate: [0.01, 0.03, 0.1, 0.2],
  }
};

const Training = () => {
  const { viewMode } = useView();
  const [trainingStates, setTrainingStates] = useState<Record<string, TrainingStatus>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configuringModel, setConfiguringModel] = useState<{ name: string; type: string } | null>(null);
  const [currentParams, setCurrentParams] = useState<ModelParams>({});

  // Prediction state
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictResponse | null>(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [selectedModelForPrediction, setSelectedModelForPrediction] = useState<string>('xgb');
  const [kicId, setKicId] = useState<string>('8193315');


  const [modelParams, setModelParams] = useState<Record<string, ModelParams>>({
    'XGBoost': { n_estimators: 100, max_depth: 4, learning_rate: 0.1, subsample: 1.0, colsample_bytree: 1.0 },
    'LGBM': { n_estimators: 100, max_depth: -1, learning_rate: 0.1, num_leaves: 31 },
    'Neural Network': { hidden_layer_sizes: 100, learning_rate_init: 0.01, alpha: 0.0001 },
    'Catboost': { iterations: 1000, depth: 6, learning_rate: 0.03 },
  });

  const initialModels = [
    { name: 'XGBoost', accuracy: '95.7%', status: 'Entrenado', model_type: 'xgb' },
    { name: 'LGBM', accuracy: '96.2%', status: 'Entrenado', model_type: 'lgbm' },
    { name: 'Neural Network', accuracy: '96.8%', status: 'Entrenado', model_type: 'nn' },
    { name: 'Catboost', accuracy: '95.9%', status: 'Entrenado', model_type: 'catboost' },
  ];

  const handleOpenModal = (modelName: string, modelType: string) => {
    setConfiguringModel({ name: modelName, type: modelType });
    setCurrentParams(modelParams[modelName] || {});
    setIsModalOpen(true);
  };

  const handleParamChange = (paramName: string, valueIndex: number) => {
    if (!configuringModel) return;
    const paramValues = modelHyperparameters[configuringModel.type][paramName];
    const selectedValue = paramValues[valueIndex];
    setCurrentParams(prev => ({ ...prev, [paramName]: selectedValue }));
  };

  const handleSaveParams = () => {
    if (!configuringModel) return;
    setModelParams(prev => ({
      ...prev,
      [configuringModel.name]: currentParams,
    }));
    setIsModalOpen(false);
    setConfiguringModel(null);
  };

  const handleTrainModel = async (modelType: string, modelName: string) => {
    setTrainingStates(prev => ({
      ...prev,
      [modelName]: { isLoading: true, message: null, error: null }
    }));

    const params = modelParams[modelName] || {};
    // Filter out any undefined params
    const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);


    const request: TrainRequest = {
      model_type: modelType,
      params: filteredParams,
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

  const handlePredict = async () => {
    setIsPredicting(true);
    setPredictionResult(null);
    setPredictionError(null);

    const request: PredictRequest = {
      kicid: kicId,
      model_type: selectedModelForPrediction,
      mission: "Kepler"
    };

    try {
      const result = await predictRealtime(request);
      setPredictionResult(result);
    } catch (err) {
      setPredictionError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsPredicting(false);
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
                    <Button size="sm" variant="outline" onClick={() => handleOpenModal(model.name, model.model_type)}>
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

        {configuringModel && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Configurar {configuringModel.name}</DialogTitle>
                <DialogDescription>
                  Ajusta los hiperparámetros para el entrenamiento del modelo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {Object.entries(modelHyperparameters[configuringModel.type] || {}).map(([param, values]) => {
                  const currentValue = currentParams[param] ?? modelParams[configuringModel.name]?.[param];
                  const currentIndex = values.findIndex(v => v === currentValue);
                  
                  return (
                    <div key={param} className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={param} className="text-right col-span-1">
                        {param.replace(/_/g, ' ')}
                      </Label>
                      <div className="col-span-3 flex items-center space-x-4">
                        <Slider
                          id={param}
                          min={0}
                          max={values.length - 1}
                          step={1}
                          value={[currentIndex !== -1 ? currentIndex : 0]}
                          onValueChange={([val]) => handleParamChange(param, val)}
                          className="w-full"
                        />
                        <span className="text-sm font-medium w-16 text-center">{currentValue}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleSaveParams}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle>Predicción en Tiempo Real</CardTitle>
            <CardDescription>
              Usa un modelo entrenado para hacer una predicción para una estrella específica.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-auto">
                <Label htmlFor="kic-id-input">KIC ID</Label>
                <Input
                  id="kic-id-input"
                  value={kicId}
                  onChange={(e) => setKicId(e.target.value)}
                  placeholder="Enter KIC ID"
                  className="w-full sm:w-[180px]"
                />
              </div>
              <div className="w-full sm:w-auto">
                <Label htmlFor="model-select">Modelo</Label>
                <Select value={selectedModelForPrediction} onValueChange={setSelectedModelForPrediction}>
                  <SelectTrigger id="model-select" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialModels.map(m => (
                      <SelectItem key={m.model_type} value={m.model_type}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handlePredict} disabled={isPredicting} className="w-full sm:w-auto mt-4 sm:mt-0 self-end">
                {isPredicting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <PlayCircle className="w-4 h-4 mr-2" />
                )}
                {isPredicting ? 'Prediciendo...' : `Predecir para KIC ${kicId}`}
              </Button>
            </div>

            {predictionError && <p className="text-red-500 text-sm">{predictionError}</p>}
            
            {predictionResult && (
              <div className="space-y-4 pt-4">
                <div className={`p-6 rounded-lg text-center border ${predictionResult.prediction === 1 ? 'bg-green-900/20 border-green-400/30' : 'bg-amber-900/20 border-amber-400/30'}`}>
                  {predictionResult.prediction > 0.48 ? (
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  ) : (
                    <XCircle className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                  )}
                  <h3 className={`text-2xl font-bold ${predictionResult.prediction > 0.48 ? 'text-green-300' : 'text-amber-300'}`}>
                    {predictionResult.prediction > 0.48 ? 'Candidato a Exoplaneta' : 'No es Candidato'}
                  </h3>
                  {predictionResult.prediction_proba !== null && (
                    <p className="text-lg text-muted-foreground">
                      Confianza: {(predictionResult.prediction_proba * 100).toFixed(2)}%
                    </p>
                  )}
                </div>
                <div className="p-4 bg-background/50 rounded-md text-left">
                  <h4 className="text-md font-semibold mb-2">Respuesta Completa:</h4>
                  <pre className="whitespace-pre-wrap text-xs"><code>{JSON.stringify(predictionResult, null, 2)}</code></pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Training;