import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  //! Fetching the event data from server by ID ------------------------------------------
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/event/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [id]);

  //! Copy Functionalities -----------------------------------------------
  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(`${linkToShare}`);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      linkToShare
    )}`;
    window.open(facebookShareUrl);
  };

  if (!event) return "";

  return (
    <div className="flex flex-col mx-4 sm:mx-6 lg:mx-32 mt-5 flex-grow">
      <div className="w-full">
        {event.image && (
          <img
            src={`${event.image}`}
            alt=""
            className="rounded-lg object-cover w-full h-auto max-h-[400px] sm:max-h-[500px]"
          />
        )}
      </div>

      {/* Demo image, delete later */}
      <img
        src="../src/assets/event-page.jpg"
        alt=""
        className="rounded-lg object-cover w-full h-auto max-h-[400px] sm:max-h-[500px] mt-5"
      />

      <div className="flex flex-col sm:flex-row justify-between mt-8 mx-2">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-800">
          {event.title.toUpperCase()}
        </h1>
        <Link to={`/event/${event._id}/ordersummary`}>
          <button className="primary bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 sm:mt-0">
            Book Ticket
          </button>
        </Link>
      </div>

      <div className="mx-2">
        <h2 className="text-sm sm:text-md lg:text-xl font-bold mt-3 text-primarydark">
          {event.ticketPrice === 0 ? "Free" : "PKR. " + event.ticketPrice}
        </h2>
      </div>

      <div className="mx-2 mt-3 text-sm sm:text-md lg:text-lg truncate-3-lines">
        {event.description}
      </div>

      <div className="mx-2 mt-5 text-sm sm:text-md lg:text-xl font-bold text-primarydark">
        Organized By {event.organizedBy}
      </div>

      <div className="mx-2 mt-5">
        <h1 className="text-md sm:text-lg lg:text-xl font-extrabold">
          When and Where
        </h1>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between mt-5 sm:mx-0">
          <div className="flex items-center gap-2">
            <AiFillCalendar className="h-5 w-auto text-primarydark" />
            <div>
              <h2 className="text-sm sm:text-md lg:text-lg font-extrabold">
                Date and Time
              </h2>
              <div className="text-xs sm:text-sm lg:text-lg">
                Date: {event.eventDate.split("T")[0]} <br />
                Time: {event.eventTime}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin className="h-5 w-auto text-primarydark" />
            <div>
              <h2 className="text-sm sm:text-md lg:text-lg font-extrabold">
                Location
              </h2>
              <div className="text-xs sm:text-sm lg:text-lg">
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 mt-5 text-md sm:text-lg lg:text-xl font-extrabold">
        Share with friends
        <div className="mt-5 flex gap-4 sm:gap-5">
          <button onClick={handleCopyLink}>
            <FaCopy className="h-6 w-auto" />
          </button>
          <button onClick={handleWhatsAppShare}>
            <FaWhatsappSquare className="h-6 w-auto text-green-600" />
          </button>
          <button onClick={handleFacebookShare}>
            <FaFacebook className="h-6 w-auto text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
