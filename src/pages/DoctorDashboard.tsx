
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  FileText,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      lastVisit: "2024-02-01",
      condition: "Hypertension",
      prescription: "Lisinopril 10mg daily",
    },
    {
      id: 2,
      name: "Alice Johnson",
      age: 32,
      gender: "Female",
      lastVisit: "2024-01-25",
      condition: "Migraine",
      prescription: "Sumatriptan as needed",
    },
    {
      id: 3,
      name: "Robert Williams",
      age: 60,
      gender: "Male",
      lastVisit: "2024-02-05",
      condition: "Diabetes",
      prescription: "Metformin 500mg twice daily",
    },
  ]);

  const { toast } = useToast();

  const handleCreatePrescription = () => {
    navigate("/doctor/prescription/create");
  };

  const handleViewPatient = (patientId: number) => {
    navigate(`/prescription/${patientId}`);
  };

  const handleEditPatient = (patientId: number) => {
    toast({
      title: "Edit Patient Details",
      description: `Editing details for patient ID: ${patientId}.`,
    });
  };

  const handleDeletePatient = (patientId: number) => {
    const updatedPatients = patients.filter((patient) => patient.id !== patientId);
    setPatients(updatedPatients);
    toast({
      title: "Patient Deleted",
      description: `Patient ID: ${patientId} has been successfully deleted.`,
      variant: "destructive",
    });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleBackToHome}
                  className="flex items-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Doctor Dashboard
                </h2>
              </div>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <Button onClick={handleCreatePrescription} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Prescription
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Input type="text" placeholder="Search patients..." className="mr-2" />
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Patient List */}
          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>Manage and view your patients.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Prescription
                    </th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" alt={patient.name} />
                              <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">ID: {patient.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.age}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.gender}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.lastVisit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">{patient.condition}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.prescription}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewPatient(patient.id)}>
                              <Eye className="h-4 w-4 mr-2" /> View Prescription
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPatient(patient.id)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit Patient
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeletePatient(patient.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Delete Patient
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
