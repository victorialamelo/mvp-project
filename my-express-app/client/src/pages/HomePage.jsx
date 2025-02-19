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
    fetchSchedules();
  }, []);

  const createSchedule = async (formData) => {
    const newSchedule = { schedule_name: formData.get("name") };
    const addedSchedule = await AddNewSchedule(newSchedule); // send the new object to backend
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
      <h1>My Schedules</h1>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.schedule_id}>
            {/* below I built the URL for a specific schedule page */}
            <Link to={`/schedule/${schedule.schedule_id}`}>
              {schedule.schedule_name} {/* schedule name as hyperlink */}
            </Link>
            <button onClick={() => deleteSchedule(schedule.schedule_id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <form action={createSchedule}>
        <input type="date" required name="name" />
        <button>Add New Schedule</button>
      </form>
    </>
  );
}
