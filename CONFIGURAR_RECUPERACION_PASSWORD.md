# Configuración de Recuperación de Contraseña

## Problema: "No se puede conectar con el servidor"

Este error aparece porque las URLs de redirección no están configuradas en Supabase Auth.

## Solución: Configurar URLs de Redirección en Supabase

### Paso 1: Acceder a la configuración de Supabase

1. Ve a: https://app.supabase.com/project/zsleyqejarzynwjrufuo/auth/url-configuration

### Paso 2: Agregar URLs de Redirección

En la sección **"Redirect URLs"**, agrega las siguientes URLs:

#### Para desarrollo local:
```
http://localhost:5173/reset-password
```

#### Para producción (cuando despliegues):
```
https://tu-dominio.com/reset-password
```

### Paso 3: Guardar cambios

Haz clic en **"Save"** para aplicar los cambios.

## Verificación

1. Ve a `/forgot-password` en tu aplicación
2. Ingresa un correo electrónico registrado
3. Haz clic en "Enviar enlace de recuperación"
4. Revisa tu correo (puede estar en spam)
5. Haz clic en el enlace del correo
6. Deberías ser redirigido a `/reset-password`

## Nota Importante

**SIN ESTA CONFIGURACIÓN, LA RECUPERACIÓN DE CONTRASEÑA NO FUNCIONARÁ.**

Supabase bloquea las redirecciones a URLs que no están en la lista blanca por razones de seguridad.
