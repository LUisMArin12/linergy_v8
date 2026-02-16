import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      showToast('Correo de recuperación enviado', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al enviar el correo';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
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
                  <Mail className="w-7 h-7 text-[#157A5A]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Correo Enviado</h1>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-[#DDF3EA] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#157A5A]" />
                </div>
                <h2 className="text-xl font-bold text-[#111827] mb-2">
                  Revisa tu correo
                </h2>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
                  Haz clic en el enlace para restablecer tu contraseña.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  Volver al inicio de sesión
                </Button>

                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="w-full text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  No recibí el correo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
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
                Recuperar Contraseña
              </h2>
              <p className="text-sm text-[#6B7280]">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                icon={<Mail className="w-4 h-4" />}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full text-sm text-[#6B7280] hover:text-[#111827] transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
