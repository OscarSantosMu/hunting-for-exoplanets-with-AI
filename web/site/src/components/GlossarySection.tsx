import { glossaryTerms } from "@/data/glossary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const GlossarySection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/50">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h2 className="mb-4 glow-text">Glosario de Términos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprende las métricas y conceptos clave utilizados en el estudio de exoplanetas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {glossaryTerms.map((term, index) => (
            <Card 
              key={index} 
              className="card-cosmic hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(263_70%_50%_/_0.2)]"
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-baseline justify-between">
                  <span>{term.term}</span>
                  {term.unit && (
                    <span className="text-sm text-muted-foreground font-normal">
                      ({term.unit})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {term.definition}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlossarySection;
