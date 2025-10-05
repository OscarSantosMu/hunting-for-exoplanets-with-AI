import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';

interface TSADataPoint {
  time: number;
  flux: number;
  phase?: number;
}

interface TSAChartProps {
  toiId: string;
  planetName: string;
  period: number;
  transitDepth: number;
}

const TSAChart: React.FC<TSAChartProps> = ({ 
  toiId, 
  planetName, 
  period, 
  transitDepth 
}) => {
  const { viewMode } = useView();

  // Generate realistic light curve data with transit signals
  const lightCurveData = useMemo(() => {
    const dataPoints: TSADataPoint[] = [];
    const totalTime = period * 3; // Show 3 orbital periods
    const timeStep = totalTime / 200; // 200 data points
    
    for (let i = 0; i < 200; i++) {
      const time = i * timeStep;
      const phase = (time % period) / period;
      
      // Base stellar flux with some noise
      let flux = 1.0 + (Math.random() - 0.5) * 0.002; // 0.2% noise
      
      // Add transit dips
      if (phase > 0.48 && phase < 0.52) {
        // Transit ingress, egress, and bottom
        const transitPhase = (phase - 0.48) / 0.04;
        if (transitPhase < 0.2) {
          // Ingress
          flux *= 1 - (transitDepth * (transitPhase / 0.2));
        } else if (transitPhase > 0.8) {
          // Egress
          flux *= 1 - (transitDepth * ((1 - transitPhase) / 0.2));
        } else {
          // Bottom of transit
          flux *= 1 - transitDepth;
        }
      }
      
      dataPoints.push({
        time: parseFloat(time.toFixed(3)),
        flux: parseFloat(flux.toFixed(6)),
        phase: parseFloat(phase.toFixed(3))
      });
    }
    
    return dataPoints;
  }, [period, transitDepth]);

  // Generate folded light curve (phase-folded)
  const foldedData = useMemo(() => {
    const foldedPoints: TSADataPoint[] = [];
    
    // Create phase bins
    for (let i = 0; i < 100; i++) {
      const phase = i / 100;
      
      // Find all points in this phase bin
      const binPoints = lightCurveData.filter(point => {
        const pointPhase = point.phase!;
        return Math.abs(pointPhase - phase) < 0.01;
      });
      
      if (binPoints.length > 0) {
        const avgFlux = binPoints.reduce((sum, p) => sum + p.flux, 0) / binPoints.length;
        foldedPoints.push({
          time: phase,
          flux: parseFloat(avgFlux.toFixed(6)),
          phase
        });
      }
    }
    
    return foldedPoints;
  }, [lightCurveData]);

  const formatTooltip = (value: any, name: string) => {
    if (name === 'flux') {
      return [
        `${(value * 100).toFixed(4)}%`,
        viewMode === 'kids' ? 'Brillo de la estrella' : 'Flujo relativo'
      ];
    }
    return [value, name];
  };

  const formatXAxisLabel = (value: number, isPhase: boolean = false) => {
    if (isPhase) {
      return value.toFixed(2);
    }
    return `${value.toFixed(1)}d`;
  };

  return (
    <div className="space-y-6">
      {/* Original Light Curve */}
      <Card className="card-cosmic">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-xl">
                  {viewMode === 'kids' ? 'Curva de Luz Original' : 'Raw Light Curve'}
                </CardTitle>
                <CardDescription>
                  {toiId} - {planetName}
                </CardDescription>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Período: {period.toFixed(1)} días</div>
              <div>Profundidad: {(transitDepth * 100).toFixed(3)}%</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lightCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
              <XAxis 
                dataKey="time"
                stroke="hsl(213 31% 91%)"
                tick={{ fill: 'hsl(220 9% 55%)', fontSize: 12 }}
                tickFormatter={(value) => formatXAxisLabel(value, false)}
                label={{ 
                  value: viewMode === 'kids' ? 'Tiempo (días)' : 'Time (days)', 
                  position: 'insideBottom', 
                  offset: -5 
                }}
              />
              <YAxis 
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
                stroke="hsl(213 31% 91%)"
                tick={{ fill: 'hsl(220 9% 55%)', fontSize: 12 }}
                tickFormatter={(value) => (value * 100).toFixed(2) + '%'}
                label={{ 
                  value: viewMode === 'kids' ? 'Brillo de la estrella' : 'Relative Flux', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(value) => `Tiempo: ${value} días`}
                contentStyle={{ 
                  backgroundColor: 'hsl(230 30% 10%)', 
                  border: '1px solid hsl(230 25% 18%)',
                  borderRadius: '0.75rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="flux" 
                stroke="hsl(263 70% 50%)" 
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(280 80% 60%)' }}
              />
              {/* Mark transit events */}
              <ReferenceLine 
                x={period * 0.5} 
                stroke="hsl(0 72% 51%)" 
                strokeDasharray="5 5" 
                label="Tránsito 1" 
              />
              <ReferenceLine 
                x={period * 1.5} 
                stroke="hsl(0 72% 51%)" 
                strokeDasharray="5 5" 
                label="Tránsito 2" 
              />
              <ReferenceLine 
                x={period * 2.5} 
                stroke="hsl(0 72% 51%)" 
                strokeDasharray="5 5" 
                label="Tránsito 3" 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Phase-Folded Light Curve */}
      <Card className="card-cosmic">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-xl">
                {viewMode === 'kids' ? 'Curva de Luz Plegada' : 'Phase-Folded Light Curve'}
              </CardTitle>
              <CardDescription>
                {viewMode === 'kids' 
                  ? 'Todos los tránsitos superpuestos para ver el patrón' 
                  : 'All transits folded to show the average transit signal'
                }
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={foldedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
              <XAxis 
                dataKey="time"
                stroke="hsl(213 31% 91%)"
                tick={{ fill: 'hsl(220 9% 55%)', fontSize: 12 }}
                tickFormatter={(value) => formatXAxisLabel(value, true)}
                label={{ 
                  value: viewMode === 'kids' ? 'Fase orbital' : 'Orbital Phase', 
                  position: 'insideBottom', 
                  offset: -5 
                }}
              />
              <YAxis 
                domain={['dataMin - 0.0005', 'dataMax + 0.0005']}
                stroke="hsl(213 31% 91%)"
                tick={{ fill: 'hsl(220 9% 55%)', fontSize: 12 }}
                tickFormatter={(value) => (value * 100).toFixed(3) + '%'}
                label={{ 
                  value: viewMode === 'kids' ? 'Brillo promedio' : 'Average Flux', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(value) => `Fase: ${value}`}
                contentStyle={{ 
                  backgroundColor: 'hsl(230 30% 10%)', 
                  border: '1px solid hsl(230 25% 18%)',
                  borderRadius: '0.75rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="flux" 
                stroke="hsl(280 80% 60%)" 
                strokeWidth={2}
                dot={{ r: 2, fill: 'hsl(280 80% 60%)' }}
                activeDot={{ r: 4, fill: 'hsl(263 70% 50%)' }}
              />
              {/* Mark transit center */}
              <ReferenceLine 
                x={0.5} 
                stroke="hsl(0 72% 51%)" 
                strokeDasharray="5 5" 
                label="Centro del tránsito" 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TSAChart;