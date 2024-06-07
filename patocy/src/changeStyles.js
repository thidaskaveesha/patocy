import React, { useEffect } from "react";
function changeStyles() {
    useEffect(() => {
        // Set body styles specific to this page
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.fontFamily = "'Inter', sans-serif";
        document.body.style.backgroundColor = "#f5f5f5";
        document.body.style.display = "block";

        // Cleanup function to reset the styles when the component unmounts
        return () => {
            document.body.style.margin = "";
            document.body.style.padding = "";
            document.body.style.fontFamily = "";
            document.body.style.backgroundColor = "";
            document.body.style.display = "";
        };
    }, []);
}
export default changeStyles;