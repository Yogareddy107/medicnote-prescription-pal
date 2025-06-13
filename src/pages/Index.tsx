
import { Link } from "react-router-dom";
import { Stethoscope, Users, Shield, FileText, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">MedicNote</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
              <Link to="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              <Link to="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Digital Prescription
              <span className="text-blue-600"> Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Secure, efficient, and modern prescription management system for healthcare providers and patients.
              Create, manage, and share prescriptions digitally with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/auth/doctor">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Doctor Login
                </Button>
              </Link>
              <Link to="/auth/patient">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Patient Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MedicNote?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of prescription management with our comprehensive digital platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Secure & HIPAA Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Advanced encryption and role-based access ensure your medical data remains private and secure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Digital Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Create, edit, and manage prescriptions digitally with automatic PDF generation and email delivery.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Patient-Centered Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Patients can easily access their prescriptions, download PDFs, and receive email notifications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <Clock className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Instant notifications and real-time prescription status updates for better patient care.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Multi-User Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Comprehensive role management for doctors, patients, and administrators.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <Stethoscope className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Professional Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Advanced prescription templates, drug interaction checks, and comprehensive medical history.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Stethoscope className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">MedicNote</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing healthcare with digital prescription management solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth/doctor" className="hover:text-white transition-colors">Doctor Portal</Link></li>
                <li><Link to="/auth/patient" className="hover:text-white transition-colors">Patient Portal</Link></li>
                <li><Link to="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="text-gray-400 space-y-2">
                <p>Email: support@medicnote.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Available 24/7 for medical emergencies</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedicNote. All rights reserved. HIPAA Compliant Healthcare Solution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
