import { useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useTask, useTimer } from "../../store";

export const Task = ({ task }: any) => {
  const {
    removeTask,
    completeTask,
    toggleInProgressState,
    setPomodoroCounter,
  } = useTask();

  const { timerQueue } = useTimer();

  function preventFalseInProgress() {
    if (task.completed) {
      return;
    }
    toggleInProgressState(task.id);
  }

  function getRemainingPomodoro() {
    console.log(task.id, task.pomodoro, task.pomodoroCounter);
    let number = task.pomodoro - task.pomodoroCounter;
    if (number < 0) {
      return 0;
    }
    return number;
  }

  useEffect(() => {
    if (timerQueue === 0) {
      setPomodoroCounter(task.id);
    }
  }, [timerQueue]);

  useEffect(() => {
    if (task.pomodoro < 0) {
      alert(`${task.description} should be completed`);
    }
  }, [task.pomodoro]);

  return (
    <div
      className={`w-full m-1 py-2 px-2 cursor-pointer border-l-4 bg-stone-300 ${
        task.inProgress && !task.completed && "border-yellow-500"
      } ${task.completed && "border-green-500 bg-green-300 line-through"}`}
      onDoubleClick={() => preventFalseInProgress()}
    >
      <h3 className="flex items-center justify-between">
        {task.description}
        <div className="flex justify-end">
          {!task.completed ? (
            <FaCheck
              className={`cursor-pointer ml-2 ${
                task.completed ? "text-green-500" : "text-slate-500"
              }`}
              onClick={() => completeTask(task.id)}
            />
          ) : (
            <RiArrowGoBackFill
              className={`cursor-pointer ml-2 ${
                task.completed ? "text-green-500" : "text-slate-500"
              }`}
              onClick={() => completeTask(task.id)}
            />
          )}
          <FaTimes
            className="text-red-500 cursor-pointer ml-2"
            onClick={() => removeTask(task.id)}
          />
        </div>
      </h3>
      <h3 className="flex items-center justify-between">
        Pomodoro's Left
        <div className="flex justify-end">{getRemainingPomodoro()}</div>
      </h3>
    </div>
  );
};
