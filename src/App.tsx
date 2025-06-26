import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorAuth from "./pages/DoctorAuth";
import PatientAuth from "./pages/PatientAuth";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import CreatePrescription from "./pages/CreatePrescription";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import HealthDashboard from "./pages/HealthDashboard";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AdminPage from "./pages/AdminPage";
import PharmacyPage from "./pages/PharmacyPage";
import NotificationsPage from "./pages/NotificationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/doctor" element={<DoctorAuth />} />
          <Route path="/auth/patient" element={<PatientAuth />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/doctor/prescription/create" element={<CreatePrescription />} />
          <Route path="/prescription/:id" element={<PrescriptionDetail />} />
          <Route path="/health-dashboard" element={<HealthDashboard />} />
          <Route path="/upload-documents" element={<DocumentUploadPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
