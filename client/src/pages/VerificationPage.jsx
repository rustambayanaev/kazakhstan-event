import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function VerificationPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("success");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      verifyAccount();
    }
  }, [token]);

  const verifyAccount = async () => {
    try {
      const response = await axios.post("/verify", { token });
      if (response.data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(response.data.message || "Verification failed.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An error occurred while verifying your account.");
    }
  };

  const handleRetry = () => {
    setStatus("pending");
    verifyAccount();
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="verification-page flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Верификация аккаунта
      </h1>

      {status === "pending" && (
        <div className="loading-message text-center">
          <p className="text-sm md:text-base">
            Пожалуйста, подождите, пока мы верифицируем вашу учетную запись...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="success-message text-green-600 text-center">
          <p className="text-sm md:text-base">
            Ваша учетная запись успешно подтверждена!
          </p>
          <button
            onClick={handleHome}
            className="inline-flex mt-4 gap-2 p-3 bg-gray-100 justify-center items-center text-blue-700 font-bold rounded-md hover:bg-gray-200 transition duration-300 text-sm md:text-base"
          >
            Назад
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="error-message text-red-600 text-center">
          <p className="text-sm md:text-base">{errorMessage}</p>
          <div className="mt-4 flex flex-col md:flex-row gap-2 justify-center">
            <button
              onClick={handleRetry}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300 text-sm md:text-base"
            >
              Повторите попытку
            </button>
            <button
              onClick={handleHome}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 text-sm md:text-base"
            >
              Домой
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
