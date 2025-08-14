// IdleLogout.jsx (JavaScript, không TypeScript)
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const IDLE_TIMEOUT_MS = 10 * 60 * 1000; // 10 phút
const LAST_ACTIVITY_KEY = "lastActivityAt";
const TOKEN_KEY = "token";
const DEBOUNCE_MS = 2000; // chỉ ghi localStorage sau 2s kể từ lần hoạt động gần nhất

export default function IdleLogout2() {
  const navigate = useNavigate();
  const idleTimerRef = useRef(null);      // setTimeout để logout
  const debounceRef = useRef(null);       // setTimeout cho debounced save
  const lastSavedRef = useRef(0);         // lần cuối thực sự đã ghi localStorage

  // --- helpers ---
  const now = () => Date.now();

  const writeLastActivityDebounced = () => {
    // Nếu trong khoảng DEBOUNCE_MS tiếp tục có hoạt động, timer sẽ reset
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(now()));
      lastSavedRef.current = now();
    }, DEBOUNCE_MS);
  };

  const scheduleLogout = (ms) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      logout();
    }, Math.max(ms, 0));
  };

  const logout = () => {
    // xoá token và điều hướng
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
  };

  const handleActivity = () => {
    // 1) reset bộ đếm idle ở RAM ngay lập tức (không chờ debounce)
    scheduleLogout(IDLE_TIMEOUT_MS);

    // 2) ghi thời gian hoạt động gần nhất vào localStorage theo kiểu debounced
    writeLastActivityDebounced();
  };

  // Khởi tạo: đọc lastActivity từ localStorage để tính phần thời gian còn lại sau reload
  useEffect(() => {
    // Nếu chưa có, set ngay để làm mốc
    const stored = Number(localStorage.getItem(LAST_ACTIVITY_KEY));
    const lastActivity = Number.isFinite(stored) ? stored : now();
    if (!Number.isFinite(stored)) {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(lastActivity));
      lastSavedRef.current = lastActivity;
    } else {
      lastSavedRef.current = stored;
    }

    const elapsed = now() - lastActivity;
    const remaining = IDLE_TIMEOUT_MS - elapsed;

    if (remaining <= 0) {
      // đã hết hạn trong lúc user không mở trang → logout ngay
      logout();
      return;
    }

    // đặt hẹn giờ bằng thời gian còn lại
    scheduleLogout(remaining);

    const events = ["mousemove", "keydown", "click", "scroll", "wheel", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));

    // Đồng bộ đa tab:
    // - nếu tab khác xoá token → logout ở tab này
    // - nếu tab khác cập nhật lastActivityAt → tính lại thời gian còn lại
    const onStorage = (e) => {
      if (e.key === TOKEN_KEY && !e.newValue) {
        logout();
      }
      if (e.key === LAST_ACTIVITY_KEY && e.newValue) {
        const updated = Number(e.newValue);
        if (Number.isFinite(updated) && updated > lastSavedRef.current) {
          lastSavedRef.current = updated;
          const newRemaining = IDLE_TIMEOUT_MS - (now() - updated);
          if (newRemaining <= 0) {
            logout();
          } else {
            scheduleLogout(newRemaining);
          }
        }
      }
    };
    window.addEventListener("storage", onStorage);

    // Khi chuyển tab (visibilitychange), nếu quay lại tab → tính lại
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        const latest = Number(localStorage.getItem(LAST_ACTIVITY_KEY)) || now();
        const newRemaining = IDLE_TIMEOUT_MS - (now() - latest);
        if (newRemaining <= 0) {
          logout();
        } else {
          scheduleLogout(newRemaining);
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleActivity));
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisibility);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
