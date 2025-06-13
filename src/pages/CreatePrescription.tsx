
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Send, 
  User, 
  FileText, 
  Pill,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CreatePrescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    patientId: "",
    symptoms: "",
    diagnosis: "",
    medicines: "",
    advice: "",
    duration: ""
  });

  // Mock patients data
  const patients = [
    { id: "1", name: "John Smith", age: 45 },
    { id: "2", name: "Mary Wilson", age: 32 },
    { id: "3", name: "Robert Brown", age: 58 },
    { id: "4", name: "Lisa Davis", age: 28 },
    { id: "5", name: "Michael Johnson", age: 52 }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Prescription Created",
        description: "The prescription has been created and sent to the patient successfully.",
      });
      navigate("/doctor/dashboard");
    }, 2000);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your prescription draft has been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/doctor/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Create New Prescription</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                type="submit" 
                form="prescription-form"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? "Creating..." : "Create & Send"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form id="prescription-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Patient Information
              </CardTitle>
              <CardDescription>
                Select the patient for this prescription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patient">Select Patient</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange("patientId", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} - {patient.age} years old
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Medical Assessment
              </CardTitle>
              <CardDescription>
                Document the patient's condition and symptoms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe the patient's symptoms in detail..."
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange("symptoms", e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Enter the medical diagnosis..."
                  value={formData.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Prescription Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2 text-purple-600" />
                Prescription Details
              </CardTitle>
              <CardDescription>
                Specify medications and treatment plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="medicines">Medications Prescribed</Label>
                <Textarea
                  id="medicines"
                  placeholder="List all medications with dosage, frequency, and instructions...
Example:
1. Lisinopril 10mg - Take 1 tablet daily in the morning
2. Amlodipine 5mg - Take 1 tablet daily
3. Aspirin 81mg - Take 1 tablet daily with food"
                  value={formData.medicines}
                  onChange={(e) => handleInputChange("medicines", e.target.value)}
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Treatment Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 30 days, 3 months, ongoing"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-orange-600" />
                Additional Instructions & Advice
              </CardTitle>
              <CardDescription>
                Provide any additional guidance for the patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="advice">Medical Advice & Instructions</Label>
                <Textarea
                  id="advice"
                  placeholder="Include lifestyle recommendations, follow-up instructions, warning signs to watch for, dietary advice, etc..."
                  value={formData.advice}
                  onChange={(e) => handleInputChange("advice", e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link to="/doctor/dashboard">
              <Button variant="outline">
                Cancel
              </Button>
            </Link>
            <Button variant="outline" type="button" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Creating Prescription..." : "Create & Send to Patient"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePrescription;
