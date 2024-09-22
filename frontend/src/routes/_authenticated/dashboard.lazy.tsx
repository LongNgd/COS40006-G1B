import { createLazyFileRoute } from "@tanstack/react-router";
import Dashboard from "../../components/Pages/Dashboard";

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});
