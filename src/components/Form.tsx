import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiAlumnos from "../views/ApiAlumnos";
import { useState } from "react";

interface iDatos {
  sCarnet: string;
  sNombre: string;
  sCorreo: string;
  sSeccion: string;
}

function Form() {
  const [searchParams, setSearchParams] = useState<iDatos | null>(null);
  const [triggerSearch, setTriggerSearch] = useState(false);  // Nueva variable de estado

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<iDatos>();

  const onSubmit: SubmitHandler<iDatos> = (data) => {
    setSearchParams({ ...data, sNombre: "", sCorreo: "", sSeccion: "" });
    setTriggerSearch(true);  // Se activa la búsqueda
  };

  const handleLimpiar = () => {
    reset();
    setSearchParams(null);
    setTriggerSearch(false);  // Se desactiva la búsqueda
  };

  const handleCancelar = () => {
    setSearchParams(null);
    setTriggerSearch(false);  // Se desactiva la búsqueda
  };

  const handleResult = (data: { Estudiante: string; Email: string; Seccion: string }) => {
    setSearchParams((prev) =>
      prev ? { ...prev, sNombre: data.Estudiante, sCorreo: data.Email, sSeccion: data.Seccion } : null
    );
    setTriggerSearch(false);  // Se desactiva la búsqueda después de obtener el resultado
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ fontFamily: "Product Sans", fontSize: "25px" }}
    >
      <div
        className="card w-100 rounded-4 position-relative"
        style={{ maxWidth: "800px", backgroundColor: "#d5dbdb" }}
      >
        <img
          src="/public/logoumg.png"
          alt="Logo UMG"
          className="position-absolute top-0 end-0 m-3"
          style={{ width: "150px", height: "auto", borderRadius: "8px" }}
        />
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
              <h1 className="text-center mb-4">Consulta de alumnos</h1>
            </div>

            <div className="col-md-6 offset-md-3">
              <div className="mb-3">
                <label htmlFor="txtCarnet">Carnet: </label>
                <input
                  id="txtCarnet"
                  className={`form-control rounded-4 ${
                    errors.sCarnet ? "is-invalid" : ""
                  }`}
                  type="text"
                  {...register("sCarnet", {
                    required: true,
                  })}
                />
                {errors.sCarnet?.type === "required" && (
                  <div className="invalid-feedback">
                    <span>Es obligatorio llenar este campo</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="txtNombre">Nombre: </label>
                <input
                  id="txtNombre"
                  className="form-control rounded-4"
                  type="text"
                  disabled={true}
                  value={searchParams?.sNombre || ""}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="txCorreo">Correo electrónico: </label>
                <input
                  id="txCorreo"
                  className="form-control rounded-4"
                  type="email"
                  disabled={true}
                  value={searchParams?.sCorreo || ""}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="txSeccion">Sección: </label>
                <input
                  id="txSeccion"
                  className="form-control rounded-4"
                  type="text"
                  disabled={true}
                  value={searchParams?.sSeccion || ""}
                />
              </div>
            </div>

            <div className="col-12 text-center">
              <div className="d-inline-flex">
                <Button texto="Buscar" onClick={handleSubmit(onSubmit)} />
                <Button texto="Limpiar" onClick={handleLimpiar} />
                <Button texto="Cancelar" onClick={handleCancelar} />
              </div>
            </div>
          </form>

          {searchParams && triggerSearch && (
            <ApiAlumnos sCarnet={searchParams.sCarnet} onResult={handleResult} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;