import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContext } from "../hooks/useAuth.hook";

type RouteContext = {
  auth: AuthContext;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => {
    return (
      <div className="min-h-screen bg-[url('assets/background.jpg')]">
        <Outlet />
      </div>
    );
  },
});
