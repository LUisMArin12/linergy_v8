# Configuración de Recuperación de Contraseña

Este documento explica cómo configurar los emails de recuperación de contraseña en Supabase.

## Configuración en Supabase Dashboard

### 1. Configurar la URL de redirección

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **Authentication** > **URL Configuration**
3. En la sección **Redirect URLs**, agrega:
   - Para desarrollo local: `http://localhost:5173/reset-password`
   - Para producción: `https://tu-dominio.com/reset-password`

### 2. Configurar el Email Template (Opcional)

Para personalizar el email que reciben los usuarios:

1. Ve a **Authentication** > **Email Templates**
2. Selecciona **Reset Password**
3. Personaliza el contenido del email según tus necesidades
4. Asegúrate de mantener la variable `{{ .ConfirmationURL }}` en el template

Ejemplo de template personalizado:

```html
<h2>Restablecer tu contraseña de LINERGY</h2>
<p>Hola,</p>
<p>Recibimos una solicitud para restablecer tu contraseña.</p>
<p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
<p><a href="{{ .ConfirmationURL }}">Restablecer contraseña</a></p>
<p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
<p>Este enlace expira en 1 hora.</p>
```

### 3. Verificar la configuración de Email

1. Ve a **Settings** > **Auth**
2. Asegúrate de que la opción **Enable email confirmations** esté configurada según tus necesidades
3. Para pruebas, puedes usar el servicio de email por defecto de Supabase
4. Para producción, considera configurar un servicio de email personalizado (SMTP)

## Flujo de Usuario

1. **Solicitar recuperación**: El usuario ingresa su email en `/forgot-password`
2. **Recibir email**: Supabase envía un email con un enlace de recuperación
3. **Hacer clic en el enlace**: El usuario es redirigido a `/reset-password`
4. **Ingresar nueva contraseña**: El usuario ingresa y confirma su nueva contraseña
5. **Confirmar**: La contraseña se actualiza y el usuario es redirigido al login

## Seguridad

- Los enlaces de recuperación expiran después de 1 hora (configurable en Supabase)
- Los enlaces solo pueden usarse una vez
- La sesión se invalida después de cambiar la contraseña
- La contraseña debe tener al menos 6 caracteres

## Testing

Para probar la funcionalidad:

1. Ve a `/login` y haz clic en "¿Olvidaste tu contraseña?"
2. Ingresa un email registrado
3. Revisa tu bandeja de entrada (y spam) para el email de recuperación
4. Haz clic en el enlace del email
5. Ingresa y confirma tu nueva contraseña
6. Inicia sesión con la nueva contraseña

## Solución de Problemas

### No recibo el email

- Verifica que el email esté registrado en el sistema
- Revisa la carpeta de spam
- Verifica la configuración de email en Supabase Dashboard
- Revisa los logs en Supabase Dashboard > Logs > Auth Logs

### El enlace no funciona o está expirado

- Los enlaces expiran después de 1 hora
- Cada enlace solo puede usarse una vez
- Solicita un nuevo enlace de recuperación

### Error al actualizar la contraseña

- Verifica que las contraseñas coincidan
- Asegúrate de que la contraseña tenga al menos 6 caracteres
- Verifica que el enlace no haya expirado

## Notas Adicionales

- En desarrollo, Supabase envía emails desde una dirección no personalizada
- Para producción, considera configurar un dominio de email personalizado
- Los emails pueden tardar unos minutos en llegar
- Supabase tiene límites de rate limiting para prevenir abuso
