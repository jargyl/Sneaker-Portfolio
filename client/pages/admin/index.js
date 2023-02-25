import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, InputNumber, message } from "antd";
import { API_URL } from "@/config";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setSubmitting(false);
        localStorage.setItem("token", data.token);
        router.push("/edit");
      } else {
        setSubmitting(false);
        message.error("Invalid username or password");
      }
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 rounded-xl bg-slate-100 p-4">
      <Form onFinish={handleSubmit}>
        <Form.Item name="username">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item className="mb-0 flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            loading={submitting}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
