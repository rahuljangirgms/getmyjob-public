import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const PermissionGuard = ({ children, menuKey, action = "view" }) => {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
    const hasShownToast = useRef(false); // prevent toast on every render

    const matchedMenu = permissions.find((perm) => perm.menu === menuKey);

    const isAllowed = matchedMenu && matchedMenu[action] === 1;

    useEffect(() => {
        if (!isAllowed && !hasShownToast.current) {
            toast.error("🚫 You do not have permission to access this section.");
            hasShownToast.current = true;
        }
    }, [isAllowed]);

    if (!isAllowed) {
        return <Navigate to="/admin/access-denied" replace />;
    }

    return <>{children}</>;
};

export default PermissionGuard;
