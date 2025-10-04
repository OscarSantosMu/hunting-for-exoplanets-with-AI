import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ViewProvider } from "@/contexts/ViewContext";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Database from "./pages/Database";
import Upload from "./pages/Upload";
import Training from "./pages/Training";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ViewProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/database" element={<Database />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/training" element={<Training />} />
            <Route path="/statistics" element={<Statistics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ViewProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
