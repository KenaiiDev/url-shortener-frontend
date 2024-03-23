import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ShortUrlResponse } from "../types/ShortUrl";

function Redirect(): React.ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrl = async (): Promise<void> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
        const result = (await response.json()) as Promise<ShortUrlResponse>;

        if ((await result).data != null) {
          const url = (await result).data.longUrl;
          window.location.href = url;
        }
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    void fetchUrl();
  }, [id]);

  return <div></div>;
}

export default Redirect;
