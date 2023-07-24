"use client";
import useSWR from "swr";
import axios from "axios";

type Data = {
  name: {
    common: string;
  };
};

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Prueba = () => {
  const apiUrl = "https://restcountries.com/v3/all";
  const { data, error } = useSWR<Data[]>(apiUrl, fetcher);

  if (error) return <div>Error al cargar los datos</div>;
  if (!data) return <div>Cargando...</div>;

  const countries = data.map((country: Data) => country.name.common);

  return (
    <div>
      <h1>Lista de nombres de países</h1>
      <ul>
        {countries.map((name: string, index: number) => (
          <li key={index}>
            {name} {name.length}
          </li>
        ))}
        {countries.length}
      </ul>
    </div>
  );
};

export default Prueba;
