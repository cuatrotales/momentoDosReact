import { useState } from "react"; 
import { useForm } from "react-hook-form";

export default function User() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [inputs, setInputs] = useState([]);
  //metodo para realizar las validaciones al escribir enviar
  const onSubmit = (data, e) => {
    console.log(data);
    setInputs([...inputs, data]);
    e.target.reset();
  };

  return (
    <div className="container">
      <h1>Formulario React con Validaciones</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nombres</label>
        <input
          //reglas de validacion
          {...register("name", {
            required: true,
            maxLength: 50,
            minLength: 3,
            pattern: /^[A-Za-z ]+$/i,
          })}
          name="name"
          className="form-control my-2"
          placeholder="Ingrese Nombre"
        ></input>
        <span className="text-danger text-small d-block mb-2">
          {errors.name?.type === "required" && "Nombre es obligatorio"}
          {errors.name?.type === "maxLength" &&
            "Debe ser inferior o igual a 50 chars"}
          {errors.name?.type === "minLength" && "Debe ser superior a 3 chars"}
          {errors.name?.type === "pattern" && "Solo letras y/o espacios"}
        </span>
        <label>Apellidos</label>
        <input
          {...register("lastname", {
            required: true,
            maxLength: 50,
            minLength: 3,
            pattern: /^[A-Za-z ]+$/i,
          })}
          name="lastname"
          className="form-control my-2"
          placeholder="Ingrese Apellidos"
        ></input>
        <span className="text-danger text-small d-block mb-2">
          {errors.lastname?.type === "required" && "Apellidos es obligatorio"}
          {errors.lastname?.type === "maxLength" &&
            "Debe ser inferior o igual a 50 chars"}
          {errors.lastname?.type === "minLength" &&
            "Debe ser superior a 3 chars"}
          {errors.lastname?.type === "pattern" && "Solo letras y/o espacios"}
        </span>
        <label>Correo Electrónico</label>
        <input
          {...register("email", {
            required: true,
            maxLength: 100,
            minLength: 10,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          className="form-control my-2"
          placeholder="Ingrese Email"
        ></input>
        <span className="text-danger text-small d-block mb-2">
          {errors.email?.type === "required" && "Email es obligatorio"}
          {errors.email?.type === "maxLength" &&
            "Debe ser inferior o igual a 100 chars"}
          {errors.email?.type === "minLength" && "Debe ser superior a 10 chars"}
          {errors.email?.type === "pattern" && "Email Inválido"}
        </span>

        <label>password</label>
        <input
          //reglas de validacion
          {...register("password", {
            required: true,
            maxLength: 15,
            minLength: 6,
            pattern: /^[A-Za-z0-9!_.-]{8,12}$/,
          })}
          type="password"
          name="password"
          className="form-control my-2"
          placeholder="Ingrese password"
        ></input>
        <span className="text-danger text-small d-block mb-2">
          {errors.password?.type === "required" && "password es obligatorio"}
          {errors.password?.type === "pattern" &&
            "letras simbolos sin espacios"}
        </span>

        <label>edad</label>
        <input
          //reglas de validacion
          {...register("edad", {
            required: true,
            maxLength: 100,
            minLength: 1,
            pattern: / ^ (?: [1-9] [0-9]? | 1 [01] [0-9] | 120) $ /,
          })}
          type="text"
          name="text"
          className="form-control my-2"
          placeholder="edad"
        ></input>
        <span className="text-danger text-small d-block mb-2">
          {errors.edad?.type === "pattern" && "edad es obligatorio"}
          {errors.edad?.type === "required" && "la edad es obligatorio"}
          {errors.edad?.type === "min" && "Debe ser superior a 10 chars"}
          {errors.edad?.type === "max" && "edad Inválido"}
        </span>

        <button type="submit" className="btn btn-primary my-2">
          Agregar
        </button>
      </form>
      {/* <ul className="mt-2">
                {
                    inputs.map((item, index) =>
                        <li key={index}>
                            {item.name} - {item.lastname}
                        </li>
                    )
                }
            </ul> */}
    </div>
  );
}
