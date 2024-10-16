import { createLazyFileRoute } from "@tanstack/react-router";
import Dashboard from "../../components/Dashboard/Dashboard";

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});
