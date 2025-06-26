
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Phone, Mail, Package, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  zip_code?: string;
}

interface Prescription {
  id: string;
  diagnosis: string;
  medications: any;
  date_issued: string;
  fulfillment_status: string;
  pharmacy_id?: string;
  fulfillment_notes?: string;
  patients: {
    profiles: {
      full_name: string;
    };
  };
}

export default function PharmacyIntegration() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchZip, setSearchZip] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    fetchPharmacies();
    fetchPrescriptions();
    getCurrentUserRole();
  }, []);

  const getCurrentUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserRole(data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const fetchPharmacies = async () => {
    try {
      const { data, error } = await supabase
        .from('pharmacies')
        .select('*')
        .order('name');

      if (error) throw error;
      setPharmacies(data || []);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      let query = supabase
        .from('prescriptions')
        .select(`
          *,
          patients (
            profiles (
              full_name
            )
          )
        `)
        .order('date_issued', { ascending: false });

      // If user is a pharmacist, only show prescriptions assigned to their pharmacy
      if (userRole === 'pharmacist') {
        // This would need to be implemented based on your pharmacy-user relationship
        // For now, we'll show all prescriptions
      }

      const { data, error } = await query;

      if (error) throw error;
      setPrescriptions(data || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const searchPharmacies = async () => {
    try {
      let query = supabase.from('pharmacies').select('*');
      
      if (searchZip) {
        query = query.eq('zip_code', searchZip);
      }

      const { data, error } = await query.order('name');

      if (error) throw error;
      setPharmacies(data || []);
    } catch (error) {
      console.error('Error searching pharmacies:', error);
    }
  };

  const linkPharmacy = async (prescriptionId: string, pharmacyId: string) => {
    try {
      const { error } = await supabase
        .from('prescriptions')
        .update({ 
          pharmacy_id: pharmacyId,
          fulfillment_status: 'approved'
        })
        .eq('id', prescriptionId);

      if (error) throw error;

      // Log the fulfillment update
      await supabase
        .from('fulfillment_logs')
        .insert({
          prescription_id: prescriptionId,
          pharmacy_id: pharmacyId,
          status: 'approved',
          notes: 'Prescription assigned to pharmacy'
        });

      toast({
        title: "Success",
        description: "Prescription linked to pharmacy successfully",
      });

      fetchPrescriptions();
    } catch (error) {
      console.error('Error linking pharmacy:', error);
      toast({
        title: "Error",
        description: "Failed to link prescription to pharmacy",
        variant: "destructive"
      });
    }
  };

  const updateFulfillmentStatus = async (prescriptionId: string, status: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('prescriptions')
        .update({ 
          fulfillment_status: status,
          fulfillment_notes: notes
        })
        .eq('id', prescriptionId);

      if (error) throw error;

      // Log the status update
      await supabase
        .from('fulfillment_logs')
        .insert({
          prescription_id: prescriptionId,
          status: status,
          notes: notes || `Status updated to ${status}`
        });

      toast({
        title: "Success",
        description: `Prescription status updated to ${status}`,
      });

      fetchPrescriptions();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update prescription status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { variant: "default" | "secondary" | "destructive", icon: React.ReactNode } } = {
      pending: { variant: "secondary", icon: <Package className="w-3 h-3" /> },
      approved: { variant: "default", icon: <CheckCircle className="w-3 h-3" /> },
      preparing: { variant: "default", icon: <Package className="w-3 h-3" /> },
      ready: { variant: "default", icon: <CheckCircle className="w-3 h-3" /> },
      delivered: { variant: "secondary", icon: <CheckCircle className="w-3 h-3" /> },
      rejected: { variant: "destructive", icon: <XCircle className="w-3 h-3" /> }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Pharmacy Integration</h1>

      {/* Pharmacy Search */}
      <Card>
        <CardHeader>
          <CardTitle>Find Nearby Pharmacies</CardTitle>
          <CardDescription>
            Search for pharmacies in your area to link prescriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter ZIP code"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
            />
            <Button onClick={searchPharmacies}>Search</Button>
          </div>

          <div className="grid gap-4">
            {pharmacies.map((pharmacy) => (
              <Card key={pharmacy.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{pharmacy.name}</h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {pharmacy.address}
                      </div>
                      
                      {pharmacy.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {pharmacy.phone}
                        </div>
                      )}
                      
                      {pharmacy.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {pharmacy.email}
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => setSelectedPharmacy(pharmacy.id)}
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prescription Management */}
      <Card>
        <CardHeader>
          <CardTitle>Prescription Fulfillment</CardTitle>
          <CardDescription>
            Manage prescription fulfillment and tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Medications</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>
                    {prescription.patients?.profiles?.full_name || 'N/A'}
                  </TableCell>
                  <TableCell>{prescription.diagnosis}</TableCell>
                  <TableCell>
                    {Array.isArray(prescription.medications) 
                      ? prescription.medications.map((med: any) => med.name).join(', ')
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    {new Date(prescription.date_issued).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(prescription.fulfillment_status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {!prescription.pharmacy_id && selectedPharmacy && (
                        <Button
                          size="sm"
                          onClick={() => linkPharmacy(prescription.id, selectedPharmacy)}
                        >
                          Assign
                        </Button>
                      )}
                      
                      {prescription.fulfillment_status === 'approved' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateFulfillmentStatus(prescription.id, 'preparing')}
                        >
                          Prepare
                        </Button>
                      )}
                      
                      {prescription.fulfillment_status === 'preparing' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateFulfillmentStatus(prescription.id, 'ready')}
                        >
                          Ready
                        </Button>
                      )}
                      
                      {prescription.fulfillment_status === 'ready' && (
                        <Button
                          size="sm"
                          onClick={() => updateFulfillmentStatus(prescription.id, 'delivered')}
                        >
                          Delivered
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
