import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // #region backend
  const [data, setData] = useState([]);
  const [sid, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getArticulos = async () => {
    try {
      const url = `http://172.16.59.109:3100/api/Articulos`;
      const response = await axios.get(url);
      setData(response.data)
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };
  useEffect(() => {//cuando se renderice el componente por primera vez
    getArticulos();
  }, [])

  const createArticulo = async () => {
    if (nombre === '' || nombre === null || nombre === undefined || precio === '' || precio === null || precio === undefined) {
      alert("Debe tener un nombre y un apellido");
      return;
    } else {
      if (precio > 15000  && precio < 100000) {
        setLoading(true);
        try {
          const response = await axios.post(`http://172.16.59.109:3100/api/articulos`, {
            nombre,
            precio
          });
          alert("Articulo agregado correctamente ...")
          getArticulos();
        } catch (error) {
          console.log(error)
        }
        finally {
          setLoading(false);
        }
      } else{
        alert('El precio debe ser mayor que 15,000 y menor que 100,000');
      }
    }
  };
  const updateArticulo = async (id) => {
    if (nombre === '' || nombre === null || nombre === undefined || precio === '' || precio === null || precio === undefined) {
      alert("Debe tener todos los campos...");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`http://172.16.59.109:3100/api/articulos/${id}`, {
        nombre,
        precio
      });
      alert("Se actualizó el articulo")
      getArticulos();
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };
  const deleteArticulo = async (id) => {
    if (id === '') {
      alert('Debe tener una identificacion.');
    } else {
      setLoading(true);
      try {
        if (window.confirm("Está seguro de eliminar este Articulo?")) {
          const response = await axios.delete(`http://172.16.59.109:3100/api/articulos/${id}`);
          alert("articulo eliminado correctamente ...")
          getArticulos();
          onClean();
        }
      } catch (error) {
        console.log(error)
      }
      finally {
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
      }
      else {
        alert("No se encuentra el id " + id);
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };
  const onClean = () => {
    setNombre('');
    setPrecio('');
    setData([]);
    setId('');
  }
  //#endregion
  // #region frontend
  return (
    <div className="container-fluid">
      {/* navbar */}
      <Navbar></Navbar>
      {/* Banner */}
      <Banner></Banner>
      <form className="container my-5 py-5" id="articulos">
        <h2>Actualizacion de Articulo</h2>
        <div className="row">
          <div className="col">
            <label htmlFor="id">Identificación a Buscar</label>
            <input
              type="text"
              id="sid"
              name="sid"
              placeholder="Identificación del articulo a buscar"
              className="form-control"
              value={sid}
              onChange={e => setId(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Nombre"
              className="form-control"
              onChange={e => setNombre(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={precio}
              placeholder="Precio"
              className="form-control"
              onChange={e => setPrecio(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" type="button" onClick={createArticulo}>Guardar</button>
        <button className="btn btn-success mt-3 mx-3" type="button" onClick={() => getArticuloPorId(sid)}>Buscar</button>
        <button className="btn btn-warning mt-3 mx-3" type="button" onClick={() => updateArticulo(sid)}>Actualizar</button>
        <button className="btn btn-danger mt-3 mx-3" type="button" onClick={() => deleteArticulo(sid)}>Eliminar</button>
        <button className="btn btn-dark mt-3 mx-3" type="button" onClick={getArticulos}>Listar Clientes</button>
        <button className="btn btn-info mt-3 mx-3" type="button" onClick={onClean}>Limpiar Datos</button>
      </form>

      <div className="container my-5 p-5 rounded shadow">
        <table className="table table-hover">
          <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Iva (19%)</th>
          </thead>
          <tbody>
            {data.map(customer => (
              <tr>
                <td>{customer._id}</td>
                <td>{customer.nombre}</td>
                <td>{customer.precio}</td>
                <td>{(customer.precio * 19 / 100) + customer.precio}</td>
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
