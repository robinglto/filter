"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function Final() {
  const apiUrl = "https://restcountries.com/v3/all";
  const { data, error } = useSWR<Data[]>(apiUrl, fetcher);
  const [search, setSearch] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const handleSearch = (formData: { name: string }) => {
    const { name } = formData;

    !data
      ? setSearch([])
      : setSearch(
          data
            .filter((country) =>
              country.name.common.toLowerCase().includes(name.toLowerCase())
            )
            .map((country) => country.name.common)
            .slice(0, 6)
        );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          type="text"
          className="text-black"
          placeholder="search"
          {...register("name", { required: true })}
        />
        {errors.name && <div>This field is required</div>}
      </form>
      {search.length > 0 &&
        errors.name === undefined &&
        search.map((countryName) => (
          <div key={countryName}>
            <p>{countryName}</p>
          </div>
        ))}
    </div>
  );
}
