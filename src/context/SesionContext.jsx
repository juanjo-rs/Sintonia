import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_BASE } from "../env";
import { borrarToken, encabezadoAuth, guardarToken, leerToken } from "../sesion";

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(Boolean(leerToken()));

  const refrescar = useCallback(async () => {
    const token = leerToken();
    if (!token) {
      setUsuario(null);
      setCargando(false);
      return null;
    }
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_BASE}/sesion`, {
        headers: { ...encabezadoAuth() },
      });
      if (respuesta.status === 401) {
        borrarToken();
        setUsuario(null);
        return null;
      }
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      const datos = await respuesta.json();
      setUsuario(datos);
      return datos;
    } catch (error) {
      console.error("Error al leer la sesión:", error);
      return null;
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    refrescar();
  }, [refrescar]);

  async function ingresar({ correo, clave, mantenerSesion }) {
    const respuesta = await fetch(`${API_BASE}/sesion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, clave }),
    });

    let datos = null;
    try {
      datos = await respuesta.json();
    } catch {
      datos = null;
    }

    if (!respuesta.ok) {
      const error = new Error(datos?.error?.mensaje || "Error al ingresar");
      error.status = respuesta.status;
      error.codigo = datos?.error?.codigo;
      error.campos = datos?.error?.campos;
      error.retryAfter = respuesta.headers.get("Retry-After");
      throw error;
    }

    guardarToken(datos.token, Boolean(mantenerSesion));
    setUsuario(datos.usuario);
    return datos.usuario;
  }

  async function cerrarSesion() {
    try {
      await fetch(`${API_BASE}/sesion`, {
        method: "DELETE",
        headers: { ...encabezadoAuth() },
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      borrarToken();
      setUsuario(null);
    }
  }

  return (
    <SesionContext.Provider
      value={{ usuario, cargando, ingresar, cerrarSesion, refrescar }}
    >
      {children}
    </SesionContext.Provider>
  );
}

export function useSesion() {
  const valor = useContext(SesionContext);
  if (!valor) throw new Error("SesionProvider requerido");
  return valor;
}
