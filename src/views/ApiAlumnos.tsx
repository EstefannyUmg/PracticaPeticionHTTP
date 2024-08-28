import { useEffect, useState } from "react";

interface iParametros {
  sCarnet: string;
  onResult: (data: { Estudiante: string; Email: string; Seccion: string }) => void;
}

function ApiAlumnos({ sCarnet, onResult }: iParametros) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sCarnet) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://test-deploy-12.onrender.com/estudiantes/${sCarnet}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }

        const data = await response.json();
        console.log(data);
        const alumnoData = data[0];
        if (alumnoData) {
          onResult(alumnoData);
        } else {
          setError("No se encontraron datos");
        }
      }  finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sCarnet, onResult]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return null;
}

export default ApiAlumnos;