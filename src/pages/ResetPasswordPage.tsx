import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validSession, setValidSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setValidSession(true);
      } else {
        showToast('Enlace inválido o expirado', 'error');
        setTimeout(() => navigate('/login'), 2000);
      }
    });
  }, [navigate, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      showToast('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      showToast('Contraseña actualizada exitosamente', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar la contraseña';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!validSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAF8] via-white to-[#DDF3EA] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#157A5A] mx-auto"></div>
          <p className="mt-4 text-sm text-[#6B7280]">Verificando enlace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAF8] via-white to-[#DDF3EA] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden">
          <div className="bg-gradient-to-r from-[#157A5A] to-[#0B3D2E] p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Zap className="w-7 h-7 text-[#157A5A]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">LINERGY</h1>
                <p className="text-sm text-white/80">Sistema CFE</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-[#111827] mb-1">
                Nueva Contraseña
              </h2>
              <p className="text-sm text-[#6B7280]">
                Ingresa tu nueva contraseña
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nueva contraseña"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                label="Confirmar contraseña"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <div className="bg-[#F7FAF8] border border-[#DDF3EA] rounded-lg p-3">
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  La contraseña debe tener al menos 6 caracteres.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                icon={<Lock className="w-4 h-4" />}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Actualizando...' : 'Actualizar contraseña'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                Cancelar y volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
