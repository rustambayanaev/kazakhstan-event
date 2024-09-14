import axios from "axios";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
} from "date-fns";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const firstDayOfWeek = firstDayOfMonth.getDay();

  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div
      key={`empty-${index}`}
      className="p-2 bg-white border border-gray-200"
    ></div>
  ));

  return (
    <div className="p-4 mx-auto max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="rounded bg-white shadow-md overflow-hidden">
        <div className="flex items-center mb-4 justify-between px-4 py-2 border-b border-gray-200">
          <button
            className="text-primary p-2"
            onClick={() =>
              setCurrentMonth((prevMonth) => addMonths(prevMonth, -1))
            }
          >
            <BsCaretLeftFill className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            className="text-primary p-2"
            onClick={() =>
              setCurrentMonth((prevMonth) => addMonths(prevMonth, 1))
            }
          >
            <BsFillCaretRightFill className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-xs sm:text-sm font-semibold border-b border-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 bg-gray-100 text-gray-700 border-r border-gray-200"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {emptyCells.concat(
            daysInMonth.map((date) => (
              <div
                key={date.toISOString()}
                className="relative p-2 border border-gray-200"
              >
                <div className="font-bold text-xs sm:text-sm">
                  {format(date, "dd")}
                </div>
                <div className="absolute top-6 left-0 right-0">
                  {events
                    .filter(
                      (event) =>
                        format(new Date(event.eventDate), "yyyy-MM-dd") ===
                        format(date, "yyyy-MM-dd")
                    )
                    .map((event) => (
                      <div key={event._id} className="mt-1">
                        <Link to={`/event/${event._id}`}>
                          <div className="text-white bg-primary rounded p-1 text-xs sm:text-sm">
                            {event.title.toUpperCase()}
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
