import { useCookies } from "react-cookie";
import { decodeToken } from "react-jwt";
import axios from "axios";

export const decodeUser = async () => {
  const [cookies] = useCookies(["Authorization"]);
  const myToken = cookies.Authorization;
  const decodedToken = decodeToken(myToken);

  try {
    const response = await axios.post("https://example.com/backend-endpoint", decodedToken);

    if (response.status === 200) {
      // 성공적으로 백엔드에 데이터를 전송함
      console.log("Data sent successfully");
    } else {
      // 요청이 실패한 경우에 대한 처리
      console.error("Request failed");
    }
  } catch (error) {
    // 요청 중에 오류가 발생한 경우에 대한 처리
    console.error("Error:", error);
  }
};
