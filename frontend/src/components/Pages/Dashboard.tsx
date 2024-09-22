import { AreaC } from "../Chart/AreaC";
import { BarC } from "../Chart/BarC";
import LineC from "../Chart/LineC";
import { Line2C } from "../Chart/LineC2";
import { PieC } from "../Chart/PieC";
import { Pie2C } from "../Chart/PieC2";
import { RadarC } from "../Chart/RadarC";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <div className="grid grid-cols-3 gap-4">
        <LineC />
        <BarC />
        <PieC />
        <div className="col-span-3">
          <AreaC />
        </div>
        <Line2C />
        <RadarC />
        <Pie2C />
      </div>
    </div>
  );
};

export default Dashboard;
