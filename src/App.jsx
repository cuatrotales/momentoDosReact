import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  // #region backend
  const [data, setData] = useState([]);
  const [sid, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [setLoading] = useState(true);

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

  const getArticulos = async () => {
    try {
      const url = `http://172.16.59.109:3100/api/Articulos`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    //cuando se renderice el componente por primera vez
    getArticulos();
  }, []);

  const createArticulo = async () => {
    if (
      nombre === "" ||
      nombre === null ||
      nombre === undefined ||
      precio === "" ||
      precio === null ||
      precio === undefined
    ) {
      alert("Debe tener un nombre y un apellido");
      return;
    } else {
      if (precio > 15000 && precio < 100000) {
        setLoading(true);
        try {
          const response = await axios.post(
            `http://172.16.59.109:3100/api/articulos`,
            {
              nombre,
              precio,
            }
          );
          alert("Articulo agregado correctamente ...");
          getArticulos();
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        alert("El precio debe ser mayor que 15,000 y menor que 100,000");
      }
    }
  };
  const updateArticulo = async (id) => {
    if (
      nombre === "" ||
      nombre === null ||
      nombre === undefined ||
      precio === "" ||
      precio === null ||
      precio === undefined
    ) {
      alert("Debe tener todos los campos...");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `http://172.16.59.109:3100/api/articulos/${id}`,
        {
          nombre,
          precio,
        }
      );
      alert("Se actualiz?? el articulo");
      getArticulos();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteArticulo = async (id) => {
    if (id === "") {
      alert("Debe tener una identificacion.");
    } else {
      setLoading(true);
      try {
        if (window.confirm("Est?? seguro de eliminar este Articulo?")) {
          const response = await axios.delete(
            `http://172.16.59.109:3100/api/articulos/${id}`
          );
          alert("articulo eliminado correctamente ...");
          getArticulos();
          onClean();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const getArticuloPorId = async (id) => {
    try {
      const url = `http://172.16.59.109:3100/api/articulos/${id}`;
      const response = await axios.get(url);
      if (response.data.nombre != null) {
        setNombre(response.data.nombre);
        setPrecio(response.data.precio);
      } else {
        alert("No se encuentra el id " + id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onClean = () => {
    setNombre("");
    setPrecio("");
    setData([]);
    setId("");
  };
  //#endregion
  // #region frontend
  return (
    <div className="container-fluid">
      {/* navbar */}
      <Navbar></Navbar>
      {/* Banner */}
      <Banner></Banner>
      <form
        className="container my-5 py-5"
        id="articulos"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Actualizacion de Articulo</h2>
        <div className="row">
          <div className="col">
            <label htmlFor="id">Identificaci??n a Buscar</label>
            <input
              //reglas de validacion
              {...register("id", {
                maxLength: 250,
                minLength: 4,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){4,250}$/,
              })}
              name="id"
              type="text"
              id="id"
              placeholder="Identificaci??n del articulo a buscar"
              className="form-control"
              value={sid}
              onChange={(e) => setId(e.target.value)}
            />
            <span className="text-danger text-small d-block my-2">
              {errors.id?.type === "maxLength" &&
                "Debe ser inferior o igual a 250 chars"}
              {errors.id?.type === "minLength" && "Debe ser superior a 4 chars"}
              {errors.id?.type === "pattern" && "Id incorrecto"}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="nombre">Nombre</label>
            <input
              {...register("nombre", {
                required: true,
                maxLength: 60,
                minLength: 3,
                pattern: /^[A-Za-z ]+$/i,
              })}
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Nombre"
              className="form-control"
              onChange={(e) => setNombre(e.target.value)}
            />
            <span className="text-danger text-small d-block my-2">
              {errors.nombre?.type === "required" && "nombre es obligatorio"}
              {errors.nombre?.type === "maxLength" &&
                "Debe ser inferior o igual a 60 chars"}
              {errors.nombre?.type === "minLength" &&
                "Debe ser superior a 3 chars"}
              {errors.nombre?.type === "pattern" && "Nombre incorrecto"}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="precio">Precio</label>
            <input
              {...register("precio", {
                required: true,
                maxLength: 10,
                minLength: 4,
                pattern: / ^ (?: [1-9] [0-9]? | 1 [01] [0-9] | 120) $ /,
              })}
              type="number"
              id="precio"
              name="precio"
              value={precio}
              placeholder="Precio"
              className="form-control"
              onChange={(e) => setPrecio(e.target.value)}
            />
            <span className="text-danger text-small d-block my-2">
              {errors.precio?.type === "required" && "Precio es obligatorio"}
              {errors.precio?.type === "maxLength" &&
                "Debe ser inferior o igual a 10 chars"}
              {errors.precio?.type === "minLength" &&
                "Debe ser superior a 4 chars"}
              {errors.precio?.type === "pattern" && "Precio incorrecto"}
            </span>
          </div>
        </div>
        <button
          className="btn btn-outline-primary mt-3"
          type="submit"
          onClick={createArticulo}
        >
          Guardar
        </button>
        <button
          className="btn btn-outline-success mt-3 mx-3"
          type="submit"
          onClick={() => getArticuloPorId(sid)}
        >
          Buscar
        </button>
        <button
          className="btn btn-outline-warning mt-3 mx-3"
          type="submit"
          onClick={() => updateArticulo(sid)}
        >
          Actualizar
        </button>
        <button
          className="btn btn-outline-danger mt-3 mx-3"
          type="submit"
          onClick={() => deleteArticulo(sid)}
        >
          Eliminar
        </button>
        <button
          className="btn btn-outline-primary mt-3 mx-3"
          type="submit"
          onClick={getArticulos}
        >
          Listar Articulos
        </button>
        <button
          className="btn btn-outline-info mt-3 mx-3"
          type="submit"
          onClick={onClean}
        >
          Limpiar Datos
        </button>
      </form>

      <div className="container my-5 p-5 rounded shadow">
        <table className="table table-hover">
          <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Precio + Iva</th>
            <th>Iva (19%)</th>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr>
                <td>{customer._id}</td>
                <td>{customer.nombre}</td>
                <td>{customer.precio}</td>
                <td>{(customer.precio * 19) / 100 + customer.precio}</td>
                <td>{(customer.precio * 19) / 100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  //#endregion
}

export default App;
