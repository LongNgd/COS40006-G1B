import { createFileRoute, redirect } from "@tanstack/react-router";
import Homepage from '../components/homepage/Homepage'; 

export const Route = createFileRoute("/")({
  beforeLoad({ context }) {
    const { isLogged } = context.auth;
    if (isLogged()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Homepage,
});
