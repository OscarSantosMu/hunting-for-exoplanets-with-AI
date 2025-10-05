import UploadSection from '@/components/UploadSection';
import { useView } from '@/contexts/ViewContext';
import { Upload as UploadIcon } from 'lucide-react';

const Upload = () => {
  const { viewMode } = useView();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/50">
              <UploadIcon className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="mb-4 glow-text">
            {viewMode === 'kids' ? '¡Comparte tus Datos!' : 'Carga de Datos'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {viewMode === 'kids' 
              ? 'Sube archivos para descubrir nuevos exoplanetas'
              : 'Carga datasets en formato CSV para análisis con modelos ML'
            }
          </p>
        </div>

        <UploadSection />
      </div>
    </div>
  );
};

export default Upload;
