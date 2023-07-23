"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { data } from "@/lib/data";

export default function Test() {
  const [search, setSearch] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const handleSearch = (word: { name: string }) => {
    const { name } = word;

    name === ""
      ? setSearch([])
      : setSearch(data.filter((w) => w.includes(name)).slice(0, 3));
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
        search.map((w) => (
          <div key={w}>
            <p>{w}</p>
          </div>
        ))}
    </div>
  );
}
