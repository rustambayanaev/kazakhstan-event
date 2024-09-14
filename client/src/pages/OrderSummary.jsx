import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

export default function OrderSummary() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/event/${id}/ordersummary`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [id]);

  //! Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  if (!event) return "";

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Back Button */}
      <Link to={`/event/${event._id}`}>
        <button
          className="
            inline-flex gap-2 items-center justify-center
            bg-gray-100 text-blue-700 font-bold rounded-md
            p-3 ml-0 sm:ml-4 mt-4
          "
        >
          <IoMdArrowBack className="w-6 h-6" />
          Back
        </button>
      </Link>

      <div className="flex flex-col lg:flex-row gap-5 mt-4 lg:mx-12">
        {/* Terms & Conditions Section */}
        <div
          className="
            bg-gray-100 p-4 rounded-lg
            w-full lg:w-3/4 mb-4 lg:mb-0
          "
        >
          <h2 className="text-left font-bold text-lg">Terms & Conditions</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              Refunds will be provided for ticket cancellations made up to 14
              days before the event date. After this period, no refunds will be
              issued.
            </li>
            <li>
              Tickets will be delivered to your registered email address as
              e-tickets. You can print the e-ticket or show it on your mobile
              device for entry to the event.
            </li>
            <li>
              Each individual is allowed to purchase a maximum of 2 tickets for
              this event to ensure fair distribution.
            </li>
            <li>
              In the rare event of cancellation or postponement, attendees will
              be notified via email. Refunds will be automatically processed for
              canceled events.
            </li>
            <li>
              Tickets for postponed events will not be refunded and the ticket
              will be considered valid for the new date.
            </li>
            <li>
              Your privacy is important to us. By using our app, you agree to
              our privacy policy.
            </li>
            <li>
              Before proceeding with your ticket purchase, please review and
              accept our terms and conditions.
            </li>
          </ul>
        </div>

        {/* Booking Summary Section */}
        <div
          className="
            bg-blue-100 p-4 rounded-lg
            w-full lg:w-1/4
          "
        >
          <h2 className="text-lg font-bold">Booking Summary</h2>
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span>{event.title}</span>
              <span>PKR. {event.ticketPrice}</span>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="text-sm font-bold flex justify-between">
            <span>SUB TOTAL</span>
            <span>PKR. {event.ticketPrice}</span>
          </div>
          <div className="flex items-start mt-4">
            <input
              type="checkbox"
              className="h-5 w-5 mt-1"
              onChange={handleCheckboxChange}
            />
            <p className="ml-3 text-sm">
              I have verified the Event name, date, and time before proceeding
              to payment. I accept terms and conditions.
            </p>
          </div>
          <div className="mt-4">
            <Link to={`/event/${event._id}/ordersummary/paymentsummary`}>
              <button
                className={`w-full p-3 rounded-md font-bold text-gray-100 ${
                  isCheckboxChecked ? "bg-blue-700" : "bg-gray-300"
                }`}
                disabled={!isCheckboxChecked}
              >
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
