"use client";
import { useState } from "react";

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  return { loading, setLoading, error, setError, success, setSuccess };
};
