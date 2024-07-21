import schedule from "node-schedule";
import pullingCoinData from "./pullingCoinData/pullingCoinData";

const jobManager = () => {
    pullingCoinData();
    schedule.scheduleJob("0 */5 * * * *", function () {
        pullingCoinData();
    });
};

export default jobManager;
