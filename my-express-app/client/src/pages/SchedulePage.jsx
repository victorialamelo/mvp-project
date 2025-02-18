import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { backendScheduleItemsList } from "../backend";

export function SchedulePage() {
  // useParams is a built-in function from react-router
  // it provides an object that contains the URL parameters
  // in this case, the route is /schedule/:schedule_id
  // so when I load the URL: /schedule/123, I expect an object {"schedule_id": "123"}
  const params = useParams();

  const [items, setItems] = useState([]);

  // use an effect to trigger the loading of the backend items
  useEffect(() => {
    backendScheduleItemsList(params.schedule_id).then((items) =>
      setItems(items)
    );
  }, [params.schedule_id]);

  // TODO: DELETE MY ITEM PROPERLY
  const deleteItem = (itemId) => {
    console.log("user wants to delete item: " + itemId);
  };

  // TODO: CREATE PERSONALIZED GOOGLE MAPS URL FOR EXTERNAL USER REDIRECT
  const openGoogleMaps = () => {
    console.log("user wants to view schedule in google maps");
  };

  return (
    <>
      <Link to="/">Back</Link>
      <h1>Schedule {params.schedule_id}</h1>
      <ul>
        {items.map((item) => (
          <li key={item.item_id}>
            {item.location_name} - {item.lat},{item.lng}
            <button onClick={() => deleteItem(item.item_id)}>🗑️</button>
          </li>
        ))}
      </ul>
      <Link to="./add-item">Add Item</Link>
      <button onClick={() => openGoogleMaps()}>Open in Google Maps</button>
    </>
  );
}
