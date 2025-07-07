import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  Calendar,
  Search,
  LogOut,
  ArrowLeft,
  Download,
  Eye,
  Bell,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FloatingChat from "@/components/FloatingChat";

const PatientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const patientInfo = {
    name: "John Smith",
    age: 45,
    gender: "Male",
    initials: "JS"
  };

  const myPrescriptions = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      diagnosis: "Hypertension",
      medicines: "Lisinopril 10mg, Amlodipine 5mg",
      date: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialization: "General Medicine",
      diagnosis: "Upper Respiratory Infection",
      medicines: "Amoxicillin 500mg, Acetaminophen 500mg",
      date: "2024-01-10",
      status: "Completed"
    },
    {
      id: 3,
      doctorName: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      diagnosis: "Hypertension Follow-up",
      medicines: "Lisinopril 10mg (continued)",
      date: "2024-01-05",
      status: "Completed"
    }
  ];

  const stats = [
    { label: "Total Prescriptions", value: "12", icon: FileText },
    { label: "Active Prescriptions", value: "1", icon: Heart },
    { label: "Doctors Consulted", value: "3", icon: Users },
    { label: "Last Visit", value: "5 days ago", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Link>
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">MedicNote</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarFallback>{patientInfo.initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{patientInfo.name}</p>
                <p className="text-sm text-gray-500">{patientInfo.age} years old, {patientInfo.gender}</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {patientInfo.name}
          </h1>
          <p className="text-gray-600">
            Track your prescriptions and medical history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Prescriptions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Prescriptions
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search prescriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </CardTitle>
                <CardDescription>
                  View and download your prescription history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {prescription.doctorName.split(' ').slice(-1)[0].split('')[1]}{prescription.doctorName.split(' ').slice(-1)[0].split('')[2]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {prescription.doctorName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {prescription.specialization}
                            </p>
                            <p className="text-sm text-gray-800 font-medium mt-1">
                              {prescription.diagnosis}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {prescription.medicines}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {prescription.date}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={prescription.status === 'Active' ? 'default' : 'secondary'}>
                          {prescription.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Link to={`/prescription/${prescription.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Health Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Blood Pressure</span>
                  <span className="text-sm font-medium">120/80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Heart Rate</span>
                  <span className="text-sm font-medium">72 bpm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Weight</span>
                  <span className="text-sm font-medium">75 kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Checkup</span>
                  <span className="text-sm font-medium">Jan 15, 2024</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Reminders</CardTitle>
                <CardDescription>Medication and appointment reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Lisinopril</span>
                    <span className="font-medium">8:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Follow-up Appointment</span>
                    <span className="font-medium">Jan 30</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Blood Test</span>
                    <span className="font-medium">Feb 5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Dr. Sarah Johnson</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Emergency Services</p>
                  <p className="text-gray-600">911</p>
                </div>
                <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                  Emergency Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Chat Component for Patients */}
      <FloatingChat userRole="patient" />
    </div>
  );
};

export default PatientDashboard;
