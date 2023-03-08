import CountUp from "react-countup";
import { api } from "~/utils/api";

const COUNT_UP = Math.floor(Math.random() * 1000);

const StatsShowcase = () => {
  const { data: countClicks } = api.apps.getClickStats.useQuery();

  return (
    <div className="stats bg-primary-focus">
      <div className="stat">
        <div className="stat-title">Users who found their app</div>
        <div className="stat-value text-primary-content">
          <CountUp
            duration={1}
            end={countClicks ? countClicks.countTotalClicks : COUNT_UP}
          />
        </div>
        <div className="stat-desc">
          +
          <CountUp
            duration={1}
            end={countClicks ? countClicks.countTotalClicks : COUNT_UP}
          />{" "}
          last month
        </div>
      </div>
    </div>
  );
};

export default StatsShowcase;
