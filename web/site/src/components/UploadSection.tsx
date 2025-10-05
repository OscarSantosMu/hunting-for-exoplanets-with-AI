import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        toast({
          title: "Archivo cargado",
          description: `${selectedFile.name} listo para procesar`,
        });
      } else {
        toast({
          title: "Formato no válido",
          description: "Por favor, carga un archivo CSV",
          variant: "destructive",
        });
      }
    }
  };

  const handleProcess = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulación de procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Análisis completado",
        description: "El dataset ha sido procesado. Funcionalidad de ML próximamente.",
      });
    }, 2000);
  };

  return (
    <section className="py-16 px-4 gradient-nebula">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="mb-4 glow-text">Carga de Dataset</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sube tu propio dataset de exoplanetas para análisis con ML
          </p>
        </div>

        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-primary" />
              Cargar Archivo CSV
            </CardTitle>
            <CardDescription>
              Formato esperado: Incluye columnas como 'disposition', 'name', 'distance', 'radius', etc.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg mb-2">
                  {file ? file.name : "Haz clic para seleccionar un archivo CSV"}
                </p>
                <p className="text-sm text-muted-foreground">
                  o arrastra y suelta aquí
                </p>
              </label>
            </div>

            {file && (
              <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            )}

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Próximamente: Análisis con ML</p>
                <p className="text-muted-foreground">
                  La validación automática con modelos de Machine Learning estará disponible próximamente. 
                  El sistema identificará exoplanetas, analizará similitudes y explicará clasificaciones.
                </p>
              </div>
            </div>

            <Button
              onClick={handleProcess}
              disabled={!file || isProcessing}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isProcessing ? "Procesando..." : "Procesar Dataset"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UploadSection;
