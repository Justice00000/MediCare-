import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, User, Clock, Mail, Phone } from 'lucide-react';
import CallSystem from '@/components/calls/CallSystem';
import UserCallButton from '@/components/calls/UserCallButton';

interface Profile {
  id: string;
  user_id: string;
  role: 'patient' | 'medical_practitioner';
  first_name?: string;
  last_name?: string;
  phone?: string;
  specialization?: string;
  license_number?: string;
  bio?: string;
  avatar_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Use useRef instead of useState for the ref
  const callSystemRef = useRef<any>(null);

  useEffect(() => {
    document.title = 'Admin Dashboard - Medicare';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Manage medical practitioner registrations and user profiles');
    }
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles((data || []) as Profile[]);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const updateProfileStatus = async (profileId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', profileId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Profile ${status} successfully`,
      });

      fetchProfiles(); // Refresh the list
    } catch (error) {
      console.error('Error updating profile status:', error);
      toast({
        title: "Error",
        description: "Failed to update profile status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStartCall = (targetUserId: string, targetUserName: string) => {
    if (callSystemRef.current && callSystemRef.current.startCall) {
      callSystemRef.current.startCall(targetUserId, targetUserName);
    }
  };

  const pendingMedicalStaff = profiles.filter(p => p.role === 'medical_practitioner' && p.status === 'pending');
  const allMedicalStaff = profiles.filter(p => p.role === 'medical_practitioner');
  const patients = profiles.filter(p => p.role === 'patient');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage user registrations and approve medical practitioners</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingMedicalStaff.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medical Staff</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{allMedicalStaff.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{patients.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profiles.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Call System */}
        <CallSystem ref={callSystemRef} />

        {/* Pending Approvals Section */}
        {pendingMedicalStaff.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-red-600">Pending Medical Staff Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingMedicalStaff.map((profile) => (
                  <div key={profile.id} className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {profile.first_name} {profile.last_name}
                        </h3>
                        <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {profile.specialization && (
                            <p><strong>Specialization:</strong> {profile.specialization}</p>
                          )}
                          {profile.license_number && (
                            <p><strong>License Number:</strong> {profile.license_number}</p>
                          )}
                          {profile.phone && (
                            <p className="flex items-center"><Phone className="w-4 h-4 mr-1" />{profile.phone}</p>
                          )}
                          {profile.bio && (
                            <p><strong>Bio:</strong> {profile.bio}</p>
                          )}
                          <p><strong>Applied:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="ml-4 space-y-2">
                        {getStatusBadge(profile.status)}
                        <div className="flex flex-col space-y-2">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => updateProfileStatus(profile.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateProfileStatus(profile.id, 'rejected')}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                          <UserCallButton
                            userId={profile.user_id}
                            userName={`${profile.first_name} ${profile.last_name}`}
                            onStartCall={handleStartCall}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Users Section */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profiles.map((profile) => (
                <div key={profile.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">
                          {profile.first_name} {profile.last_name}
                        </h3>
                        <Badge variant={profile.role === 'medical_practitioner' ? 'default' : 'secondary'}>
                          {profile.role.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        {profile.specialization && (
                          <p><strong>Specialization:</strong> {profile.specialization}</p>
                        )}
                        {profile.phone && (
                          <p className="flex items-center"><Phone className="w-4 h-4 mr-1" />{profile.phone}</p>
                        )}
                        <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end space-y-2">
                      {getStatusBadge(profile.status)}
                      {profile.role === 'medical_practitioner' && profile.status === 'approved' && (
                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateProfileStatus(profile.id, 'rejected')}
                          >
                            Revoke Access
                          </Button>
                          <UserCallButton
                            userId={profile.user_id}
                            userName={`${profile.first_name} ${profile.last_name}`}
                            onStartCall={handleStartCall}
                          />
                        </div>
                      )}
                      {profile.role === 'medical_practitioner' && profile.status === 'rejected' && (
                        <Button
                          size="sm"
                          onClick={() => updateProfileStatus(profile.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Re-approve
                        </Button>
                      )}
                      {profile.role === 'patient' && (
                        <UserCallButton
                          userId={profile.user_id}
                          userName={`${profile.first_name} ${profile.last_name}`}
                          onStartCall={handleStartCall}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;