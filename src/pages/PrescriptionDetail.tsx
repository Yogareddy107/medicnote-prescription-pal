import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  Calendar,
  User,
  Stethoscope,
  FileText,
  Pill,
  MessageSquare,
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const PrescriptionDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock prescription data
  const prescription = {
    id: parseInt(id || "1"),
    patientName: "John Smith",
    patientAge: 45,
    patientGender: "Male",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialization: "Cardiology",
    date: "January 15, 2024",
    status: "Active",
    symptoms: "Patient presents with elevated blood pressure readings over the past 3 months. Experiences occasional headaches, especially in the morning. Reports mild dizziness when standing up quickly. No chest pain or shortness of breath.",
    diagnosis: "Essential Hypertension (Primary High Blood Pressure) - Stage 1\nICD-10: I10",
    medicines: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        instructions: "Take in the morning with or without food",
        duration: "30 days"
      },
      {
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        instructions: "Take at the same time each day, preferably in the evening",
        duration: "30 days"
      }
    ],
    advice: `1. Monitor blood pressure daily at home - keep a log
2. Reduce sodium intake to less than 2,300mg per day
3. Engage in regular physical activity (30 minutes, 5 days a week)
4. Maintain a healthy weight
5. Limit alcohol consumption
6. Quit smoking if applicable
7. Manage stress through relaxation techniques
8. Return for follow-up in 4 weeks
9. Contact office immediately if experiencing severe headache, chest pain, or difficulty breathing`,
    nextFollowUp: "February 15, 2024"
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Downloaded",
      description: "The prescription has been downloaded as a PDF file.",
    });
  };

  const handleEmailPrescription = () => {
    toast({
      title: "Email Sent",
      description: "The prescription has been sent to the patient's email address.",
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "The prescription is ready to print.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/doctor/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Prescription Details</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleEmailPrescription}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-8">
        {/* Prescription Header */}
        <Card className="mb-8 print:shadow-none print:border-2">
          <CardHeader className="bg-blue-50 print:bg-white">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">MedicNote Prescription</CardTitle>
                <CardDescription className="text-blue-600 mt-1">
                  Digital Healthcare Solutions
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Prescription ID: #{prescription.id.toString().padStart(6, '0')}</p>
                <p className="text-sm text-gray-600">Date: {prescription.date}</p>
                <Badge variant={prescription.status === 'Active' ? 'default' : 'secondary'} className="mt-2">
                  {prescription.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Patient Information */}
          <Card className="print:shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{prescription.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium">{prescription.patientAge} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium">{prescription.patientGender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date of Issue:</span>
                <span className="font-medium">{prescription.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Information */}
          <Card className="print:shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-green-600" />
                Prescribing Physician
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-medium">{prescription.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Specialization:</span>
                <span className="font-medium">{prescription.doctorSpecialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">License #:</span>
                <span className="font-medium">MD-12345-CA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medical Assessment */}
        <Card className="mb-8 print:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Medical Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Symptoms Presented:</h4>
              <p className="text-gray-700 leading-relaxed">{prescription.symptoms}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Diagnosis:</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{prescription.diagnosis}</p>
            </div>
          </CardContent>
        </Card>

        {/* Prescribed Medications */}
        <Card className="mb-8 print:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="h-5 w-5 mr-2 text-orange-600" />
              Prescribed Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescription.medicines.map((medicine, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 print:bg-white print:border-gray-300">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-lg text-gray-900">{medicine.name}</h5>
                    <Badge variant="outline">{medicine.dosage}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Frequency: </span>
                      <span className="font-medium">{medicine.frequency}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration: </span>
                      <span className="font-medium">{medicine.duration}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-600">Instructions: </span>
                    <span className="font-medium">{medicine.instructions}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medical Advice */}
        <Card className="mb-8 print:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-red-600" />
              Medical Advice & Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{prescription.advice}</p>
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Information */}
        <Card className="print:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
              Follow-up Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg print:bg-white print:border">
              <p className="text-blue-900 font-medium">Next Appointment Scheduled:</p>
              <p className="text-blue-700">{prescription.nextFollowUp}</p>
              <p className="text-blue-600 text-sm mt-2">
                Please ensure to attend your follow-up appointment for continued care and monitoring.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer for Print */}
        <div className="hidden print:block mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>This prescription was generated digitally through MedicNote Healthcare System</p>
          <p>For questions or concerns, please contact your healthcare provider</p>
          <p className="mt-2">© 2024 MedicNote - Secure Digital Healthcare Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
