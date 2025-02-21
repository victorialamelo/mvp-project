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
  console.log(items);
  // use an effect to trigger the loading of the backend items
  useEffect(() => {
    GetItemsList(params.schedule_id).then((items) => setItems(items));
    GetSchedule(params.schedule_id).then((schedule) => setSchedule(schedule));
  }, [params.schedule_id]); // useEffect will re-run whenever the value of params.schedule_id changes

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

  const shareItinerary = () => {
    const waypoints = items.map(({ lat, lng }) => `${lat},${lng}`);
    const destination = waypoints.pop();
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&waypoints=${waypoints.join(
      "|"
    )}`;
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share - I am creating a property 'url' with value 'googleMapsUrl' inside the object parameter of the share() method
    navigator.share({ url: googleMapsUrl });
  };

  return (
    <div className="app-container">
      <main className="app-main-center">
        {/* Header Section */}
        <header className="redirect-home-page">
          <Link to="/">Back to My Schedules</Link>
          <h1 className="h1-schedules">{schedule.schedule_name}</h1>
        </header>

        {/* Buttons Section */}
        <section className="buttons-position-center">
          <Link to="./add-item">
            <button className="handler-button">Add New Location 📌</button>
          </Link>
          <button className="handler-button" onClick={openGoogleMaps}>
            Open Itinerary on Google Maps 🗺️
          </button>
        </section>
        {/* Buttons Section */}
        <section className="buttons-position-center">
          <button className="button-share-itinerary" onClick={shareItinerary}>
            Share Itinerary Link 🔗
          </button>
        </section>

        {/* List of Items (Locations) */}
        <section>
          <ul>
            {items.map((item, index) => (
              <li key={item.item_id} className="li-items">
                <header>
                  <h2>
                    {index + 1}. {item.location_name}
                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteItem(params.schedule_id, item.item_id)
                      }
                    >
                      Delete 🗑️
                    </button>
                  </h2>
                </header>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
