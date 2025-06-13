
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Plus, 
  FileText, 
  Users, 
  Calendar,
  Search,
  LogOut,
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";

const DoctorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const doctorInfo = {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    initials: "SJ"
  };

  const recentPrescriptions = [
    {
      id: 1,
      patientName: "John Smith",
      patientAge: 45,
      diagnosis: "Hypertension",
      date: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      patientName: "Mary Wilson",
      patientAge: 32,
      diagnosis: "Diabetes Type 2",
      date: "2024-01-14",
      status: "Active"
    },
    {
      id: 3,
      patientName: "Robert Brown",
      patientAge: 58,
      diagnosis: "Hypertension, High Cholesterol",
      date: "2024-01-13",
      status: "Completed"
    }
  ];

  const stats = [
    { label: "Total Patients", value: "127", icon: Users },
    { label: "Prescriptions Today", value: "8", icon: FileText },
    { label: "This Week", value: "43", icon: Calendar },
    { label: "Pending Reviews", value: "5", icon: Search }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Link>
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">MedicNote</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{doctorInfo.initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{doctorInfo.name}</p>
                <p className="text-sm text-gray-500">{doctorInfo.specialization}</p>
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
            Welcome back, {doctorInfo.name}
          </h1>
          <p className="text-gray-600">
            Manage your patients and prescriptions efficiently
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
                <stat.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Prescriptions
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search prescriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Link to="/doctor/prescription/create">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Prescription
                      </Button>
                    </Link>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {prescription.patientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {prescription.patientName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Age: {prescription.patientAge} • {prescription.diagnosis}
                            </p>
                            <p className="text-xs text-gray-400">
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
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/doctor/prescription/create" className="block">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Prescription
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View All Patients
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Prescription History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <CardDescription>Upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">9:00 AM</span>
                    <span className="font-medium">John Smith</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">10:30 AM</span>
                    <span className="font-medium">Mary Wilson</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">2:00 PM</span>
                    <span className="font-medium">Robert Brown</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
