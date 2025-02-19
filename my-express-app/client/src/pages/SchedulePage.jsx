import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { GetItemsList, GetSchedule, DeleteItem } from "../backend";

export function SchedulePage() {
  // useParams is a built-in function from react-router
  // it provides an object that contains the URL parameters
  // in this case, the route is /schedule/:schedule_id
  // so when I load the URL: /schedule/123, I expect an object {"schedule_id": "123"}
  const params = useParams();

  const [items, setItems] = useState([]);
  const [schedule, setSchedule] = useState({});
  console.log(schedule);
  // use an effect to trigger the loading of the backend items
  useEffect(() => {
    GetItemsList(params.schedule_id).then((items) => setItems(items));
    GetSchedule(params.schedule_id).then((schedule) => setSchedule(schedule));
  }, [params.schedule_id]);

  const deleteItem = async (scheduleId, itemId) => {
    await DeleteItem(scheduleId, itemId);
    const updatedItems = await GetItemsList(scheduleId);
    setItems(updatedItems);
  };

  // CREATE PERSONALIZED GOOGLE MAPS URL FOR EXTERNAL USER REDIRECT
  // https://developers.google.com/maps/documentation/urls/get-started#directions-action
  const openGoogleMaps = () => {
    // manipulate the items array -> each { lat: x, lng: y } object will be converted into a string "lat,lng"
    // the final result is an array of strings ["x,y", "w,z"]
    const waypoints = items.map(({ lat, lng }) => `${lat},${lng}`);

    // define the last item of the array as final destination
    const destination = waypoints.pop();

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&waypoints=${waypoints.join(
      "|"
    )}`;

    // open url in a new tab with JS method window.open()
    window.open(googleMapsUrl);
  };

  return (
    <>
      <Link to="/">Back</Link>
      <h1>{schedule.schedule_name}</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.item_id}>
              {item.location_name} - {item.lat},{item.lng}
              <button
                onClick={() => deleteItem(params.schedule_id, item.item_id)}
              >
                🗑️
              </button>
            </li>
          );
        })}
      </ul>
      <Link to="./add-item">Add Item</Link>
      <button onClick={() => openGoogleMaps()}>
        Open Itinerary on Google Maps
      </button>
    </>
  );
}
