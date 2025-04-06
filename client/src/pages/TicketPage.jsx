import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function TicketPage() {
  const { user } = useContext(UserContext);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, []);

  const fetchTickets = async () => {
    axios
      .get(`/tickets/user/${user._id}`)
      .then((response) => {
        setUserTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user tickets:", error);
      });
  };

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`/tickets/${ticketId}`);

      fetchTickets();
      alert("Заявка удалена");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="flex flex-col flex-grow p-4 md:p-6">
      <div className="mb-5 flex justify-between items-center">
        <div>
          <Link to="/">
            <button
              className="
                inline-flex
                mt-2
                gap-2
                p-2
                bg-gray-100
                justify-center
                items-center
                text-blue-700
                font-bold
                rounded-md
              "
            >
              <IoMdArrowBack className="font-bold w-6 h-6" />
              Назад
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {userTickets.map((ticket) => (
          <div key={ticket._id} className="w-full">
            <div className="bg-gray-100 p-4 rounded-md shadow-md relative">
              <button
                onClick={() => deleteTicket(ticket._id)}
                className="absolute cursor-pointer right-2 top-2"
              >
                <RiDeleteBinLine className="h-6 w-6 text-red-700" />
              </button>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={ticket.ticketDetails.qr}
                    alt="QRCode"
                    className="w-full object-cover rounded-md"
                  />
                </div>
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    Название события:
                    <br />
                    <span className="font-extrabold text-primarydark">
                      {ticket.ticketDetails.eventname.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    Дата и время:
                    <br />
                    <span className="font-extrabold text-primarydark">
                      {ticket.ticketDetails.eventdate.split("T")[0]},{" "}
                      {ticket.ticketDetails.eventtime}
                    </span>
                  </div>
                  <div>
                    Имя:
                    <br />
                    <span className="font-extrabold text-primarydark">
                      {ticket.ticketDetails.name.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    Цена:
                    <br />
                    <span className="font-extrabold text-primarydark">
                      Rs. {ticket.ticketDetails.ticketprice}
                    </span>
                  </div>
                  <div>
                    Email:
                    <br />
                    <span className="font-extrabold text-primarydark">
                      {ticket.ticketDetails.email}
                    </span>
                  </div>
                  <div>
                    ID билета:
                    <br />
                    <span className="font-extrabold text-primarydark">
                      {ticket.ticketDetails._id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
