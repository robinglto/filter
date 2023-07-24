"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import axios from "axios";
import { useDebounce } from "use-debounce";

type Data = {
  name: {
    common: string;
  };
};

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {}
};

export default function Final() {
  const apiUrl = "https://restcountries.com/v3/all";
  const { data } = useSWR<Data[]>(apiUrl, fetcher);

  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [debouncedSearch] = useDebounce(searchResults, 1000);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const handleSearch = (formData: { name: string }) => {
    const { name } = formData;

    if (!data || name.trim().length === 0) {
      setSearchResults([""]);
    } else {
      setSearchResults(
        data
          .filter((country) =>
            country.name.common.toLowerCase().includes(name.toLowerCase())
          )
          .map((country) => country.name.common)
          .slice(0, 6)
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        onChange={handleSubmit(handleSearch)}
      >
        <input
          type="text"
          autoComplete="off"
          className="text-black"
          placeholder="buscar"
          {...register("name", { required: true })}
        />
        {errors.name && <div>Este campo es obligatorio</div>}
      </form>
      {searchResults.length > 0 &&
        errors.name === undefined &&
        debouncedSearch.map((nombrePais) => (
          <div key={nombrePais}>
            <p>{nombrePais}</p>
          </div>
        ))}
    </div>
  );
}
