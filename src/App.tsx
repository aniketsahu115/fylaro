import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "./lib/web3-config";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@rainbow-me/rainbowkit/styles.css";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Portfolio from "./pages/Portfolio";
import PaymentTracker from "./pages/PaymentTracker";
import Trading from "./pages/Trading";
import UploadInvoice from "./pages/UploadInvoice";
import CreateInvoice from "./pages/CreateInvoice";
import MyPortfolio from "./pages/MyPortfolio";
import InvoiceMarketplace from "./pages/InvoiceMarketplace";
import InvestmentDetails from "./pages/InvestmentDetails";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import Legal from "./pages/Legal";
import Press from "./pages/Press";
import ApiDocs from "./pages/ApiDocs";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route
                    path="/invoice-marketplace"
                    element={<InvoiceMarketplace />}
                  />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/my-portfolio" element={<MyPortfolio />} />
                  <Route path="/payments" element={<PaymentTracker />} />
                  <Route path="/trading" element={<Trading />} />
                  <Route path="/upload" element={<UploadInvoice />} />
                  <Route path="/create-invoice" element={<CreateInvoice />} />
                  <Route
                    path="/investment/:invoiceId"
                    element={<InvestmentDetails />}
                  />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/legal" element={<Legal />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/api-docs" element={<ApiDocs />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
