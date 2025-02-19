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
      {/* form "action" is like "onSubmit" but simpler, since you don't need to preventDefault() and all the input values come as a FormData parameter */}
      <form action={save}>
        <input
          type="text"
          name="location_name"
          required
          placeholder="Location name"
        />
        <input type="hidden" name="lat" value={position.lat} />
        <input type="hidden" name="lng" value={position.lng} />
        <button>Save</button>
        <Link to="./..">Cancel</Link>
        <Map
          mapId="my-map"
          style={{ width: "300px", height: "300px" }}
          defaultCenter={{ lat: 41.3851, lng: 2.1734 }}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onCenterChanged={(e) => setPosition(e.detail.center)}
        >
          <AdvancedMarker position={position} />
        </Map>
      </form>
    </APIProvider>
  );
}
