import { BarC } from "../Chart/BarC";
import { Line_Graph } from "../Chart/LineC";
import { AreaC2 } from "../Chart/AreaC2";
import { PieC } from "../Chart/PieC";
import { PieC2 } from "../Chart/PieC2";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <div className="grid grid-cols-3 gap-4">
        <Line_Graph />
        <BarC />
        <PieC />
        <div className="col-span-3">
          <AreaC2 />
        </div>
        <PieC2 />
      </div>
    </div>
  );
};

export default Dashboard;
