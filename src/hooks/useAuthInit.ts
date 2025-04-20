import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAuthHeader } from "store/auth/operations";
import { selectToken } from "store/auth/selectors";

export const useAuthInit = () => {
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) setAuthHeader(token);
  }, [token]);
};
