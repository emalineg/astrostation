import { useState } from "react";
import {
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useMaxPomodoro,
  useStationPluginsStore,
  StationPlugin,
} from "../../store";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Common/Button";
import { ToggleOption } from "./ToggleOption";
export const TimerSettings = () => {
  const { shortBreakLength, defaultShortBreakLength, setShortBreak } =
    useShortBreakTimer();
  const { longBreakLength, defaultLongBreakLength, setLongBreak } =
    useLongBreakTimer();
  const { pomodoroLength, defaultPomodoroLength, setPomodoroLength } =
    usePomodoroTimer();
  const { maxPomodoro, defaultMaxPomodoro, setMaxPomodoro } = useMaxPomodoro();
  const { hasStarted } = useHasStarted();

  const [pomoCount, setPomoCount] = useState(pomodoroLength);
  const [shortBreak, setShortBreakState] = useState(shortBreakLength);
  const [longBreak, setLongBreakState] = useState(longBreakLength);
  const [maxPomo, setMaxPomo] = useState(maxPomodoro);

  const { remove: removePlugin } = useStationPluginsStore();

  function onSubmit() {
    setShortBreak(shortBreak);
    setLongBreak(longBreak);
    setPomodoroLength(pomoCount);
    setMaxPomodoro(maxPomo);
    removePlugin(StationPlugin.TimerSettings);
  }

  function handleDefaults() {
    if (hasStarted) return;

    alert("Are you sure you want to reset to defaults?");
    defaultShortBreakLength();
    defaultLongBreakLength();
    defaultPomodoroLength();
    defaultMaxPomodoro();
  }

  function handleLengthChange(
    e: any,
    decrement: string,
    increment: string,
    minLength: number,
    maxLength: number,
    propertyLength: number,
    setStateFunc: any,
    step: number
  ) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === decrement && propertyLength > minLength) {
      setStateFunc(propertyLength - step);
    } else if (e.target.id === increment && propertyLength < maxLength) {
      setStateFunc(propertyLength + step);
    }
  }

  return (
    <div className="p-4">
      <div className="border-b-2 border-gray-100 p-2">
        <div className="flex justify-end">
          <IoCloseSharp
            className="text-red-500 cursor-pointer hover:bg-red-200"
            onClick={() => removePlugin(StationPlugin.TimerSettings)}
          />
        </div>
        <div className="text-center p-2 rounded">Time (minutes)</div>
        <div className="flex justify-between items-center">
          <ToggleOption
            title="Pomodoro"
            decrement="session-decrement"
            increment="session-increment"
            onClick={(e) =>
              handleLengthChange(
                e,
                "session-decrement",
                "session-increment",
                60,
                3600,
                pomoCount,
                setPomoCount,
                60
              )
            }
            propertyLength={Math.floor(pomoCount / 60)}
          />
          <ToggleOption
            title="Short Break"
            decrement="short-break-decrement"
            increment="short-break-increment"
            onClick={(e) =>
              handleLengthChange(
                e,
                "short-break-decrement",
                "short-break-increment",
                60,
                3600,
                shortBreak,
                setShortBreakState,
                60
              )
            }
            propertyLength={Math.floor(shortBreak / 60)}
          />
          <ToggleOption
            title="Long Break"
            decrement="long-break-decrement"
            increment="long-break-increment"
            onClick={(e) =>
              handleLengthChange(
                e,
                "long-break-decrement",
                "long-break-increment",
                60,
                3600,
                longBreak,
                setLongBreakState,
                60
              )
            }
            propertyLength={Math.floor(longBreak / 60)}
          />
        </div>
      </div>
      <div className="flex justify-between border-b-2 border-gray-100 p-2 items-center">
        <div>Max Pomodoro's</div>
        <div className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
          <div className="flex p-2 space-x-5">
            <button
              id="pomodoro-decrement"
              onClick={(e) =>
                handleLengthChange(
                  e,
                  "pomodoro-decrement",
                  "pomodoro-increment",
                  1,
                  10,
                  maxPomo,
                  setMaxPomo,
                  1
                )
              }
            >
              &lt;
            </button>
            <div>{Math.floor(maxPomo)}</div>
            <button
              id="pomodoro-increment"
              onClick={(e) =>
                handleLengthChange(
                  e,
                  "pomodoro-decrement",
                  "pomodoro-increment",
                  1,
                  10,
                  maxPomo,
                  setMaxPomo,
                  1
                )
              }
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Button
          className="text-gray-800 font-normal hover:text-white dark:text-white"
          variant="cold"
          onClick={handleDefaults}
        >
          Default
        </Button>
        <Button
          className="text-gray-800 font-normal hover:text-white dark:text-white"
          variant="cold"
          onClick={() => onSubmit()}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};
