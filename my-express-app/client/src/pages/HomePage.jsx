import { Link } from "react-router";

export function HomePage() {
  const schedules = [
    {
      schedule_id: 1,
      schedule_name: "Today",
    },
    {
      schedule_id: 2,
      schedule_name: "Tomorrow",
    },
  ];

  // TODO: get data from backend

  return (
    <>
      <h1>My Schedules</h1>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.schedule_id}>
            {/* below I built the URL for a specific schedule page */}
            <Link to={`/schedule/${schedule.schedule_id}`}>
              {schedule.schedule_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
