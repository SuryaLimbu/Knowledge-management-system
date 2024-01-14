import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let timeout: NodeJS.Timeout;

const LogoutAfterInactivity = ({ handleLogout }: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const resetTimeout = () => {
    // Clear the previous timeout
    clearTimeout(timeout);

    // Set a new timeout
    timeout = setTimeout(() => {
      // Log the user out
      handleLogout();
    }, 15 * 60 * 1000); // 15 minutes
  };

  useEffect(() => {
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'touchstart',
      'click',
      'scroll',
      'keypress',
    ];

    const onActivity = () => {
      resetTimeout();
    };

    // Attach event listeners
    events.forEach((event) => {
      window.addEventListener(event, onActivity);
    });

    // Initial setup
    resetTimeout();

    // Cleanup event listeners on component unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, onActivity);
      });

      // Clear the timeout on component unmount
      clearTimeout(timeout);
    };
  }, [handleLogout, navigate]);

  return null; // This component doesn't render anything
};

export default LogoutAfterInactivity;
