import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#6B7280]">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && profile?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-[#EF4444] text-lg font-semibold mb-2">
          Acceso Denegado
        </div>
        <div className="text-[#6B7280] mb-4">
          No tienes permisos de administrador para acceder a esta página.
        </div>
        <Navigate to="/dashboard/mapa" replace />
      </div>
    );
  }

  return <>{children}</>;
}
