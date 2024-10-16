import { createLazyFileRoute } from "@tanstack/react-router";
import Report from "../../components/Report/Report";

export const Route = createLazyFileRoute("/_authenticated/report")({
  component: Report,
});
