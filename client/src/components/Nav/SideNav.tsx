import { NavItem } from "./NavItems";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTimer, MdWbSunny, MdDarkMode } from "react-icons/md";
import { VscDebugRestartFrame } from "react-icons/vsc";
import { FaSpotify } from "react-icons/fa";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useDarkToggleStore,
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
} from "../../store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const SideNav = () => {
  const { isDark, toggleDarkMode } = useDarkToggleStore();
  const [active, setActive] = useState(false);
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { isTimerToggled, setIsTimerToggled } = useToggleTimer();
  const { isTasksToggled, setIsTasksToggled } = useToggleTasks();
  const { isSpotifyToggled, setIsSpotifyToggled } = useSpotifyMusic();

  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();

  function toggleDefaultPositions() {
    var answer = window.confirm(
      "This will reset tiles to default positon - are you sure?"
    );
    if (answer) {
      setTaskPosDefault();
      setMusicPosDefault();
      setSpotifyPosDefault();
      setTimerPosDefault();
      toast("Positions reset", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      window.location.reload();
    }
  }

  function toggleMusicPlayer() {
    setIsMusicToggled(!isMusicToggled);
  }

  function toggleTimerPlayer() {
    setIsTimerToggled(!isTimerToggled);
  }

  function toggleTaskTracker() {
    setIsTasksToggled(!isTasksToggled);
  }

  function toggleSpotify() {
    setIsSpotifyToggled(!isSpotifyToggled);
  }

  function toggleNavBar() {
    setActive((oldDate) => !oldDate);
  }

  useEffect(() => {
    if (isDark) {
      toast("Dark Mode", {
        icon: "🌙",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast("Light Mode", {
        icon: "☀️",
        style: {
          borderRadius: "10px",
        },
      });
    }
  }, [isDark]);

  return (
    <>
      <div className="flex absolute">
        <aside className="flex flex-col">
          <ul>
            <div className="sm:hidden">
              <NavItem onClick={toggleNavBar}>
                <IoMenu className="h-6 w-6" />
              </NavItem>
            </div>
            <div
              className={`${
                active ? "" : "hidden"
              } w-full sm:flex sm:flex-grow sm:w-auto sm:flex-col`}
            >
              <NavItem onClick={toggleMusicPlayer} toggled={isMusicToggled}>
                <IoMusicalNotesOutline className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleSpotify} toggled={isSpotifyToggled}>
                <FaSpotify className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleTaskTracker} toggled={isTasksToggled}>
                <CgNotes className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleTimerPlayer} toggled={isTimerToggled}>
                <MdOutlineTimer className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleDefaultPositions}>
                <VscDebugRestartFrame className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleDarkMode}>
                {isDark ? (
                  <MdWbSunny className="h-6 w-6" />
                ) : (
                  <MdDarkMode className="h-6 w-6" />
                )}
              </NavItem>
            </div>
          </ul>
        </aside>
      </div>
    </>
  );
};
