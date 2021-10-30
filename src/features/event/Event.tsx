import { useAppSelector } from "../../app/hooks";

import { selectAllEvents } from "./eventSlice";

export default function Event() {
  const events = useAppSelector(selectAllEvents);

  return (
    <div>
      {events.map((x) => (
        <div key={x.id}>{x.date}</div>
      ))}
    </div>
  );
}
