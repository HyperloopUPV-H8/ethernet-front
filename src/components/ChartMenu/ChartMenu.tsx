import styles from "components/ChartMenu/ChartMenu.module.scss";
import { useSelector } from "react-redux";
import Sidebar from "components/ChartMenu/Sidebar/Sidebar";
import lodash from "lodash";
import { ChartList } from "components/ChartMenu/ChartList/ChartList";
import { useMeasurements } from "./useMeasurements";
import { selectNumericPodDataNames } from "./getSidebarTree";

export const ChartMenu = () => {
    const boardNodes = useSelector(selectNumericPodDataNames, lodash.isEqual);
    useMeasurements();

    if (Object.keys(boardNodes).length == 0) {
        return (
            <div className={styles.noValues}>
                No available values to chart. This might happen if none of the
                measurements are numeric (only numeric measurements are
                chartable).
            </div>
        );
    } else {
        return (
            <div className={styles.chartMenuWrapper}>
                <Sidebar boardNodes={boardNodes} />
                <ChartList></ChartList>
            </div>
        );
    }
};
