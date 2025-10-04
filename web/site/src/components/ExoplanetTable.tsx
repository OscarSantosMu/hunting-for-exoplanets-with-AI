import { useState } from "react";
import { Exoplanet } from "@/types/exoplanet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SortAsc } from "lucide-react";

interface ExoplanetTableProps {
  data: Exoplanet[];
}

const ExoplanetTable = ({ data }: ExoplanetTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDisposition, setFilterDisposition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const getDispositionColor = (disposition: string) => {
    switch (disposition) {
      case 'CONFIRMED':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'CANDIDATE':
        return 'bg-accent/20 text-accent border-accent/50';
      case 'FALSE POSITIVE':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredData = data
    .filter(planet => {
      const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDisposition = filterDisposition === "all" || planet.disposition === filterDisposition;
      return matchesSearch && matchesDisposition;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'distance':
          return a.distance - b.distance;
        case 'year':
          return b.discoveryYear - a.discoveryYear;
        default:
          return 0;
      }
    });

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="mb-4 glow-text">Base de Datos de Exoplanetas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección de exoplanetas confirmados, candidatos y falsos positivos
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          
          <Select value={filterDisposition} onValueChange={setFilterDisposition}>
            <SelectTrigger className="w-full md:w-[200px] bg-card border-border">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="CONFIRMED">Confirmados</SelectItem>
              <SelectItem value="CANDIDATE">Candidatos</SelectItem>
              <SelectItem value="FALSE POSITIVE">Falsos Positivos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px] bg-card border-border">
              <SortAsc className="mr-2 w-4 h-4" />
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="distance">Distancia</SelectItem>
              <SelectItem value="year">Año de descubrimiento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border overflow-hidden card-cosmic">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Distancia (ly)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Radio (R⊕)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Temp. (K)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Año</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Método</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((planet, index) => (
                  <tr 
                    key={planet.id} 
                    className="hover:bg-secondary/30 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-6 py-4 font-medium text-primary">{planet.name}</td>
                    <td className="px-6 py-4">
                      <Badge className={getDispositionColor(planet.disposition)}>
                        {planet.disposition}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{planet.distance.toFixed(1)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{planet.radius.toFixed(2)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{planet.equilibriumTemperature}</td>
                    <td className="px-6 py-4 text-muted-foreground">{planet.discoveryYear}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{planet.discoveryMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Mostrando {filteredData.length} de {data.length} exoplanetas
        </div>
      </div>
    </section>
  );
};

export default ExoplanetTable;
