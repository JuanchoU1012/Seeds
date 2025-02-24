import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../../estilos/RegistroInfo.css";

import { getTokenInfo } from "../../../helpers/getjwt";
import { getUserInfo } from "../../../helpers/getuserinfo";
import { U401 } from "../../components/401";

import dataColombia from "../../../helpers/colombia.json";
import Select from "react-select";

const API = import.meta.env.VITE_REACT_APP_API;

const RegistrarInfo = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [dataDepartamento, setDataDepartamento] = useState([]);
  const [dataCiudad, setDataCiudad] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const userdata = await getUserInfo();
      const token = await getTokenInfo();
      setUserData(userdata);
      setToken(token);
      setIsLoading(false);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (dataColombia) {
      const departamentos = dataColombia.map((departamento) => ({
        id: departamento.id,
        departamento: departamento.departamento,
        ciudades: departamento.ciudades,
      }));
      setDataDepartamento(departamentos);
      console.log("Departamentos cargados:", departamentos); // ✅ Debugging
    }
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    empresa: "",
    imagen: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono" && !/^\d*$/.test(value)) return; // Only numbers for phone
    setFormData({ ...formData, [name]: value.trimStart() });
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, imagen: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleDepartamentoChange = (selectedOption) => {
    console.log("Departamento seleccionado:", selectedOption);

    const selectedDept = dataDepartamento.find((dep) => dep.departamento === selectedOption.label);
    const ciudades = selectedDept ? selectedDept.ciudades : [];

    setFormData((prevData) => ({
      ...prevData,
      departamento: selectedOption.label,
      ciudad: "", // Reset city when department changes
    }));

    setDataCiudad(ciudades);
  };

  const handleCiudadChange = (selectedOption) => {
    setFormData({ ...formData, ciudad: selectedOption.label });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.empresa || !formData.direccion || !formData.departamento || !formData.ciudad) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch(`${API}/guardarInfo`, {
        method: "POST",
        body: formDataToSend, // ✅ Sending correctly formatted data
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Información guardada con éxito.");
        setFormData({
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          direccion: "",
          ciudad: "",
          departamento: "",
          empresa: "",
          imagen: null,
        });
        setPreview(null);
      } else {
        setError(data.message || "Error al guardar la información.");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setError("Error al enviar datos.");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!userData || userData.rol !== 1) {
    return <U401 />;
  }

  return (
    <div className="InfoVendedor">
      <div className="image-container">
        <img src="https://i.pinimg.com/736x/e7/70/0d/e7700d61681c27a3a431e784a66de716.jpg" alt="Imagen" className="imagen" />
      </div>

      <div className="form-container">
        <div className="container">

            <form className="form" onSubmit={handleSubmit}>
                <h2>Datos Personales</h2>
                <input className="input" type="text" name="nombre" placeholder="Nombre" onChange={handleChange} value={formData.nombre} />
                <input className="input" type="text" name="apellido" placeholder="Apellido" onChange={handleChange} value={formData.apellido} />
                <input className="input" type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} value={formData.telefono} />
                <input className="input" type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} />

                <h2>Datos de la Empresa</h2>
                <input className="input" type="text" name="empresa" placeholder="Empresa" onChange={handleChange} value={formData.empresa} />
                <input className="input" type="text" name="direccion" placeholder="Dirección" onChange={handleChange} value={formData.direccion} />

                <Select
                  name="departamento"
                  options={dataDepartamento.map((departamento) => ({ value: departamento.id, label: departamento.departamento }))}
                  className="basic-multi-single"
                  classNamePrefix="select"
                  placeholder="Departamento"
                  onChange={handleDepartamentoChange}
                  value={dataDepartamento.find(dep => dep.departamento === formData.departamento) || null} 
                />

                <Select
                  name="ciudad"
                  options={dataCiudad.map((ciudad) => ({ value: ciudad, label: ciudad }))}
                  className="basic-multi-single"
                  classNamePrefix="select"
                  placeholder="Ciudad"
                  isDisabled={!dataCiudad.length}
                  onChange={handleCiudadChange}
                  value={dataCiudad.find(c => c === formData.ciudad) ? { label: formData.ciudad, value: formData.ciudad } : null} 
                />

                <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} />
                {preview && <div className="preview-container"><img src={preview} alt="Preview" width="200" /></div>}
                <button type="submit" className="btn">Registrar Información</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarInfo;
