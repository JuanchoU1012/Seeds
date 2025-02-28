import { useState, useEffect } from "react";
import "../../estilos/RegistroInfo.css";

import { getTokenInfo } from "../../../helpers/getjwt";
import { getUserInfo } from "../../../helpers/getuserinfo";
import { U401 } from "../../components/401";

import dataColombia from "../../../helpers/colombia.json";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const API = import.meta.env.VITE_REACT_APP_API;

const RegistrarInfo = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [dataDepartamento, setDataDepartamento] = useState([]);
  const [dataCiudad, setDataCiudad] = useState([]);
  const [infoexiste, setInfoExiste] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Telefono: "",
    Correo: "",
    NombreComercio: "",
    Direccion: "",
    Ciudad: "",
    Departamento: "",
    image_url: null
  });

  // console.log(userData, 'userdata')
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userdata = await getUserInfo();
        const Token = await getTokenInfo();
        setUserData(userdata);
        setToken(Token);
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

useEffect(() => {
  if (userData) {
    setFormData((prev) => ({
      ...prev,
      Correo: userData.sub,
    }));
  }
}, [userData])

useEffect(()=> {
  const fetchData = async () => { 
  try {
    const response = await fetch(`${API}/vendedores/miinfo`,{
      method: "GET",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': token
      },
    })
    const datacomercio = await response.json();
          if (response.ok && datacomercio[1] === 200 && datacomercio.length > 0) {
            setInfoExiste(true);
            const departamentoActual = dataColombia.find(
              (departamento) => departamento.departamento === datacomercio[0].NombreDep
            );

            const ciudadActual = departamentoActual ? departamentoActual.ciudades :  [];

            setDataCiudad(ciudadActual);

            setFormData((prev) => ({
              ...prev,
              Nombre: datacomercio[0].Nombre || "",
              Apellido: datacomercio[0].Apellidos || "",
              Telefono: datacomercio[0].Telefono || "",
              NombreComercio: datacomercio[0].NombreComercio || "",
              Direccion: datacomercio[0].Direccion || "",
              Ciudad: datacomercio[0].NombreMun || "",
              Departamento: datacomercio[0].NombreDep || "",
              image_url: datacomercio[0].Ruta || null,
            }));
          }
        } catch (error) {
          console.error("Error obteniendo datos del comercio:", error);
        }}
  fetchData();
}, [token])


useEffect(() => {
  if (dataColombia) {
    const departamentos = dataColombia.map(({ id, departamento, ciudades }) => ({
      id,
      label: departamento,
      value: id,
      ciudades,
    }));
    setDataDepartamento(departamentos);
  }
}, []);


