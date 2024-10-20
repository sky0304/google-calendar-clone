import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside className="border p-5 w-64 bg-[#f8f6f4]">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
