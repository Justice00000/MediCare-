import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'medical_practitioner' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Check admin status for admin routes
  useEffect(() => {
    if (requiredRole === 'admin' && user) {
      checkAdminStatus();
    }
  }, [user, requiredRole]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id')
        .eq('user_id', user?.id)
        .single();
      
      setIsAdmin(!error && !!data);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  if (loading || (requiredRole === 'admin' && isAdmin === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check admin access
  if (requiredRole === 'admin') {
    if (!isAdmin) {
      return <Navigate to="/auth" replace />;
    }
    return <>{children}</>;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    // Redirect based on actual role
    const redirectPath = profile?.role === 'medical_practitioner' ? '/medical-dashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // Check if medical practitioner is approved
  if (profile?.role === 'medical_practitioner' && profile?.status !== 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Account Under Review
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your medical practitioner account is currently being reviewed by our admin team. 
            You will be notified once your registration is approved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Status: <span className="font-semibold">{profile.status || 'Pending'}</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};