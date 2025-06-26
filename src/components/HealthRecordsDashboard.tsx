
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, Pill, Activity, Search, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface HealthRecord {
  id: string;
  record_type: string;
  title: string;
  content: any;
  recorded_date: string;
  doctor_id?: string;
  file_url?: string;
}

interface Prescription {
  id: string;
  medications: any;
  diagnosis: string;
  date_issued: string;
  status: string;
  fulfillment_status: string;
  doctor_id: string;
}

export default function HealthRecordsDashboard() {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthRecords();
    fetchPrescriptions();
  }, []);

  const fetchHealthRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('health_records')
        .select('*')
        .order('recorded_date', { ascending: false });

      if (error) throw error;
      setHealthRecords(data || []);
    } catch (error) {
      console.error('Error fetching health records:', error);
      toast({
        title: "Error",
        description: "Failed to fetch health records",
        variant: "destructive"
      });
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .order('date_issued', { ascending: false });

      if (error) throw error;
      setPrescriptions(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch prescriptions",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const filteredRecords = healthRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.record_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || record.record_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         JSON.stringify(prescription.medications).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'prescription': return <Pill className="h-4 w-4" />;
      case 'lab_report': return <FileText className="h-4 w-4" />;
      case 'vital_signs': return <Activity className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      active: "default",
      completed: "secondary",
      cancelled: "destructive",
      pending: "secondary"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Health Records Dashboard</h1>
        
        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterType === 'prescription' ? 'default' : 'outline'}
              onClick={() => setFilterType('prescription')}
              size="sm"
            >
              Prescriptions
            </Button>
            <Button
              variant={filterType === 'lab_report' ? 'default' : 'outline'}
              onClick={() => setFilterType('lab_report')}
              size="sm"
            >
              Lab Reports
            </Button>
            <Button
              variant={filterType === 'vital_signs' ? 'default' : 'outline'}
              onClick={() => setFilterType('vital_signs')}
              size="sm"
            >
              Vitals
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="records">Health Records</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescription History</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    {getRecordIcon(record.record_type)}
                    <CardTitle className="text-lg">{record.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {record.record_type.replace('_', ' ')}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {new Date(record.recorded_date).toLocaleDateString()}
                  </CardDescription>
                  {record.content && (
                    <div className="mt-2 text-sm">
                      {typeof record.content === 'object' 
                        ? JSON.stringify(record.content, null, 2)
                        : record.content
                      }
                    </div>
                  )}
                  {record.file_url && (
                    <Button variant="outline" size="sm" className="mt-2">
                      View Document
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Medications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fulfillment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>
                    {new Date(prescription.date_issued).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{prescription.diagnosis}</TableCell>
                  <TableCell>
                    {Array.isArray(prescription.medications) 
                      ? prescription.medications.map((med: any) => med.name).join(', ')
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(prescription.status)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(prescription.fulfillment_status)}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
