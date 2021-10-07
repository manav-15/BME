import React from "react";
import { useMsal } from "@azure/msal-react";
// import Button from "react-bootstrap/Button";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();
    return (
        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={() => instance.logout()} >Sign Out</button>
    )
}