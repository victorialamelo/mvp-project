import { Map, APIProvider, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import { AddNewItemToSchedule } from "../backend";

export function ScheduleItemAddPage() {
  const params = useParams(); // react router built-in to provide an object with URL parameters
  const navigate = useNavigate(); // react router built-in to navigate

  const [position, setPosition] = useState({ lat: 41.3851, lng: 2.1734 });

  const save = async (formData) => {
    const newItem = {
      schedule_id: Number(params.schedule_id), // transform to number due to original string value
      location_name: formData.get("location_name"),
      lat: Number(formData.get("lat")),
      lng: Number(formData.get("lng")),
    };

    await AddNewItemToSchedule(params.schedule_id, newItem);

    // after saving, I must then navigate back to the schedule page
    // going one path up with ".." goes to the parent URL
    navigate("./..");
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="app-container">
        <main className="app-main-center">
          <header>
            <h1 className="h1-add-schedule-page">Add a new location</h1>
          </header>

          {/* form Section */}
          <section className="buttons-position-center">
            <form action={save}>
              <input className="input-location-name"
                type="text"
                name="location_name"
                required
                placeholder="Enter Location Name"
              />
              <input type="hidden" name="lat" value={position.lat} />
              <input type="hidden" name="lng" value={position.lng} />
              <button className="handler-button" type="submit">Save</button>
              <Link to="./..">
                <button className="handler-button" type="button">Cancel</button>
              </Link>
            </form>
          </section>

          {/* map Section */}
          <section>
            <Map
              mapId="my-map"
              style={{ width: "100%", height: "700px" }}
              defaultCenter={position}
              defaultZoom={13}
              onCenterChanged={(e) => setPosition(e.detail.center)}
            >
              <AdvancedMarker position={position} />
            </Map>
          </section>
        </main>
      </div>
    </APIProvider>
  );
}