console.log("data", formData);
console.log("user", userData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono" && !/^\d*$/.test(value)) return; // Solo números en teléfono
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image_url: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setError("Por favor selecciona una imagen válida.");
    }
  };

  const handleDepartamentoChange = (selectedOption) => {
    const selectedDept = dataDepartamento.find((dep) => dep.label === selectedOption.label);
    setFormData((prev) => ({ ...prev, Departamento: selectedOption.label, Ciudad: "" }));
    setDataCiudad(selectedDept ? selectedDept.ciudades : []);
  };

  const handleCiudadChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, Ciudad: selectedOption.label }));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
    const DataUpdate = new FormData();
    DataUpdate.append("Nombre", formData.Nombre);
    DataUpdate.append("Apellido", formData.Apellido);
    DataUpdate.append("Telefono", formData.Telefono);
    DataUpdate.append("Correo", formData.Correo);
    DataUpdate.append("NombreComercio", formData.NombreComercio);
    DataUpdate.append("Direccion", formData.Direccion);
    DataUpdate.append("Ciudad", formData.Ciudad);
    DataUpdate.append("Departamento", formData.Departamento);
    DataUpdate.append("image_url", formData.image_url);
      const response = await fetch(`${API}/vendedores/info/update/${userData.IdAccesoUsuario}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-Token': token
        },
        body: DataUpdate,
      });
      if (response.ok) {
        setSuccess("Datos actualizados correctamente.");
        setFormData({
          Nombre: "",
          Apellido: "",
          Telefono: "",
          Correo: "",
          NombreComercio: "",
          Direccion: "",
          Ciudad: "",
          Departamento: "",
          image_url: null
        });
        setPreview(null);
        window.location.reload();
      } else {
        setError("Error al actualizar los datos.");
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Nombre || !formData.Correo || !formData.NombreComercio || !formData.Direccion || !formData.Departamento || !formData.Ciudad) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('IdAccesoUsuario', userData.IdAccesoUsuario);
      formDataToSend.append('Nombre', formData.Nombre);
      formDataToSend.append('Apellido', formData.Apellido);
      formDataToSend.append('Telefono', formData.Telefono);
      formDataToSend.append('Correo', formData.Correo);
      formDataToSend.append('NombreComercio', formData.NombreComercio);
      formDataToSend.append('Direccion', formData.Direccion);
      formDataToSend.append('Departamento', formData.Departamento);
      formDataToSend.append('Ciudad', formData.Ciudad);
      
      if(formData.image_url && formData.image_url instanceof File) {
        formDataToSend.append('image_url', formData.image_url);
      }else{
        alert("No se ha seleccionado una imagen");
      }

      const response = await fetch(`${API}/vendedores/info`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Accept': "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      setSuccess("Información guardada con éxito.");
      setFormData({
        Nombre: "",
        Apellido: "",
        Telefono: "",
        Correo: "",
        NombreComercio: "",
        Direccion: "",
        Ciudad: "",
        Departamento: "",
        image_url: null
      });
      setPreview(null);
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setError("Error al enviar datos.");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
}

if (!userData || userData.rol !== 2) {
    return <U401 />;
}


  console.log("infoexist", infoexiste);
  return (
    <div className="InfoVendedor">
      <div className="image-container">
        <NavLink to="/misSemillasVendedor" className="return"> <FontAwesomeIcon icon={faArrowCircleLeft}/> </NavLink>
        <img src="https://i.pinimg.com/736x/e7/70/0d/e7700d61681c27a3a431e784a66de716.jpg" alt="Imagen" className="imagen" />
      </div>

      <div className="form-container">
        <div className="container">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
          <form className="form" onSubmit={infoexiste === true ? handleUpdate : handleSubmit}>
            <h2>Datos Personales</h2>
            <input className="input" type="text" name="Nombre" placeholder="Nombre" onChange={handleChange} value={formData.Nombre} />
            <input className="input" type="text" name="Apellido" placeholder="Apellido" onChange={handleChange} value={formData.Apellido} />
            <input className="input" type="tel" name="Telefono" placeholder="Teléfono" onChange={handleChange} value={formData.Telefono} />
            <input className="input" type="Correo" name="Correo" placeholder= "Correo" value={formData.Correo} readOnly/> 

            <h2>Datos de la Finca o Cultivo</h2>
            <input className="input" type="text" name="NombreComercio" placeholder="Nombre de la Finca" onChange={handleChange} value={formData.NombreComercio} />
            <input className="input" type="text" name="Direccion" placeholder="Dirección" onChange={handleChange} value={formData.Direccion} />

            <Select
              name="Departamento"
              options={dataDepartamento}
              className="basic-multi-single"
              classNamePrefix="select"
              placeholder="Departamento"
              onChange={handleDepartamentoChange}
              value={dataDepartamento.find((dep) => dep.label === formData.Departamento) || formData.Departamento}
            />

            <Select
              name="Ciudad"
              options={dataCiudad.map((Ciudad) => ({ value: Ciudad, label: Ciudad }))}
              className="basic-multi-single"
              classNamePrefix="select"
              placeholder="Ciudad"
              onChange={handleCiudadChange}
              value={dataCiudad.includes(formData.Ciudad) ? { label: formData.Ciudad, value: formData.Ciudad } : formData.Ciudad}
            />

            <input type="file" name="image_url" accept="image/*" onChange={handleImageChange} />
            {preview && <div className="preview-container"><img src={preview} alt="Preview" width="200" /></div>}
            <button type="submit" className="btn">Registrar Información</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarInfo;
