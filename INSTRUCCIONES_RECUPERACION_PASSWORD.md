# Funcionalidad de Recuperación de Contraseña - Guía de Configuración

## ¿Qué se implementó?

Se agregó la funcionalidad completa de "Olvidé mi contraseña" al sistema LINERGY:

1. **Enlace en Login**: Botón "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión
2. **Página de solicitud**: Formulario para ingresar el email y solicitar el enlace de recuperación
3. **Email automático**: Supabase envía un email con enlace de recuperación
4. **Página de reset**: Formulario para ingresar y confirmar la nueva contraseña
5. **Validaciones**: Verificación de contraseñas, sesión válida, y manejo de errores

## URLs del Sistema

- **Login**: `/login`
- **Solicitar recuperación**: `/forgot-password`
- **Restablecer contraseña**: `/reset-password`

## PASO CRÍTICO: Configurar URL de Redirección en Supabase

**ESTO ES OBLIGATORIO PARA QUE FUNCIONE**

1. Ve a: https://app.supabase.com/project/zsleyqejarzynwjrufuo/auth/url-configuration

2. En la sección **Redirect URLs**, agrega las siguientes URLs:

   **Para desarrollo local:**
   ```
   http://localhost:5173/reset-password
   ```

   **Para producción:** (reemplaza con tu dominio real)
   ```
   https://tu-dominio.com/reset-password
   ```

3. Haz clic en **Save** para guardar los cambios

### ¿Por qué es necesario?

Supabase solo permite redirigir a URLs que estén en la lista blanca por seguridad. Sin agregar la URL, el enlace del email no funcionará.

## Cómo Usar la Funcionalidad

### Para Usuarios

1. En la página de login, haz clic en "¿Olvidaste tu contraseña?"
2. Ingresa tu correo electrónico registrado
3. Haz clic en "Enviar enlace de recuperación"
4. Revisa tu correo (puede estar en spam)
5. Haz clic en el enlace del correo
6. Ingresa tu nueva contraseña dos veces
7. Haz clic en "Actualizar contraseña"
8. Serás redirigido automáticamente al login

### Para Testing

```bash
# 1. Asegúrate de tener la URL configurada en Supabase
# 2. Inicia el servidor de desarrollo
npm run dev

# 3. Ve a http://localhost:5173/login
# 4. Haz clic en "¿Olvidaste tu contraseña?"
# 5. Usa un email que esté registrado en el sistema
```

## Seguridad Implementada

- Los enlaces expiran después de 1 hora
- Cada enlace solo puede usarse una vez
- Validación de sesión antes de permitir cambio de contraseña
- Contraseña mínima de 6 caracteres
- Confirmación de contraseña (debe coincidir)
- Manejo seguro de errores sin exponer información sensible
- Uso de Supabase Auth (seguridad enterprise-level)

## Personalización de Emails (Opcional)

Puedes personalizar el email que reciben los usuarios:

1. Ve a: https://app.supabase.com/project/zsleyqejarzynwjrufuo/auth/templates
2. Selecciona "Reset Password"
3. Personaliza el HTML del email
4. Mantén la variable `{{ .ConfirmationURL }}` en el template

## Solución de Problemas Comunes

### "No recibo el email"

- ✅ Verifica que el email esté registrado en el sistema
- ✅ Revisa la carpeta de spam/correo no deseado
- ✅ Verifica que hayas agregado la URL de redirect en Supabase
- ✅ Espera 1-2 minutos (puede tardar)

### "El enlace dice 'inválido o expirado'"

- ✅ Los enlaces expiran después de 1 hora
- ✅ Cada enlace solo funciona una vez
- ✅ Solicita un nuevo enlace desde `/forgot-password`

### "Las contraseñas no coinciden"

- ✅ Asegúrate de escribir exactamente la misma contraseña en ambos campos
- ✅ La contraseña debe tener al menos 6 caracteres

### "Error al actualizar"

- ✅ Verifica que el enlace no haya expirado
- ✅ Asegúrate de estar usando el enlace más reciente
- ✅ Revisa que las contraseñas cumplan los requisitos

## Archivos Modificados/Creados

```
src/pages/ForgotPasswordPage.tsx          [NUEVO] - Solicitar recuperación
src/pages/ResetPasswordPage.tsx           [NUEVO] - Restablecer contraseña
src/pages/LoginPage.tsx                   [MODIFICADO] - Agregado enlace
src/App.tsx                               [MODIFICADO] - Agregadas rutas
CONFIGURACION_EMAIL_RECUPERACION.md       [NUEVO] - Documentación técnica
INSTRUCCIONES_RECUPERACION_PASSWORD.md    [NUEVO] - Este archivo
```

## Notas Técnicas

- **Stack**: React + TypeScript + Supabase Auth
- **Autenticación**: Supabase `resetPasswordForEmail` y `updateUser`
- **Routing**: React Router v7
- **Estilos**: Mantiene el diseño existente del sistema
- **Validación**: Frontend + validación automática de Supabase
- **Rate Limiting**: Supabase maneja automáticamente el rate limiting

## Próximos Pasos Recomendados (Opcional)

1. **Email Personalizado**: Configurar SMTP propio en Supabase para emails con tu dominio
2. **Rate Limiting Visual**: Agregar contador para mostrar cuándo puede solicitar otro email
3. **Expiración Personalizada**: Ajustar el tiempo de expiración del enlace (actualmente 1 hora)
4. **Historial de Cambios**: Log de cambios de contraseña en la tabla de auditoría
5. **2FA**: Implementar autenticación de dos factores para mayor seguridad

## Soporte

Si tienes problemas:
1. Revisa los logs en Supabase Dashboard > Logs > Auth Logs
2. Verifica la consola del navegador para errores JavaScript
3. Asegúrate de que la URL de redirect esté correctamente configurada
4. Revisa este documento y CONFIGURACION_EMAIL_RECUPERACION.md

---

**¿Listo para probar?** Asegúrate de configurar la URL de redirección en Supabase primero.
