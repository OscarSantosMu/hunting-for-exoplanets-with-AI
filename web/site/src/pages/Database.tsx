import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database as DatabaseIcon, BookOpen } from 'lucide-react';
import { glossaryTerms } from '@/data/glossary';
import { useView } from '@/contexts/ViewContext';
import ExoplanetTable from '@/components/ExoplanetTable';
import { sampleExoplanets } from '@/data/sampleExoplanets';

const Database = () => {
  const { viewMode } = useView();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/50">
              <DatabaseIcon className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="mb-4 glow-text">
            {viewMode === 'kids' ? '¡Explora el Universo de Exoplanetas!' : 'Base de Datos de Exoplanetas'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {viewMode === 'kids' 
              ? 'Descubre planetas increíbles que están fuera de nuestro sistema solar'
              : 'Accede a la información completa de exoplanetas descubiertos y sus características'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1 card-cosmic">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <CardTitle>
                  {viewMode === 'kids' ? 'Diccionario Espacial' : 'Glosario de Variables'}
                </CardTitle>
              </div>
              <CardDescription>
                {viewMode === 'kids' 
                  ? 'Palabras importantes para entender el espacio'
                  : 'Definiciones técnicas de las métricas utilizadas'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {glossaryTerms.map((term, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-accent/5 border border-accent/20 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="font-semibold text-primary">{term.term}</h3>
                        {term.unit && (
                          <span className="text-xs text-muted-foreground">({term.unit})</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <ExoplanetTable data={sampleExoplanets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
