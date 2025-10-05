import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis, Line, LineChart, ReferenceLine } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Layers, Map } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';

interface DataPoint {
  x: number;
  y: number;
  cluster: number;
  name: string;
}

interface ClusterStats {
  cluster: number;
  count: number;
  color: string;
  name: string;
  slope: number;
  intercept: number;
  r2: number;
}

const ClusteringCharts: React.FC = () => {
  const { viewMode } = useView();

  // Generate clustered data points based on equilibrium temperature vs stellar mass
  const { clusterData, clusterStats } = useMemo(() => {
    const data: DataPoint[] = [];
    const stats: ClusterStats[] = [];

    // Define 4 distinct regions/clusters
    const clusters = [
      {
        id: 0,
        name: 'Hot Jupiters',
        color: 'hsl(0 72% 51%)',
        centerX: 1500,
        centerY: 1.2,
        spreadX: 400,
        spreadY: 0.3,
        count: 25,
        baseSlope: 0.0003,
        baseIntercept: 0.75
      },
      {
        id: 1,
        name: 'Warm Neptunes',
        color: 'hsl(280 80% 60%)',
        centerX: 800,
        centerY: 1.0,
        spreadX: 300,
        spreadY: 0.25,
        count: 30,
        baseSlope: 0.0002,
        baseIntercept: 0.84
      },
      {
        id: 2,
        name: 'Cold Super-Earths',
        color: 'hsl(200 80% 50%)',
        centerX: 400,
        centerY: 0.8,
        spreadX: 250,
        spreadY: 0.2,
        count: 35,
        baseSlope: 0.00025,
        baseIntercept: 0.70
      },
      {
        id: 3,
        name: 'Earth-like Zone',
        color: 'hsl(120 60% 50%)',
        centerX: 280,
        centerY: 0.95,
        spreadX: 100,
        spreadY: 0.15,
        count: 20,
        baseSlope: 0.0001,
        baseIntercept: 0.92
      }
    ];

    clusters.forEach(cluster => {
      const clusterPoints: DataPoint[] = [];

      for (let i = 0; i < cluster.count; i++) {
        // Generate points with some correlation
        const xOffset = (Math.random() - 0.5) * cluster.spreadX;
        const yOffset = (Math.random() - 0.5) * cluster.spreadY;
        
        const x = cluster.centerX + xOffset;
        const y = cluster.centerY + yOffset + (xOffset * cluster.baseSlope);

        clusterPoints.push({
          x: parseFloat(x.toFixed(1)),
          y: parseFloat(y.toFixed(3)),
          cluster: cluster.id,
          name: `${cluster.name}-${i + 1}`
        });
      }

      data.push(...clusterPoints);

      // Calculate linear regression for this cluster
      const n = clusterPoints.length;
      const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
      const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
      const sumXY = clusterPoints.reduce((sum, p) => sum + p.x * p.y, 0);
      const sumX2 = clusterPoints.reduce((sum, p) => sum + p.x * p.x, 0);
      const sumY2 = clusterPoints.reduce((sum, p) => sum + p.y * p.y, 0);

      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      
      // Calculate R² (coefficient of determination)
      const meanY = sumY / n;
      const ssTotal = sumY2 - n * meanY * meanY;
      const ssResidual = clusterPoints.reduce((sum, p) => {
        const predicted = slope * p.x + intercept;
        return sum + Math.pow(p.y - predicted, 2);
      }, 0);
      const r2 = 1 - (ssResidual / ssTotal);

      stats.push({
        cluster: cluster.id,
        count: cluster.count,
        color: cluster.color,
        name: cluster.name,
        slope: parseFloat(slope.toFixed(6)),
        intercept: parseFloat(intercept.toFixed(3)),
        r2: parseFloat(r2.toFixed(3))
      });
    });

    return { clusterData: data, clusterStats: stats };
  }, []);

  // Generate regression line points for each cluster
  const getRegressionData = (clusterId: number) => {
    const clusterPoints = clusterData.filter(p => p.cluster === clusterId);
    const stat = clusterStats.find(s => s.cluster === clusterId);
    
    if (!stat || clusterPoints.length === 0) return [];

    const minX = Math.min(...clusterPoints.map(p => p.x));
    const maxX = Math.max(...clusterPoints.map(p => p.x));

    return [
      { x: minX, y: stat.slope * minX + stat.intercept },
      { x: maxX, y: stat.slope * maxX + stat.intercept }
    ];
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const stat = clusterStats.find(s => s.cluster === data.cluster);
      
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold" style={{ color: stat?.color }}>
            {stat?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Temp: {data.x} K
          </p>
          <p className="text-sm text-muted-foreground">
            Masa: {data.y} M☉
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* General Overview Chart with All Clusters */}
      <Card className="card-cosmic">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-xl">
                {viewMode === 'kids' 
                  ? '¡Grupos de Planetas Parecidos!' 
                  : 'Cluster Analysis Overview'
                }
              </CardTitle>
              <CardDescription>
                {viewMode === 'kids'
                  ? 'Planetas con características similares agrupados por colores'
                  : 'Exoplanets grouped by temperature and stellar mass characteristics'
                }
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
              <XAxis 
                type="number"
                dataKey="x"
                name="Temperature"
                unit=" K"
                stroke="hsl(213 31% 91%)"
                tick={{ fill: 'hsl(220 9% 55%)' }}
                label={{ 
                  value: viewMode === 'kids' ? 'Temperatura (K)' : 'Equilibrium Temperature (K)', 
                  position: 'insideBottom', 
                  offset: -10,
                  style: { fill: 'hsl(220 9% 55%)' }
                }}
              />
              <YAxis 
                type="number"
                dataKey="y"
                name="Stellar Mass"
                unit=" M☉"
                stroke="hsl(213 31% 91%)"
                tick={{ fill: 'hsl(220 9% 55%)' }}
                label={{ 
                  value: viewMode === 'kids' ? 'Masa Estelar (M☉)' : 'Stellar Mass (M☉)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'hsl(220 9% 55%)' }
                }}
              />
              <ZAxis range={[100, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                height={36}
                wrapperStyle={{ paddingBottom: '20px' }}
              />
              {clusterStats.map(stat => (
                <Scatter
                  key={stat.cluster}
                  name={stat.name}
                  data={clusterData.filter(p => p.cluster === stat.cluster)}
                  fill={stat.color}
                  fillOpacity={0.6}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>

          {/* Cluster Statistics Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {clusterStats.map(stat => (
              <div 
                key={stat.cluster}
                className="p-4 rounded-lg border border-border bg-card/50"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: stat.color }}
                  />
                  <h4 className="font-semibold text-sm">{stat.name}</h4>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Planetas: {stat.count}</p>
                  <p>R² = {stat.r2}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Cluster Charts with Regression Lines */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <Map className="w-5 h-5 text-primary" />
          <h3 className="text-2xl font-bold">
            {viewMode === 'kids' 
              ? 'Análisis por Región' 
              : 'Regional Cluster Analysis'
            }
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          {viewMode === 'kids'
            ? 'Cada grupo de planetas con su línea de tendencia'
            : 'Each cluster with its corresponding regression line and statistics'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clusterStats.map(stat => {
          const clusterPoints = clusterData.filter(p => p.cluster === stat.cluster);
          const regressionLine = getRegressionData(stat.cluster);

          return (
            <Card key={stat.cluster} className="card-cosmic">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: stat.color }}
                    />
                    <CardTitle className="text-lg">{stat.name}</CardTitle>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>n = {stat.count}</div>
                    <div>R² = {stat.r2}</div>
                  </div>
                </div>
                <CardDescription>
                  y = {stat.slope.toFixed(6)}x + {stat.intercept.toFixed(3)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 40, left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                    <XAxis 
                      type="number"
                      dataKey="x"
                      name="Temperature"
                      unit=" K"
                      stroke="hsl(213 31% 91%)"
                      tick={{ fill: 'hsl(220 9% 55%)', fontSize: 11 }}
                      label={{ 
                        value: 'Temp. (K)', 
                        position: 'insideBottom', 
                        offset: -5,
                        style: { fill: 'hsl(220 9% 55%)', fontSize: 12 }
                      }}
                    />
                    <YAxis 
                      type="number"
                      dataKey="y"
                      name="Stellar Mass"
                      unit=" M☉"
                      stroke="hsl(213 31% 91%)"
                      tick={{ fill: 'hsl(220 9% 55%)', fontSize: 11 }}
                      label={{ 
                        value: 'Masa (M☉)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fill: 'hsl(220 9% 55%)', fontSize: 12 }
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Scatter points */}
                    <Scatter
                      data={clusterPoints}
                      fill={stat.color}
                      fillOpacity={0.7}
                    />
                    
                    {/* Regression line */}
                    <Scatter
                      data={regressionLine}
                      fill={stat.color}
                      line={{ stroke: stat.color, strokeWidth: 3 }}
                      shape={() => null}
                      legendType="none"
                    />
                  </ScatterChart>
                </ResponsiveContainer>

                {/* Regression Stats */}
                <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Pendiente:</span>
                      <span className="ml-2 font-mono">{stat.slope.toFixed(6)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Intercepto:</span>
                      <span className="ml-2 font-mono">{stat.intercept.toFixed(3)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">R²:</span>
                      <span className="ml-2 font-mono">{stat.r2.toFixed(3)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Muestras:</span>
                      <span className="ml-2 font-mono">{stat.count}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interpretation Guide */}
      <Card className="card-cosmic">
        <CardHeader>
          <CardTitle>
            {viewMode === 'kids' ? '¿Qué significan estos grupos?' : 'Cluster Interpretation'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            {clusterStats.map(stat => (
              <div key={stat.cluster} className="flex items-start space-x-3">
                <div 
                  className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0" 
                  style={{ backgroundColor: stat.color }}
                />
                <div>
                  <h4 className="font-semibold mb-1">{stat.name}</h4>
                  <p className="text-muted-foreground">
                    {stat.cluster === 0 && (viewMode === 'kids' 
                      ? 'Planetas gigantes muy calientes, cerca de su estrella. ¡Más calientes que un horno!' 
                      : 'Gas giants with high equilibrium temperatures, orbiting very close to their host stars.')}
                    {stat.cluster === 1 && (viewMode === 'kids'
                      ? 'Planetas medianos y tibios, como Neptuno pero más cerca de su estrella.'
                      : 'Neptune-sized planets with moderate temperatures, typically in intermediate orbits.')}
                    {stat.cluster === 2 && (viewMode === 'kids'
                      ? 'Planetas rocosos más fríos, más lejos de su estrella. ¡Podrían tener hielo!'
                      : 'Rocky super-Earth planets with lower temperatures, orbiting in outer regions.')}
                    {stat.cluster === 3 && (viewMode === 'kids'
                      ? '¡Planetas parecidos a la Tierra! Con temperatura perfecta para agua líquida.'
                      : 'Earth-like planets in the habitable zone with optimal conditions for liquid water.')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClusteringCharts;