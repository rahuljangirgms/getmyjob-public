import { useEffect } from "react";
import { unstable_useBlocker as useBlocker, useLocation } from "react-router-dom";

const useNavigationBlocker = (isFormDirty) => {
  const location = useLocation();
  const blocker = useBlocker(() => isFormDirty); // Block if form is dirty

  useEffect(() => {
    if (isFormDirty) {
      const handleWindowClose = (event) => {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      };
      window.addEventListener("beforeunload", handleWindowClose);
      return () => {
        window.removeEventListener("beforeunload", handleWindowClose);
      };
    }
  }, [isFormDirty]);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  return blocker;
};

export default useNavigationBlocker;
