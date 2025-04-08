import { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function GoogleCalendarPage() {
    const { user, setUser } = useContext(UserContext);

    const [events, setEvents] = useState([]);

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        setEvents([]);
    };

    useEffect(() => {
        if (user) {
            console.log("Пользователь уже вошёл через Google:", user);
            // Тут можешь использовать user.email или даже credential (если сохранил его)
        }
    }, [user]);

    if (!user) {
        return (
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Вы не вошли в систему</h1>
                <p>Пожалуйста, войдите через Google на странице логина.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Интеграция с Google Календарём</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded mb-4"
            >
                Выйти
            </button>

            <h2 className="text-lg font-semibold mb-2">События (в разработке)</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <strong>{event.summary}</strong>
                        <p>{event.start.dateTime}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

