import React, { type ReactElement, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import type { ShortUrl, ShortUrlResponse } from "../types/ShortUrl";
import Layout from "../layouts/HomeLayout";

export default function Shorter(): ReactElement {
  const { id } = useParams();

  const [shortUrlData, setShortUrlData] = useState<ShortUrl | null>(null);
  const [errorData, setErrorData] = useState<any>(null);

  useEffect(() => {
    const fetchShortUrl = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/info/${id}`
        );
        const result = (await response.json()) as Promise<ShortUrlResponse>;

        console.log({ result });

        setShortUrlData((await result).data);
      } catch (err) {
        const error = err as Error;
        setErrorData(error.message);
      }
    };

    void fetchShortUrl();
  }, [id]);

  if (id == null) {
    return <Navigate to="/" />;
  }

  if (errorData !== null) {
    return (
      <Layout>
        <section className="w-full text-rose-700 font-bold">
          <h1 className="text-4xl text-center my-4">Error</h1>
          <p>{errorData}, please try again</p>
        </section>
      </Layout>
    );
  }

  const actualUrl = new URL(window.location.href);

  return (
    <Layout>
      <section className="w-full">
        <h1 className="text-4xl">Your shortened url is:</h1>
        {shortUrlData != null && (
          <a
            href={`${actualUrl.origin}/${shortUrlData.shortUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-xl text-blue-500 hover:underline"
          >
            {`${actualUrl.origin}/${shortUrlData.shortUrl}`}
          </a>
        )}
        <p>It has been clicked {shortUrlData?.visits} times!</p>
      </section>
    </Layout>
  );
}
