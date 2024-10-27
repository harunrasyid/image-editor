import { useState } from "react";

export function useLoading(initial?: boolean) {
  const [isLoading, setLoading] = useState<boolean>(initial ?? false); // If initial not specified, default false

  return {
    isLoading,
    setLoading,
  };
}
