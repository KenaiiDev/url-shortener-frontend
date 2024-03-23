import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";

import type { ShortUrl, ShortUrlResponse } from "../types/ShortUrl";
import styles from "./FormSearch.module.css";

interface Inputs {
  url: string;
}

function FormSearch(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null);
  const [responseError, setResponseError] = useState<string>("");

  const url = shortUrl?.shortUrl;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const urlData = data.url.split("/").pop();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/info/${urlData}`
      );
      const result = (await response.json()) as Promise<ShortUrlResponse>;

      if ((await result).status === 404) {
        setResponseError("Link not found");
        return;
      }

      if ((await result).status !== 200) {
        setResponseError("An error occurred");
        return;
      }

      setShortUrl((await result).data);
    } catch (error) {
      console.error("Error:", error);
      setResponseError("An error occurred, try again later");
    }
  };

  return (
    <>
      {shortUrl != null && <Navigate to={`/shorter/${url}`} />}
      <form
        className="flex justify-between self-start items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-cumin-900 self-start font-bold text-sm flex flex-col">
          <input
            type="text"
            className={`${styles.input} border outline-none border-cumin-900 rounded-lg text-sm px-2 py-1 text-cumin-900`}
            placeholder="Paste your link to get info!"
            {...register("url", { required: true })}
          ></input>
          {errors.url != null && responseError === "" && (
            <span>This field is required</span>
          )}
          {responseError !== "" && <span>{responseError}</span>}
        </label>
        <button
          className="bg-cumin-900 rounded-lg px-4 py-2 mx-2 self-start text-cumin-200"
          type="submit"
        >
          <svg
            className="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            style={{ color: "white" }}
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </form>
    </>
  );
}

export default FormSearch;
