import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
// import { BiTrash } from "react-icons/bi";

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  useEffect(() => {
    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Like Functionality
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, likes: event.likes + 1 } : event
          )
        );
        console.log("Like action completed", response);
      })
      .catch((error) => {
        console.error("Error liking the event", error);
      });
  };

  // Delete Functionality (Commented Out)
  // const handleDelete = (eventId) => {
  //   axios
  //     .delete(`/event/${eventId}`)
  //     .then((response) => {
  //       setEvents((prevEvents) =>
  //         prevEvents.filter((event) => event._id !== eventId)
  //       );
  //       console.log("Event deleted successfully", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting the event", error);
  //     });
  // };

  return (
    <div className="flex flex-col mt-1">
      {/* Banner Image */}
      <div className="relative">
        <img
          src="../assets/banner.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Grid */}
      <div className="mx-4 my-5 sm:mx-5 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.length > 0 &&
          events.map((event) => {
            const eventDate = new Date(event.eventDate);
            const currentDate = new Date();

            // Check if the event date is in the future or today
            if (
              eventDate > currentDate ||
              eventDate.toDateString() === currentDate.toDateString()
            ) {
              return (
                <div
                  className="bg-white rounded-xl shadow-md overflow-hidden relative"
                  key={event._id}
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    {event.image && (
                      <img
                        src={`http://localhost:3000/api/${event.image}`}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>

                  <div className="absolute flex gap-4 bottom-4 right-4 md:bottom-4 md:right-4">
                    <button
                      onClick={() => handleLike(event._id)}
                      className="bg-white p-2 rounded-full shadow-md transition-all hover:text-primary"
                    >
                      <BiLike className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    {/* Delete Button (Commented Out) */}
                    {/* <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 p-2 rounded-full shadow-md transition-all hover:bg-red-600"
                    >
                      <BiTrash className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </button> */}
                  </div>

                  {/* <img
                    src="../src/assets/karachi-art.jpg"
                    alt=""
                    className="rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] object-fill aspect-16:9"
                  /> */}

                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-lg">
                        {event.title.toUpperCase()}
                      </h1>
                      <div className="flex items-center text-red-600">
                        <BiLike className="w-6 h-6" /> {event.likes}
                      </div>
                    </div>

                    <div className="text-sm text-primarydark mb-2">
                      {event.eventDate.split("T")[0]}, {event.eventTime}
                      <br />
                      {event.ticketPrice === 0
                        ? "Бесплатно"
                        : event.ticketPrice + " Тг."}
                    </div>

                    <p className="text-xs truncate mb-2">{event.description}</p>

                    <div className="text-sm text-primarydark mb-2">
                      Организатор: <br />
                      <span className="font-bold">{event.organizedBy}</span>
                      <br />
                      Создано: <br />
                      <span className="font-semibold">
                        {event.owner.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <Link to={`/event/${event._id}`}>
                        <button className="primary flex items-center gap-2 py-2 px-4 rounded-lg text-sm">
                           Подробнее
                          <BsArrowRightShort className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
