import { createFileRoute, redirect } from "@tanstack/react-router";
import Layout from "../components/Layout/Layout";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth;
    if (!isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Layout,
});
