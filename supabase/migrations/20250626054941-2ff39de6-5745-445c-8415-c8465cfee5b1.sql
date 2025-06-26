
-- Create health_records table for patient health data
CREATE TABLE public.health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL, -- 'prescription', 'lab_report', 'vital_signs', 'note'
  title TEXT NOT NULL,
  content JSONB, -- flexible storage for different record types
  file_url TEXT, -- for uploaded documents
  recorded_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  doctor_id UUID REFERENCES public.doctors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pharmacies table
CREATE TABLE public.pharmacies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  license_number TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create messages table for doctor-patient chat
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id),
  prescription_id UUID REFERENCES public.prescriptions(id),
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'file', 'image'
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create system_logs table for tracking user activities
CREATE TABLE public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- 'login', 'prescription_view', 'download', etc.
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- 'info', 'warning', 'success', 'error'
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add fulfillment tracking to prescriptions
ALTER TABLE public.prescriptions 
ADD COLUMN pharmacy_id UUID REFERENCES public.pharmacies(id),
ADD COLUMN fulfillment_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'preparing', 'ready', 'delivered', 'rejected'
ADD COLUMN fulfillment_notes TEXT;

-- Create fulfillment_logs table
CREATE TABLE public.fulfillment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES public.prescriptions(id) ON DELETE CASCADE,
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fulfillment_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for health_records
CREATE POLICY "Users can view their own health records" ON public.health_records
  FOR SELECT USING (
    patient_id IN (SELECT id FROM public.patients WHERE id = auth.uid()) OR
    doctor_id IN (SELECT id FROM public.doctors WHERE id = auth.uid())
  );

CREATE POLICY "Doctors can create health records" ON public.health_records
  FOR INSERT WITH CHECK (doctor_id IN (SELECT id FROM public.doctors WHERE id = auth.uid()));

CREATE POLICY "Doctors can update their health records" ON public.health_records
  FOR UPDATE USING (doctor_id IN (SELECT id FROM public.doctors WHERE id = auth.uid()));

-- Create RLS policies for appointments
CREATE POLICY "Users can view their appointments" ON public.appointments
  FOR SELECT USING (
    patient_id IN (SELECT id FROM public.patients WHERE id = auth.uid()) OR
    doctor_id IN (SELECT id FROM public.doctors WHERE id = auth.uid())
  );

CREATE POLICY "Patients can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (patient_id IN (SELECT id FROM public.patients WHERE id = auth.uid()));

CREATE POLICY "Users can update their appointments" ON public.appointments
  FOR UPDATE USING (
    patient_id IN (SELECT id FROM public.patients WHERE id = auth.uid()) OR
    doctor_id IN (SELECT id FROM public.doctors WHERE id = auth.uid())
  );

-- Create RLS policies for messages
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Create RLS policies for notifications
CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_health_records_patient_id ON public.health_records(patient_id);
CREATE INDEX idx_health_records_doctor_id ON public.health_records(doctor_id);
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_prescriptions_pharmacy_id ON public.prescriptions(pharmacy_id);
CREATE INDEX idx_system_logs_user_id ON public.system_logs(user_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);

-- Create storage bucket for document uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('health-documents', 'health-documents', false);

-- Create storage policies for health documents
CREATE POLICY "Users can upload their documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'health-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'health-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their documents" ON storage.objects
  FOR UPDATE USING (bucket_id = 'health-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their documents" ON storage.objects
  FOR DELETE USING (bucket_id = 'health-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.prescriptions;
