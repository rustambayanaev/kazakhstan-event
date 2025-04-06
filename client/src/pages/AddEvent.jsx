import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: "", // Commented out
    likes: 0,
  });

  const handleImageUpload = (e) => {
    // Commented out
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post("/createEvent", data)
      .then((response) => {
        console.log("Event posted successfully:", response.data);
        window.alert("Событие успешно создано!");
      })
      .catch((error) => {
        console.error("Error posting event:", error);
        window.alert("Ошибка при создании события. Пожалуйста, попробуйте снова.");
      });
  };

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-xl font-bold mb-4">Опубликовать событие</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Название:
          <input
            type="text"
            name="title"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Дополнительно:
          <input
            type="text"
            name="optional"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.optional}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Описание:
          <textarea
            name="description"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Организатор:
          <input
            type="text"
            name="organizedBy"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.organizedBy}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Дата события:
          <input
            type="date"
            name="eventDate"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Время события:
          <input
            type="time"
            name="eventTime"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.eventTime}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Адрес:
          <input
            type="text"
            name="location"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Стоимость билета:
          <input
            type="number"
            name="ticketPrice"
            className="rounded p-2 border-2 border-sky-700"
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Изображение:
          <input
            type="file"
            name="image"
            className="rounded p-2 border-2 border-sky-700"
            onChange={handleImageUpload}
          />
        </label>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Подтвердить
        </button>
      </form>
    </div>
  );
}
