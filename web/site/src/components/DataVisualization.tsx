import { Exoplanet } from "@/types/exoplanet";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataVisualizationProps {
  data: Exoplanet[];
}

const DataVisualization = ({ data }: DataVisualizationProps) => {
  const dispositionData = [
    {
      name: 'Confirmados',
      value: data.filter(p => p.disposition === 'CONFIRMED').length,
      color: 'hsl(263 70% 50%)'
    },
    {
      name: 'Candidatos',
      value: data.filter(p => p.disposition === 'CANDIDATE').length,
      color: 'hsl(280 80% 60%)'
    },
    {
      name: 'Falsos Positivos',
      value: data.filter(p => p.disposition === 'FALSE POSITIVE').length,
      color: 'hsl(0 72% 51%)'
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
          <h2 className="mb-4 glow-text">Visualización de Datos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Análisis estadístico de la distribución de exoplanetas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-cosmic">
            <CardHeader>
              <CardTitle className="text-2xl">Distribución por Estado</CardTitle>
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
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dispositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(230 30% 10%)', 
                      border: '1px solid hsl(230 25% 18%)',
                      borderRadius: '0.75rem'
                    }}
                  />
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
                      borderRadius: '0.75rem'
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
