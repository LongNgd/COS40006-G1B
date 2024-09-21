import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen grid place-items-center ">
      <p>Dashboard</p>
    </div>
  );
}
