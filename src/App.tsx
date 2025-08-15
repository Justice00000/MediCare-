import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MedicalDashboard from "./pages/MedicalDashboard";
import SOSPage from "./pages/SOS";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import Appointments from "./pages/Appointments";
import Records from "./pages/Records";
import HealthLibrary from "./pages/HealthLibrary";
import VitalsBox from "./pages/VitalsBox";
import EmergencyRequests from "./pages/EmergencyRequests";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/medical-dashboard" 
              element={
                <ProtectedRoute requiredRole="medical_practitioner">
                  <MedicalDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sos" 
              element={
                <ProtectedRoute>
                  <SOSPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/professional/:id" 
              element={
                <ProtectedRoute>
                  <ProfessionalProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/records" 
              element={
                <ProtectedRoute>
                  <Records />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/health-library" 
              element={
                <ProtectedRoute>
                  <HealthLibrary />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vitals-box" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <VitalsBox />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/emergency-requests" 
              element={
                <ProtectedRoute requiredRole="medical_practitioner">
                  <EmergencyRequests />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/billing" 
              element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
