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
          Назад
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
          <h2 className="text-left font-bold text-lg">Условия и положения</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              Возврат средств возможен при отмене билета не позднее, чем за 14 дней до даты мероприятия. После этого
              срока возвраты не производятся.
            </li>
            <li>
              Билеты будут отправлены на ваш зарегистрированный адрес электронной почты в виде электронных билетов. Вы
              можете распечатать билет или показать его на мобильном устройстве при входе.
            </li>
            <li>
              Один человек может приобрести не более 2 билетов на это мероприятие для обеспечения равномерного
              распределения.
            </li>
            <li>
              В случае отмены или переноса мероприятия, участники будут уведомлены по электронной почте. Возврат средств
              за отменённые мероприятия будет произведён автоматически.
            </li>
            <li>
              Билеты на перенесённые мероприятия возврату не подлежат и будут действительны на новую дату.
            </li>
            <li>
              Мы заботимся о вашей конфиденциальности. Используя наше приложение, вы соглашаетесь с нашей политикой
              конфиденциальности.
            </li>
            <li>
              Перед покупкой билета, пожалуйста, ознакомьтесь и примите наши условия и положения.
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
          <h2 className="text-lg font-bold">Краткое описание бронирования</h2>
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span>{event.title}</span>
              <span>{event.ticketPrice} Тг.</span>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="text-sm font-bold flex justify-between">
            <span>Итоговая сумма</span>
            <span>{event.ticketPrice} Тг.</span>
          </div>
          <div className="flex items-start mt-4">
            <input
              type="checkbox"
              className="h-5 w-5 mt-1"
              onChange={handleCheckboxChange}
            />
            <p className="ml-3 text-sm">
              Я подтвердил название мероприятия, дату и время, прежде чем приступить к оплате. Я принимаю правила и условия.
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
                Оплатить
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
