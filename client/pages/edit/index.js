import React, { useState, useEffect } from "react";
import Router from "next/router";

export default function Edit() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Page</h1>
      <p>This page is protected and can only be accessed when logged in</p>
    </div>
  );
}
