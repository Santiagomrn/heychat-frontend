import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useEffect } from "react";

export default function Oauth() {
  let { setCredentials } = useAuth();
  let [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const refreshToken = searchParams.get("refreshToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (token != null && refreshToken != null) {
      setCredentials({ token, refreshToken });
      navigate("/chat");
    } else {
      navigate("/login");
    }
  });
  return <></>;
}
