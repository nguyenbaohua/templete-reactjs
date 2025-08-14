import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function IdleLogout1() {
  const navigate = useNavigate();
  const idleTimerRef = useRef(null);
  const idleTimeout = 10 * 60 * 1000; // 10 phút

  const resetTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(logout, idleTimeout);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // Bắt đầu đếm ngược khi load trang

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return null; // Component này chỉ chạy logic, không hiển thị gì
}
