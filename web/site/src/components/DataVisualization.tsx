import { Exoplanet } from "@/types/exoplanet";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataVisualizationProps {
  data: Exoplanet[];
}

// Custom Tooltip for PieChart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    const total = payload[0].payload.total;
    const percent = ((value / total) * 100).toFixed(1);
    return (
      <div
        style={{
          background: 'hsl(230 30% 10%)',
          border: '1px solid hsl(230 25% 18%)',
          borderRadius: '0.75rem',
          color: 'hsl(213 31% 91%)',
          padding: '0.75rem 1rem',
          minWidth: 120,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4, color }}>
          {name}
        </div>
        <div>
          <span style={{ color: 'hsl(220 9% 55%)' }}>Cantidad:</span> {value}
        </div>
        <div>
          <span style={{ color: 'hsl(220 9% 55%)' }}>Porcentaje:</span> {percent}%
        </div>
      </div>
    );
  }
  return null;
};

const DataVisualization = ({ data }: DataVisualizationProps) => {
  const totalPlanets = data.length;
  const dispositionData = [
    {
      name: 'Confirmados',
      value: data.filter(p => p.disposition === 'CONFIRMED').length,
      color: 'hsl(263 70% 50%)',
      total: totalPlanets
    },
    {
      name: 'Candidatos',
      value: data.filter(p => p.disposition === 'CANDIDATE').length,
      color: 'hsl(280 80% 60%)',
      total: totalPlanets
    },
    {
      name: 'Falsos Positivos',
      value: data.filter(p => p.disposition === 'FALSE POSITIVE').length,
      color: 'hsl(0 72% 51%)',
      total: totalPlanets
    }
  ];

  const methodData = data.reduce((acc, planet) => {
    const existing = acc.find(item => item.method === planet.discoveryMethod);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ method: planet.discoveryMethod, count: 1 });
    }
    return acc;
  }, [] as { method: string; count: number }[]);

  return (
    <section className="py-16 px-4 gradient-nebula">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="mb-4 glow-text">Resumen de Datos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Análisis detallado de la distribución de exoplanetas en la sección "Estadísticas"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-cosmic">
            <CardHeader>
              <CardTitle className="text-2xl">Disposición del Exoplaneta</CardTitle>
              <CardDescription>
                Proporción de exoplanetas confirmados, candidatos y falsos positivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dispositionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) =>
                      `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dispositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="card-cosmic">
            <CardHeader>
              <CardTitle className="text-2xl">Métodos de Descubrimiento</CardTitle>
              <CardDescription>
                Técnicas utilizadas para detectar exoplanetas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={methodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 25% 18%)" />
                  <XAxis 
                    dataKey="method" 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                  />
                  <YAxis 
                    stroke="hsl(213 31% 91%)"
                    tick={{ fill: 'hsl(220 9% 55%)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem',
                      color: 'hsl(213 31% 91%)'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(263 70% 50%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
