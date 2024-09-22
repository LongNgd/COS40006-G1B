import { createLazyFileRoute } from "@tanstack/react-router";
import Report from "../../components/Pages/Report";

export const Route = createLazyFileRoute("/_authenticated/report")({
  component: Report,
});
