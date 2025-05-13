"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const HomePage =  () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return <>{JSON.stringify(data?.user, null, 2)}</>;
};
export default HomePage;
