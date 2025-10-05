import React, { useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart, ComposedChart
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target, Activity, TrendingUp, Brain, Zap, Eye, BarChart3,
  AlertCircle, Layers, GitCompare, PieChart as PieChartIcon
} from 'lucide-react';
import { useView } from '@/contexts/ViewContext';

const MODELS = ['LightGBM', 'XGBoost', 'Random Forest', 'AdaBoost', 'ExoMiner'];
const COLORS = {
  'LightGBM': 'hsl(263 70% 50%)',
  'XGBoost': 'hsl(280 80% 60%)',
  'Random Forest': 'hsl(200 80% 50%)',
  'AdaBoost': 'hsl(30 80% 55%)',
  'ExoMiner': 'hsl(120 60% 50%)'
};

const DL_MODELS = ['StellarNet', 'PlanetaryNet', 'TransitNet'];
const DL_COLORS = {
  'StellarNet': 'hsl(10 80% 55%)',
  'PlanetaryNet': 'hsl(220 80% 60%)',
  'TransitNet': 'hsl(280 70% 55%)'
};

const PerformanceCharts: React.FC = () => {
  const { viewMode } = useView();

  // 1. Performance Metrics Data
  const metricsData = useMemo(() => {
    return MODELS.map(model => ({
      model,
      Precision: 0.88 + Math.random() * 0.1,
      Recall: 0.85 + Math.random() * 0.12,
      F1: 0.86 + Math.random() * 0.11,
      Accuracy: 0.90 + Math.random() * 0.08,
      AUC: 0.92 + Math.random() * 0.07
    })).map(d => ({
      ...d,
      Precision: parseFloat(d.Precision.toFixed(3)),
      Recall: parseFloat(d.Recall.toFixed(3)),
      F1: parseFloat(d.F1.toFixed(3)),
      Accuracy: parseFloat(d.Accuracy.toFixed(3)),
      AUC: parseFloat(d.AUC.toFixed(3))
    }));
  }, []);

// 2. ROC Curve Data
const rocData = useMemo(() => {
    const data: any[] = [];
    for (let i = 0; i <= 100; i++) {
        const fpr = i / 100;
        const point: any = { fpr };

        MODELS.forEach(model => {
            // Generate ROC curves with sharper rise for better performance
            const auc = metricsData.find(m => m.model === model)?.AUC || 0.9;
            // Lower exponent for higher AUC, so curve rises faster
            const exponent = Math.max(0.5, 1.5 - auc); // e.g. auc=0.95 -> exponent~0.55
            const tpr = Math.pow(fpr, exponent);
            point[model] = parseFloat(Math.min(tpr, 1).toFixed(4));
        });

        data.push(point);
    }
    return data;
}, [metricsData]);

  // 3. Confusion Matrix Data
  const confusionMatrices = useMemo(() => {
    return MODELS.map(model => {
      const total = 1000;
      const accuracy = metricsData.find(m => m.model === model)?.Accuracy || 0.9;
      const tp = Math.floor(total * 0.4 * accuracy);
      const tn = Math.floor(total * 0.6 * accuracy);
      const fn = Math.floor(total * 0.4 * (1 - accuracy));
      const fp = total - tp - tn - fn;

      return {
        model,
        data: [
          { actual: 'Positive', predicted: 'Positive', value: tp, label: 'TP' },
          { actual: 'Positive', predicted: 'Negative', value: fn, label: 'FN' },
          { actual: 'Negative', predicted: 'Positive', value: fp, label: 'FP' },
          { actual: 'Negative', predicted: 'Negative', value: tn, label: 'TN' }
        ]
      };
    });
  }, [metricsData]);

  // 4. Calibration Curves
  const calibrationData = useMemo(() => {
    const data: any[] = [];
    for (let i = 0; i <= 10; i++) {
      const predicted = i / 10;
      const point: any = { predicted, perfect: predicted };
      
      MODELS.forEach(model => {
        const noise = (Math.random() - 0.5) * 0.15;
        point[model] = parseFloat(Math.max(0, Math.min(1, predicted + noise)).toFixed(3));
      });
      
      data.push(point);
    }
    return data;
  }, []);

  // 5. Feature Importance
  const featureImportance = useMemo(() => {
    const features = [
      'koi_model_snr',
      'ror_dor_ratio',
      'koi_period',
      'koi_teq',
      'koi_dicco_msky',
      'koi_duration',
      'koi_depth',
      'koi_prad'
    ];

    return features.map((feature, idx) => ({
      feature,
      importance: parseFloat((Math.random() * 0.3 + (8 - idx) * 0.05).toFixed(3))
    })).sort((a, b) => b.importance - a.importance);
  }, []);

  // 6. Performance Radar
  const radarData = useMemo(() => {
    return ['Precision', 'Recall', 'F1', 'Accuracy', 'AUC'].map(metric => {
      const point: any = { metric };
      MODELS.forEach(model => {
        const value = metricsData.find(m => m.model === model)?.[metric as keyof typeof metricsData[0]];
        point[model] = typeof value === 'number' ? value : 0;
      });
      return point;
    });
  }, [metricsData]);

  // 7. Threshold Analysis
  const thresholdData = useMemo(() => {
    const data: any[] = [];
    for (let i = 0; i <= 100; i++) {
      const threshold = i / 100;
      data.push({
        threshold,
        precision: parseFloat((0.5 + 0.4 * threshold + Math.random() * 0.1).toFixed(3)),
        recall: parseFloat((0.95 - 0.6 * threshold + Math.random() * 0.05).toFixed(3)),
        f1: parseFloat((0.75 - 0.2 * Math.abs(threshold - 0.5)).toFixed(3))
      });
    }
    return data;
  }, []);

  // 8. Probability Distributions
  const probabilityData = useMemo(() => {
    const data: any[] = [];
    for (let i = 0; i <= 100; i++) {
      const prob = i / 100;
      data.push({
        probability: prob,
        positive: parseFloat((Math.exp(-Math.pow(prob - 0.75, 2) / 0.05) * 100).toFixed(2)),
        negative: parseFloat((Math.exp(-Math.pow(prob - 0.25, 2) / 0.05) * 100).toFixed(2))
      });
    }
    return data;
  }, []);

  // 9. Deep Learning Training Curves
  const trainingCurves = useMemo(() => {
    return DL_MODELS.map(model => {
      const epochs = Array.from({ length: 50 }, (_, i) => {
        const epoch = i + 1;
        const trainLoss = 0.8 * Math.exp(-epoch / 15) + 0.1 + Math.random() * 0.05;
        const valLoss = 0.85 * Math.exp(-epoch / 18) + 0.12 + Math.random() * 0.06;
        return {
          epoch,
          trainLoss: parseFloat(trainLoss.toFixed(4)),
          valLoss: parseFloat(valLoss.toFixed(4))
        };
      });
      return { model, data: epochs };
    });
  }, []);

  // 10. P-P Plot Data
  const ppPlotData = useMemo(() => {
    const data: any[] = [];
    for (let i = 0; i <= 100; i++) {
      const theoretical = i / 100;
      data.push({
        theoretical,
        observed: parseFloat((theoretical + (Math.random() - 0.5) * 0.1).toFixed(3)),
        perfect: theoretical
      });
    }
    return data;
  }, []);

  // 11. Correlation Analysis
  const correlationData = useMemo(() => {
    const metrics = ['Precision', 'Recall', 'F1', 'Accuracy', 'AUC'];
    const data: any[] = [];
    
    metrics.forEach(metric1 => {
      metrics.forEach(metric2 => {
        const correlation = metric1 === metric2 ? 1 : 0.5 + Math.random() * 0.4;
        data.push({
          metric1,
          metric2,
          correlation: parseFloat(correlation.toFixed(2))
        });
      });
    });
    
    return data;
  }, []);

  // 12. ExoMiner Explainability
  const exoMinerExplainability = useMemo(() => {
    return DL_MODELS.map(model => ({
      model,
      features: [
        { name: 'Stellar Params', importance: 0.1, confidence: 0.92 },
        { name: 'Transit Signal', importance: 0.407, confidence: 0.88 },
        { name: 'Orbital Dynamics', importance: 0.302, confidence: 0.85 },
        { name: 'Light Curve Shape', importance: 0.191, confidence: 0.90 }
      ].map(f => ({
        ...f,
        importance: parseFloat((f.importance + (Math.random() - 0.5) * 0.1).toFixed(3)),
        confidence: parseFloat((f.confidence + (Math.random() - 0.5) * 0.05).toFixed(3))
      }))
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="card-cosmic w-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">
                {viewMode === 'kids' 
                  ? '¿Qué tan bien funcionan los modelos?' 
                  : 'Model Performance Evaluation'
                }
              </CardTitle>
              <CardDescription>
                {viewMode === 'kids'
                  ? 'Comparamos diferentes modelos de computadora para ver cuál es el mejor en encontrar planetas'
                  : 'Comprehensive analysis of machine learning models: LightGBM, XGBoost, Random Forest, AdaBoost, and ExoMiner ensemble'
                }
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roc">ROC & Curves</TabsTrigger>
          <TabsTrigger value="confusion">Confusion</TabsTrigger>
          <TabsTrigger value="calibration">Calibration</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="dl">Deep Learning</TabsTrigger>
        </TabsList>

        {/* 1. Overview Tab - Performance Metrics & Radar */}
        <TabsContent value="overview" className="space-y-6">
          {/* Performance Metrics Bar Chart */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <CardTitle>Performance Metrics Comparison</CardTitle>
              </div>
              <CardDescription>
                {viewMode === 'kids' 
                  ? 'Calificaciones de cada modelo - ¡más alto es mejor!' 
                  : 'Key performance indicators across all models'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    dataKey="model" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    domain={[0, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                    formatter={(value: any) => parseFloat(value).toFixed(3)}
                  />
                  <Legend />
                  <Bar dataKey="Precision" fill="hsl(263 70% 50%)" />
                  <Bar dataKey="Recall" fill="hsl(280 80% 60%)" />
                  <Bar dataKey="F1" fill="hsl(200 80% 50%)" />
                  <Bar dataKey="Accuracy" fill="hsl(30 80% 55%)" />
                  <Bar dataKey="AUC" fill="hsl(120 60% 50%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Radar Chart */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <CardTitle>Performance Radar Chart</CardTitle>
              </div>
              <CardDescription>
                Multi-dimensional performance comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(230 25% 18%)" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 1]} 
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                  />
                  {MODELS.map(model => (
                    <Radar
                      key={model}
                      name={model}
                      dataKey={model}
                      stroke={COLORS[model as keyof typeof COLORS]}
                      fill={COLORS[model as keyof typeof COLORS]}
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  ))}
                  <Legend />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Probability Distributions */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <PieChartIcon className="w-5 h-5 text-primary" />
                <CardTitle>Probability Distributions</CardTitle>
              </div>
              <CardDescription>
                Distribution of predicted probabilities for positive and negative classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={probabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    dataKey="probability" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Predicted Probability', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Density', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="positive" 
                    stackId="1" 
                    stroke="hsl(120 60% 50%)" 
                    fill="hsl(120 60% 50%)" 
                    fillOpacity={0.6}
                    name="Confirmed Exoplanets"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="negative" 
                    stackId="2" 
                    stroke="hsl(0 72% 51%)" 
                    fill="hsl(0 72% 51%)" 
                    fillOpacity={0.6}
                    name="False Positives"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. ROC & Curves Tab */}
        <TabsContent value="roc" className="space-y-6">
          {/* ROC Comparison */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle>ROC Curve Comparison</CardTitle>
              </div>
              <CardDescription>
                {viewMode === 'kids'
                  ? 'Esta curva muestra qué tan bien cada modelo separa los planetas reales de los falsos'
                  : 'Receiver Operating Characteristic curves showing model discrimination ability'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={rocData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    dataKey="fpr" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
                    domain={[0, 1]}
                  />
                  <YAxis 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                    domain={[0, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Legend />
                  {MODELS.map(model => (
                    <Line
                      key={model}
                      type="monotone"
                      dataKey={model}
                      stroke={COLORS[model as keyof typeof COLORS]}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                  <Line
                    type="monotone"
                    dataKey="fpr"
                    stroke="hsl(220 9% 55%)"
                    strokeDasharray="5 5"
                    dot={false}
                    name="Random Classifier"
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* AUC Scores */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                {metricsData.map(m => (
                  <div 
                    key={m.model}
                    className="p-3 rounded-lg border border-border bg-card/50"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[m.model as keyof typeof COLORS] }}
                      />
                      <span className="font-semibold text-sm">{m.model}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">AUC: {m.AUC}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Threshold Analysis */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <GitCompare className="w-5 h-5 text-primary" />
                <CardTitle>Threshold Analysis</CardTitle>
              </div>
              <CardDescription>
                Impact of decision threshold on precision, recall, and F1-score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={thresholdData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    dataKey="threshold" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Classification Threshold', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
                    domain={[0, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="precision" 
                    stroke="hsl(263 70% 50%)" 
                    strokeWidth={2}
                    name="Precision"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="recall" 
                    stroke="hsl(280 80% 60%)" 
                    strokeWidth={2}
                    name="Recall"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="f1" 
                    stroke="hsl(120 60% 50%)" 
                    strokeWidth={2}
                    name="F1-Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* P-P Plot */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                <CardTitle>P-P Plot (Probability-Probability)</CardTitle>
              </div>
              <CardDescription>
                Comparison of observed vs theoretical cumulative probabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    type="number"
                    dataKey="theoretical" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Theoretical Probability', position: 'insideBottom', offset: -5 }}
                    domain={[0, 1]}
                  />
                  <YAxis 
                    type="number"
                    dataKey="observed"
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Observed Probability', angle: -90, position: 'insideLeft' }}
                    domain={[0, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Scatter 
                    data={ppPlotData} 
                    fill="hsl(280 80% 60%)"
                    name="Observed"
                  />
                  <Line
                    type="monotone"
                    dataKey="perfect"
                    data={ppPlotData}
                    stroke="hsl(0 72% 51%)"
                    strokeDasharray="5 5"
                    dot={false}
                    name="Perfect Calibration"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Confusion Matrix Tab */}
        <TabsContent value="confusion" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {confusionMatrices.map(({ model, data }) => (
              <Card key={model} className="card-cosmic">
                <CardHeader>
                  <CardTitle className="text-lg">{model}</CardTitle>
                  <CardDescription>Confusion Matrix</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {data.map((cell, idx) => (
                      <div
                        key={idx}
                        className="aspect-square flex flex-col items-center justify-center rounded-lg border-2 border-border p-4"
                        style={{
                          backgroundColor: cell.label.startsWith('T') 
                            ? 'hsl(120 60% 20%)' 
                            : 'hsl(0 72% 20%)',
                          opacity: 0.7 + (cell.value / 600) * 0.3
                        }}
                      >
                        <span className="text-2xl font-bold">{cell.value}</span>
                        <span className="text-xs text-muted-foreground mt-1">{cell.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {cell.actual.slice(0, 3)}/{cell.predicted.slice(0, 3)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Metrics derived from confusion matrix */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="font-mono">
                        {(((data[0].value + data[3].value) / 1000) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Precision:</span>
                      <span className="font-mono">
                        {((data[0].value / (data[0].value + data[2].value)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recall:</span>
                      <span className="font-mono">
                        {((data[0].value / (data[0].value + data[1].value)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Correlation Analysis */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-primary" />
                <CardTitle>Metric Correlation Analysis</CardTitle>
              </div>
              <CardDescription>
                Correlation between different performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-1">
                {correlationData.map((cell, idx) => (
                  <div
                    key={idx}
                    className="aspect-square flex items-center justify-center text-xs font-mono border border-border rounded"
                    style={{
                      backgroundColor: `hsl(${120 * cell.correlation} 60% ${30 + cell.correlation * 30}%)`,
                    }}
                    title={`${cell.metric1} vs ${cell.metric2}: ${cell.correlation}`}
                  >
                    {cell.correlation.toFixed(2)}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(0 60% 30%)' }} />
                  <span>Low (0.0)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(60 60% 45%)' }} />
                  <span>Medium (0.5)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(120 60% 60%)' }} />
                  <span>High (1.0)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Calibration Tab */}
        <TabsContent value="calibration" className="space-y-6">
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle>Calibration Curves</CardTitle>
              </div>
              <CardDescription>
                {viewMode === 'kids'
                  ? '¿Qué tan seguros están los modelos de sus predicciones?'
                  : 'Model probability calibration - how well predicted probabilities match actual outcomes'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={calibrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    dataKey="predicted" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Mean Predicted Probability', position: 'insideBottom', offset: -5 }}
                    domain={[0, 1]}
                  />
                  <YAxis 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Fraction of Positives', angle: -90, position: 'insideLeft' }}
                    domain={[0, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="perfect"
                    stroke="hsl(220 9% 55%)"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                    name="Perfect Calibration"
                  />
                  {MODELS.map(model => (
                    <Line
                      key={model}
                      type="monotone"
                      dataKey={model}
                      stroke={COLORS[model as keyof typeof COLORS]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                <h4 className="font-semibold mb-2 text-sm">
                  {viewMode === 'kids' ? '¿Qué significa esto?' : 'Interpretation Guide'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {viewMode === 'kids'
                    ? 'La línea punteada es perfecta. Si un modelo está cerca de ella, significa que cuando dice "80% seguro", realmente acierta 8 de cada 10 veces.'
                    : 'Models closer to the diagonal line are better calibrated. A well-calibrated model\'s predicted probabilities match the observed frequencies.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <CardTitle>Feature Importance</CardTitle>
              </div>
              <CardDescription>
                {viewMode === 'kids'
                  ? '¿Qué pistas son las más importantes para encontrar planetas?'
                  : 'Relative importance of features in model predictions (averaged across tree-based models)'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart 
                  data={featureImportance} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    type="number"
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    label={{ value: 'Importance Score', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="feature" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                    width={110}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                    {featureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${280 - index * 30} 70% 50%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Feature Descriptions */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {featureImportance.slice(0, 4).map((f, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: `hsl(${280 - idx * 30} 70% 50%)` }}
                      />
                      <span className="font-semibold text-sm">{f.feature}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {f.feature === 'koi_model_snr' && 'Signal-to-noise ratio of the transit signal'}
                      {f.feature === 'ror_dor_ratio' && 'Ratio of planetary to stellar radius over orbital distance'}
                      {f.feature === 'koi_period' && 'Orbital period in days'}
                      {f.feature === 'koi_teq' && 'Equilibrium temperature of the planet'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. Deep Learning Tab */}
        <TabsContent value="dl" className="space-y-6">
          {/* ExoMiner Overview */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl">ExoMiner Ensemble Architecture</CardTitle>
              </div>
              <CardDescription>
                {viewMode === 'kids'
                  ? 'ExoMiner es como tener 3 expertos trabajando juntos, cada uno mirando algo diferente'
                  : 'Deep learning ensemble combining three specialized neural networks'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DL_MODELS.map((model, idx) => (
                  <div 
                    key={model}
                    className="p-4 rounded-lg border-2 border-border bg-card/50"
                    style={{ borderColor: DL_COLORS[model as keyof typeof DL_COLORS] }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Layers className="w-5 h-5" style={{ color: DL_COLORS[model as keyof typeof DL_COLORS] }} />
                      <h3 className="font-bold">{model}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {model === 'StellarNet' && (viewMode === 'kids' 
                        ? 'Experto en estudiar las estrellas y sus características' 
                        : 'Analyzes stellar parameters and host star characteristics')}
                      {model === 'PlanetaryNet' && (viewMode === 'kids'
                        ? 'Experto en estudiar cómo es el planeta (tamaño, temperatura)'
                        : 'Focuses on planetary properties and orbital dynamics')}
                      {model === 'TransitNet' && (viewMode === 'kids'
                        ? 'Experto en analizar la forma de la curva de luz del tránsito'
                        : 'Specializes in transit light curve shape analysis')}
                    </p>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <p>• Layers: {8 + idx * 2}</p>
                      <p>• Parameters: {(1.2 + idx * 0.3).toFixed(1)}M</p>
                      <p>• Input: {['Stellar features', 'Orbital features', 'Light curve'][idx]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Curves */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trainingCurves.map(({ model, data }) => (
              <Card key={model} className="card-cosmic">
                <CardHeader>
                  <CardTitle className="text-lg">{model} Training</CardTitle>
                  <CardDescription>Loss vs Epoch</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                      <XAxis 
                        dataKey="epoch" 
                        stroke="hsl(213 31% 91%)"
                        tick={{ fill: 'hsl(220 9% 55%)', fontSize: 10 }}
                        label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fontSize: 11 }}
                      />
                      <YAxis 
                        stroke="hsl(213 31% 91%)"
                        tick={{ fill: 'hsl(220 9% 55%)', fontSize: 10 }}
                        label={{ value: 'Loss', angle: -90, position: 'insideLeft', fontSize: 11 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(230 30% 10%)', 
                          border: '1px solid hsl(230 25% 18%)',
                          borderRadius: '0.75rem',
                          fontSize: '11px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="trainLoss" 
                        stroke={DL_COLORS[model as keyof typeof DL_COLORS]} 
                        strokeWidth={2}
                        dot={false}
                        name="Training Loss"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valLoss" 
                        stroke="hsl(30 80% 55%)" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Validation Loss"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ExoMiner Explainability */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-primary" />
                <CardTitle>Model Explainability & Feature Attribution</CardTitle>
              </div>
              <CardDescription>
                {viewMode === 'kids'
                  ? '¿En qué se fija cada experto para tomar su decisión?'
                  : 'Understanding what each neural network component focuses on during classification'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {exoMinerExplainability.map(({ model, features }) => (
                  <div key={model} className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: DL_COLORS[model as keyof typeof DL_COLORS] }}
                      />
                      <h4 className="font-semibold">{model}</h4>
                    </div>
                    
                    {features.map((feature, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{feature.name}</span>
                          <span className="font-mono text-muted-foreground">
                            {(feature.importance * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${feature.importance * 100}%`,
                              backgroundColor: DL_COLORS[model as keyof typeof DL_COLORS]
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Confidence: {(feature.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                <h4 className="font-semibold mb-2 text-sm flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Ensemble Decision Process</span>
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {viewMode === 'kids'
                    ? 'Los 3 expertos votan juntos. Si todos están de acuerdo, la predicción es más confiable.'
                    : 'The final ExoMiner prediction combines outputs from all three networks using weighted voting based on confidence scores.'
                  }
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 rounded bg-card">
                    <div className="font-semibold">StellarNet</div>
                    <div className="text-muted-foreground">Weight: 0.35</div>
                  </div>
                  <div className="text-center p-2 rounded bg-card">
                    <div className="font-semibold">PlanetaryNet</div>
                    <div className="text-muted-foreground">Weight: 0.30</div>
                  </div>
                  <div className="text-center p-2 rounded bg-card">
                    <div className="font-semibold">TransitNet</div>
                    <div className="text-muted-foreground">Weight: 0.35</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceCharts;