"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Search() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  async function handleSearch(word: { name: string }) {
    const { name } = word;
    if (name === "") {
      setSearchResults([]);
    } else {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const filtro = data.filter(
              (country) =>
                country.name.common
                  .toLowerCase()
                  .indexOf(name.toLowerCase()) !== -1
            );
            setSearchResults(
              filtro.map((country) => country.name.common).slice(0, 8)
            );
          } else {
            setSearchResults([]);
          }
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data from the API:", error);
        setSearchResults([]);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          type="text"
          placeholder="search"
          {...register("name", { required: true })}
        />
        {errors.name && <div>This field is required</div>}
      </form>
      {searchResults.length > 0 && errors.name === undefined && (
        <div>
          {searchResults.map((result) => (
            <div key={result}>
              <p>{result}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
