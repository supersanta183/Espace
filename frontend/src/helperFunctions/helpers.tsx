import { useLoggedInContext } from "@/Contexts/LoggedInProvider";
import tokenResponse from "@/interfaces/responses";

export let check_expired_access_token = async (setLoggedIn: (loggedIn: boolean) => void) => {
    let expirationTime = localStorage.getItem('expirationTime');
    if (!expirationTime) {
        console.log("No expiration time found");
        setLoggedIn(false);
        return; //consider the token expired if no expiration time is found
    }
    let currentTime = Date.now();
    if (currentTime > parseInt(expirationTime)) {
        update_access_token();
        return;
    }
    setLoggedIn(true);
}

export const update_access_token = async () => {
    try{
        let refreshtoken = localStorage.getItem('refreshToken');
        if (!refreshtoken) {
            console.log("No refresh token found");
            return;
        }
    
        const response = await fetch("http://localhost:5064/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(refreshtoken),
          });
          const result = await response.json();
          refresh_localstorage(result);
    } catch (error) {
        console.error("Error:", error);
    }

}

export const refresh_localstorage = (response: tokenResponse) => {
    let accessToken = response.accessToken;
    let refreshToken = response.refreshToken;
    let expiresIn = response.expiresIn;
    const expirationTime = Date.now() + expiresIn * 1000;
    localStorage.setItem("expirationTime", expirationTime.toString());
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}
