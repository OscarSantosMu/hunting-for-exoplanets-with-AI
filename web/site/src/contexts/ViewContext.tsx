import { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'kids' | 'advanced';

interface ViewContextType {
  viewMode: ViewMode;
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('advanced');

  const toggleView = () => {
    setViewMode(prev => prev === 'kids' ? 'advanced' : 'kids');
  };

  return (
    <ViewContext.Provider value={{ viewMode, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within ViewProvider');
  }
  return context;
};
