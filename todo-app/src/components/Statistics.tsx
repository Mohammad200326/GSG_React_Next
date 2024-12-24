import "./styles/statistics.css";

interface IProps {
  createdTasks: number;
  urgentTasks: number;
  completedTasks: number;
}
const Statistics = (props: IProps) => {
  return (
    <div className="statistics">
      <div className="created">
        <p>
          {props.createdTasks
            ? props.createdTasks.toString().padStart(2, "0")
            : 0}
        </p>
        <p>Created Tasks</p>
      </div>
      <div className="completed">
        <p>
          {props.completedTasks
            ? props.completedTasks.toString().padStart(2, "0")
            : 0}
        </p>
        <p>Completed Tasks</p>
      </div>
      <div className="urgent">
        <p>
          {props.urgentTasks
            ? props.urgentTasks.toString().padStart(2, "0")
            : 0}
        </p>
        <p>Urgent Tasks</p>
      </div>
    </div>
  );
};

export default Statistics;
