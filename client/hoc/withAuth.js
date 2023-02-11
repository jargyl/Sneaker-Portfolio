import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth(PageComponent) {
  return function WithAuth(props) {
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        fetch("http://localhost:3000/user/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to verify token");
            }
          })
          .catch((error) => {
            console.error(error);
            router.push("/login");
          });
      }
    }, []);

    return <PageComponent {...props} />;
  };
}
