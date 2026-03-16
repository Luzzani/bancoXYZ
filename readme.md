# 🏦 BancoXYZ - Mobile Challenge

Esta es una aplicación móvil desarrollada con React Native y Expo para la gestión de finanzas personales, permitiendo realizar un login, control de saldo, transferencias inmediatas, programadas y visualización de historial con filtros.

---

# 🔗 Repositorio

**URL del Proyecto**

https://github.com/Luzzani/bancoXYZ

---

# 🚀 Guía de Inicio Rápido

## Requisitos Previos

- **Node.js**: v18 o superior (Recomendado v20)
- **Gestor de paquetes**: npm
- **Expo Go**: Instalado en el dispositivo móvil para pruebas físicas.(Expo go 52)
- **Emulador Android**: Android Studio configurado con un Virtual Device (AVD).
- **Simulador iOS**: Xcode instalado.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Luzzani/bancoXYZ.git
cd bancoXYZ
```

Instalar dependencias:

```bash
npm install
```

---

# ▶️ Ejecución

Iniciar el servidor de desarrollo de Expo:

```bash
npx expo start
```

---

### 🔑 Credenciales de Acceso (Prueba)

> [!IMPORTANT]
> Para acceder a la funcionalidad completa de la aplicación, utilice las siguientes credenciales configuradas en el Mock:
>
> - **Usuario:** `admin@test.com`
> - **Contraseña:** `123456`

---

# 📱 Instrucciones de prueba

### Android (dispositivo físico)

Escanear el **QR** desde la app **Expo Go**.

### iOS (dispositivo físico)

Escanear el **QR** con la cámara del dispositivo.

> ⚠️ Debido al uso de **Expo SDK 52**, es necesario que **Expo Go esté actualizado** a esa versión.

---

## Emuladores

### Android

Presionar:

```
a
```

Requiere **Android Studio** instalado.

### iOS

Presionar:

```
i
```

Requiere **macOS + Xcode**.

---

# 🧪 Testing

La aplicación cuenta con una suite de pruebas enfocada en:

- lógica de negocio
- flujos críticos del usuario

Tecnologías utilizadas:

- **Jest**
- **React Native Testing Library**

Ejecutar tests:

```bash
npm test
```

También se genera **reporte de cobertura**.

---

# 🛠️ Decisiones Técnicas y Arquitectura

## 1. Stack Tecnológico

- **Expo SDK 52**  
  Seleccionado por su estabilidad y por ser el estándar moderno para React Native.

- **Redux Toolkit**  
  Gestión del estado global para:
  - autenticación
  - balance
  - historial de transferencias

- **Axios + Mock Adapter**  
  Implementación de una **API simulada** que persiste datos durante la sesión, permitiendo una experiencia realista donde el saldo se descuenta tras transferencias exitosas.

## 2. Compatibilidad iOS y Diseño

Se siguieron lineamientos **cross-platform estrictos**:

- Uso de **SafeAreaView** para evitar interferencias con el notch
- Manejo de teclado mediante **KeyboardAvoidingView**
  - `padding` en iOS
  - `height` en Android
- Iconografía con **@expo/vector-icons (Ionicons)**
- Unificación de Componentes Nativos: Se desarrolló un componente DatePicker común que abstrae las diferencias de comportamiento entre el DateTimePicker de Android (diálogo nativo) e iOS (inline modal), garantizando una experiencia de usuario consistente y un código mantenible (DRY).

---

# 📋 Requisitos Cumplidos

- [x] Configuración inicial del proyecto Expo
- [x] Pantalla de **Login funcional**
- [x] Visualización de **saldo**
- [x] **Transferencias inmediatas**
- [x] **Transferencias programadas**
- [x] Historial de transferencias
- [x] **Filtros por destinatario, monto y fecha**
- [x] Documentación clara para instalación y ejecución
