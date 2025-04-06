/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { UserContext } from "../UserContext";
import Qrcode from "qrcode"; //TODO:

export default function PaymentSummary() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    contactNo: "",
  });
  const defaultTicketState = {
    userid: user ? user._id : "",
    eventid: "",
    ticketDetails: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      eventname: "",
      eventdate: "",
      eventtime: "",
      ticketprice: "",
      qr: "",
    },
  };
  const [ticketDetails, setTicketDetails] = useState(defaultTicketState);
  const [payment, setPayment] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/event/${id}/ordersummary/paymentsummary`)
      .then((response) => {
        setEvent(response.data);
        setTicketDetails((prevTicketDetails) => ({
          ...prevTicketDetails,
          eventid: response.data._id,
          ticketDetails: {
            ...prevTicketDetails.ticketDetails,
            eventname: response.data.title,
            eventdate: response.data.eventDate.split("T")[0],
            eventtime: response.data.eventTime,
            ticketprice: response.data.ticketPrice,
          },
        }));
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [id]);

  useEffect(() => {
    setTicketDetails((prevTicketDetails) => ({
      ...prevTicketDetails,
      userid: user ? user._id : "",
      ticketDetails: {
        ...prevTicketDetails.ticketDetails,
        name: user ? user.name : "",
        email: user ? user.email : "",
      },
    }));
  }, [user]);

  if (!event) return "";

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangePayment = (e) => {
    const { name, value } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };

  const createTicket = async (e) => {
    e.preventDefault();
    try {
      const qrCode = await generateQRCode(
        ticketDetails.ticketDetails.eventname,
        ticketDetails.ticketDetails.name
      );
      const updatedTicketDetails = {
        ...ticketDetails,
        ticketDetails: {
          ...ticketDetails.ticketDetails,
          qr: qrCode,
        },
      };
      const response = await axios.post(`/tickets`, updatedTicketDetails);
      alert("Созданный билет");
      setRedirect(true);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  async function generateQRCode(name, eventName) {
    try {
      const qrCodeData = await Qrcode.toDataURL(
        `Event Name: ${name} \n Name: ${eventName}`
      );
      return qrCodeData;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  }

  if (redirect) {
    return <Navigate to={"/wallet"} />;
  }

  return (
    <>
      <div>
        <Link to={"/event/" + event._id + "/ordersummary"}>
          <button className="inline-flex gap-2 items-center p-3 ml-4 sm:ml-6 bg-gray-100 text-blue-700 font-bold rounded-sm mt-4">
            <IoMdArrowBack className="w-6 h-6" />
            Назад
          </button>
        </Link>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 px-4 sm:px-6 lg:px-12">
        {/* Left Section - Your Details and Payment */}
        <div className="bg-gray-100 p-4 lg:p-8 rounded-md w-full lg:w-3/5">
          {/* Your Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Ваши данные</h2>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChangeDetails}
              placeholder="Имя"
              className="input-field w-full h-10 bg-gray-50 border rounded-md p-2.5"
            />
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChangeDetails}
              placeholder="Email"
              className="input-field w-full h-10 bg-gray-50 border rounded-md p-2.5"
            />
            <input
              type="tel"
              name="contactNo"
              value={details.contactNo}
              onChange={handleChangeDetails}
              placeholder="Контактный номер"
              className="input-field w-full h-10 bg-gray-50 border rounded-md p-2.5"
            />
          </div>

          {/* Payment Option */}
          <div className="mt-10 space-y-4">
            <h2 className="text-xl font-bold">Способ оплаты</h2>
            <div>
              <button
                type="button"
                className="px-8 py-3 text-black bg-blue-100 border border-gray-300 rounded-md"
                disabled
              >
                Кредитная / Дебетовая карта
              </button>
            </div>
            <input
              type="text"
              name="nameOnCard"
              value={payment.nameOnCard}
              onChange={handleChangePayment}
              placeholder="*****"
              className="input-field w-full h-10 bg-gray-50 border rounded-md p-2.5"
            />
            <input
              type="text"
              name="cardNumber"
              value={payment.cardNumber}
              onChange={handleChangePayment}
              placeholder="**** **** **** ****"
              className="input-field w-full h-10 bg-gray-50 border rounded-md p-2.5"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="expiryDate"
                value={payment.expiryDate}
                onChange={handleChangePayment}
                placeholder="**/**"
                className="input-field w-1/2 h-10 bg-gray-50 border rounded-md p-2.5"
              />
              <input
                type="text"
                name="cvv"
                value={payment.cvv}
                onChange={handleChangePayment}
                placeholder="***"
                className="input-field w-1/3 h-10 bg-gray-50 border rounded-md p-2.5"
              />
            </div>
            <div className="text-right mt-6">
              <p className="text-sm font-semibold pb-2">
                Сумма: {event.ticketPrice}Тг
              </p>
              <button
                type="button"
                onClick={createTicket}
                className="primary w-full sm:w-48"
              >
                Произвести оплату
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-blue-100 p-4 rounded-md w-full lg:w-1/4">
          <h2 className="text-xl font-bold mb-4">Описание заказа</h2>
          <div className="space-y-2">
            <p>1 Билет</p>
            <p className="text-lg font-semibold">{event.title}</p>
            <p className="text-xs">{event.eventDate.split("T")[0]}</p>
            <p className="text-xs pb-2">{event.eventTime}</p>
            <hr className="border-t border-gray-400 my-2" />
            <p className="font-bold">Сумма: {event.ticketPrice}Тг</p>
          </div>
        </div>
      </div>
    </>
  );
}
