import { Routes, Route } from "react-router";
import { ScheduleItemAddPage } from "./pages/ScheduleItemAddPage";
import { HomePage } from "./pages/HomePage";
import { SchedulePage } from "./pages/SchedulePage";
import "./App.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/schedule/:schedule_id" element={<SchedulePage />} />
      <Route
        path="/schedule/:schedule_id/add-item"
        element={<ScheduleItemAddPage />}
      />
    </Routes>
  );
}
