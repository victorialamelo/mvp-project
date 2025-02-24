import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { GetSchedulesList, AddNewSchedule, DeleteSchedule } from "../backend";

export function HomePage() {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSchedules() {
      const schedules = await GetSchedulesList();
      setSchedules(schedules);
    }
    fetchSchedules(); // I am fetching and setting the schedules list when the component mounts (i.e. when it is rendered for the first time; fetchSchedules() will be called just once)
  }, []);

  // https://react.dev/reference/react-dom/components/form
  const createSchedule = async (formData) => {
    const newSchedule = { schedule_name: formData.get("date-name") };
    const addedSchedule = await AddNewSchedule(newSchedule); // send the new object (with the new schedule_name) to backend
    // redirect to the newly created schedule page
    navigate(`/schedule/${addedSchedule.schedule_id}`);
  };

  const deleteSchedule = async (scheduleId) => {
    await DeleteSchedule(scheduleId);
    const schedules = await GetSchedulesList();
    setSchedules(schedules);
  };

  return (
    <>
      <div className="app-container">
        <main className="app-main-center">
          <header>
            <h1 className="h1-schedules">My Schedules</h1>
            <h2 className="h2-description">
              {" "}
              Plan your daily schedules with stops and itineraries — keeping
              your routine organized and saving time, whether for daily tasks or
              travel planning.
            </h2>
          </header>
          <section className="schedules-list-homepage">
            <ul>
              {schedules.map((schedule) => (
                <li className="li-schedules" key={schedule.schedule_id}>
                  {/* below I built the URL for a specific schedule page */}
                  <Link to={`/schedule/${schedule.schedule_id}`}>
                    {schedule.schedule_name}{" "}
                    {/* and used schedule name as a hyperlink */}
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => deleteSchedule(schedule.schedule_id)}
                  >
                    Delete 🗑️
                  </button>
                  <p className="start-destination-schedule">From x to y</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="buttons-position-center">
            <form action={createSchedule}>
              <input
                className="date-input"
                type="date"
                required
                name="date-name"
              />
              <button className="handler-button">Add New Schedule </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
