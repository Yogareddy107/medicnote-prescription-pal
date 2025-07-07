import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import FloatingChat from "@/components/FloatingChat";
import { 
  FileText, 
  Users, 
  Shield, 
  Clock,
  Activity,
  Upload,
  Calendar,
  MessageSquare,
  Bell,
  BarChart3,
  Pill
} from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Health Records Dashboard",
      description: "View all your past and current health records, prescriptions, and vitals",
      icon: <Activity className="h-8 w-8 text-blue-600" />,
      link: "/health-dashboard",
      badge: "Patient"
    },
    {
      title: "Document Upload",
      description: "Securely upload lab reports, X-rays, and other medical documents",
      icon: <Upload className="h-8 w-8 text-green-600" />,
      link: "/upload-documents",
      badge: "Secure"
    },
    {
      title: "Appointment Booking",
      description: "Book, reschedule, or cancel appointments with doctors",
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      link: "/appointments",
      badge: "Scheduling"
    },
    {
      title: "Pharmacy Integration",
      description: "Link prescriptions to pharmacies and track fulfillment status",
      icon: <Pill className="h-8 w-8 text-orange-600" />,
      link: "/pharmacy",
      badge: "Fulfillment"
    },
    {
      title: "Notifications",
      description: "Real-time notifications for appointments, prescriptions, and updates",
      icon: <Bell className="h-8 w-8 text-red-600" />,
      link: "/notifications",
      badge: "Real-time"
    },
    {
      title: "Admin Dashboard",
      description: "Comprehensive analytics and system management for administrators",
      icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
      link: "/admin",
      badge: "Admin Only"
    }
  ];

  const quickActions = [
    { title: "Doctor Login", link: "/auth/doctor", icon: <Users className="h-5 w-5" /> },
    { title: "Patient Login", link: "/auth/patient", icon: <Shield className="h-5 w-5" /> },
    { title: "Sample Prescription", link: "/prescription/1", icon: <FileText className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MedicNote</h1>
            </div>
            <div className="flex items-center space-x-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    {action.icon}
                    {action.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Digital Prescription Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive healthcare platform connecting doctors, patients, and pharmacies 
            with secure prescription management, real-time notifications, and seamless document handling.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth/doctor">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started as Doctor
              </Button>
            </Link>
            <Link to="/auth/patient">
              <Button size="lg" variant="outline">
                Get Started as Patient
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {feature.icon}
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Complete Healthcare Ecosystem
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure & HIPAA Compliant</h3>
              <p className="text-gray-600 text-sm">End-to-end encryption with role-based access control</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600 text-sm">Instant notifications and live chat functionality</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Multi-Role Support</h3>
              <p className="text-gray-600 text-sm">Doctors, patients, pharmacists, and admin interfaces</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 text-sm">Comprehensive reporting and system monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Component */}
      <FloatingChat />
    </div>
  );
};

export default Index;
