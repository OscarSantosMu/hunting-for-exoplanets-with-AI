import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { uploadFile, predictBatch, BatchPredictResponse } from '@/lib/api';

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [modelType, setModelType] = useState('xgb');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BatchPredictResponse | null>(null);
  const [uploadPath, setUploadPath] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  });

  const handleProcess = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo primero.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setUploadPath(null);

    try {
      // Paso 1: Subir el archivo
      const uploadResponse = await uploadFile(file);
      setUploadPath(uploadResponse.blob_path);

      // Paso 2: Iniciar predicción por lotes
      const predictResponse = await predictBatch({
        csv_blob_path: uploadResponse.blob_path,
        model_type: modelType,
      });
      setResult(predictResponse);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="card-cosmic w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="glow-text">Procesar Dataset</CardTitle>
        <CardDescription>Sube un archivo CSV y selecciona un modelo para procesarlo.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          {file ? (
            <p className="text-foreground">{file.name}</p>
          ) : (
            <p className="text-muted-foreground">
              {isDragActive ? 'Suelta el archivo aquí...' : 'Arrastra y suelta un archivo CSV, o haz clic para seleccionar'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="model-select" className="text-sm font-medium mb-2 block">Modelo</label>
            <Select value={modelType} onValueChange={setModelType}>
              <SelectTrigger id="model-select">
                <SelectValue placeholder="Selecciona un modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xgb">XGBoost</SelectItem>
                <SelectItem value="lgbm">LightGBM</SelectItem>
                <SelectItem value="catboost">CatBoost</SelectItem>
                <SelectItem value="nn">Red Neuronal</SelectItem>
                <SelectItem value="ensemble">Ensamble</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleProcess} disabled={isLoading || !file} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            'Procesar Dataset'
          )}
        </Button>

        {error && (
          <div className="flex items-center p-4 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 mr-3" />
            <div>
              <h4 className="font-semibold">Error</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {uploadPath && !result && (
           <div className="flex items-center p-4 bg-info/10 text-info-foreground rounded-lg">
             <CheckCircle className="w-5 h-5 mr-3" />
             <div>
               <h4 className="font-semibold">Paso 1/2 Completo</h4>
               <p className="text-sm">Archivo subido a: <code className="font-mono">{uploadPath}</code>. Ahora iniciando predicción...</p>
             </div>
           </div>
        )}

        {result && (
          <div className="flex items-center p-4 bg-success/10 text-success-foreground rounded-lg">
            <CheckCircle className="w-5 h-5 mr-3" />
            <div>
              <h4 className="font-semibold">Proceso Completo</h4>
              <p className="text-sm">{result.results.length} registros procesados exitosamente.</p>
              {/* Opcionalmente, mostrar un fragmento de los resultados */}
              <details className="mt-2 text-xs">
                <summary>Ver resultados (JSON)</summary>
                <pre className="mt-2 p-2 bg-background/50 rounded max-h-40 overflow-auto">
                  <code>{JSON.stringify(result, null, 2)}</code>
                </pre>
              </details>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadSection;
