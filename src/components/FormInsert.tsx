import React, { type ReactElement, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";

import type { ShortUrl, ShortUrlResponse } from "../types/ShortUrl";

interface Inputs {
  url: string;
}

function Form(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shorter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as Promise<ShortUrlResponse>;

      setShortUrl((await result).data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred, try again later");
      }
    }
  };

  if (shortUrl != null) {
    return <Navigate to={`/shorter/${shortUrl.shortUrl}`} />;
  }

  return (
    <form
      className="w-full max-w-xl mx-auto flex flex-col justify-center align-middle"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-cumin-900 font-bold text-xl">
        Paste your link here:
        <input
          className="w-full border outline-none border-cumin-900 rounded-lg px-4 py-2 text-cumin-900 font-bold text-xl"
          {...register("url", { required: true })}
          placeholder="https://example.com"
          type="url"
        />
        {errors.url != null && <span>This field is required</span>}
      </label>
      <button
        className="w-full bg-cumin-900 rounded-lg px-4 py-2 text-cumin-200 font-bold text-xl mt-4"
        type="submit"
      >
        Shorten
      </button>
      {error !== null && (
        <span className="text-rose-700 font-bold">ERROR: {error}</span>
      )}
    </form>
  );
}

export default Form;
