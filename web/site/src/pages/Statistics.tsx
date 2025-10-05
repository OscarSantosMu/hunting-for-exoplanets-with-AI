import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Activity, Target } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';
import { sampleExoplanets } from '@/data/sampleExoplanets';
import DataVisualization from '@/components/DataVisualization';
import TSAChart from '@/components/TSAChart';
import ClusteringCharts from '@/components/ClusteringCharts';
import PerformanceCharts from '@/components/PerformanceCharts';

const Statistics = () => {
  const { viewMode } = useView();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/50">
              <BarChart3 className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="mb-4 glow-text">
            {viewMode === 'kids' ? '¡Gráficas Coloridas!' : 'Estadísticas y Análisis'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {viewMode === 'kids' 
              ? 'Mira los datos de manera divertida con colores y formas'
              : 'Visualización avanzada de datos y métricas de rendimiento de modelos'
            }
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="toi">Señales TOI</TabsTrigger>
            <TabsTrigger value="clustering">Clustering</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <DataVisualization data={sampleExoplanets} />
          </TabsContent>

          <TabsContent value="toi" className="space-y-6">
            <Card className="card-cosmic">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <CardTitle>Señales de TOI (Tess Objects of Interest)</CardTitle>
                </div>
                <CardDescription>
                  {viewMode === 'kids' 
                    ? 'Patrones especiales que nos ayudan a encontrar planetas'
                    : 'Análisis de señales de tránsito detectadas por el telescopio TESS'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  <TSAChart 
                  toiId="TOI-700"
                  planetName="TOI-700d"
                  period={37.4}
                  transitDepth={0.003}
                  />
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clustering" className="space-y-6">
            <Card className="card-cosmic">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <CardTitle>Clustering de Curvas y Regiones</CardTitle>
                </div>
                <CardDescription>
                  {viewMode === 'kids' 
                    ? 'Agrupamos planetas parecidos para compararlos mejor'
                    : 'Agrupamiento de exoplanetas por características similares'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  <ClusteringCharts />
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div>
              <PerformanceCharts />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Statistics;
