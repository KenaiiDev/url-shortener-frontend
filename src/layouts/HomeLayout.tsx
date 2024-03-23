import React from "react";
import { Link } from "react-router-dom";

import FormSearch from "../components/FormSearch";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="w-screen h-screen px-4 py-6 bg-cumin-50">
      <main className="w-full  max-w-xl px-4 py-8 mx-auto h-full flex flex-col justify-center relative z-20">
        <nav className="w-full max-w-xl absolute top-0 left-0 flex justify-between items-center">
          <Link to="/" className="self-start">
            <h1 className="text-cumin-900 mx-auto font-bold text-xl sm:text-2xl">
              SHORTER!
            </h1>
          </Link>
          <FormSearch />
        </nav>
        {children}
      </main>
    </div>
  );
}
