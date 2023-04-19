import styles from "./TimestampView.module.scss";
import { Timestamp } from "models/ProtectionMessage";

type Props = {
    timestamp: Timestamp;
    className: string;
};

export const TimestampView = ({ timestamp, className }: Props) => {
    return (
        <div className={`${styles.timestamp} ${className}`}>
            {getTimestampString(timestamp)}
        </div>
    );
};

function getTimestampString(timestamp: Timestamp): string {
    return `${timestamp.hours}:${timestamp.minutes}:${timestamp.seconds} ${timestamp.day}/${timestamp.month}/${timestamp.year}`;
}