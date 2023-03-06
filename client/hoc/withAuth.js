import { Space, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function withAuth(PageComponent) {
  return function WithAuth(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin");
      } else {
        fetch(`${process.env.API_URL}/user/verify-token`, {
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
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            router.push("/admin");
          });
      }
    }, []);
    if (isLoading) {
      return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spin size="large" />
        </div>
      );
    }
    return <PageComponent {...props} />;
  };
}
