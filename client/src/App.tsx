import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import SEOHead from "./components/SEOHead";
import WhatsAppButton from "./components/WhatsAppButton";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <LanguageProvider>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <SEOHead />
              <Toaster />
              <Router />
              <WhatsAppButton />
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
