import React from "react";
import LightButton from "../../assets/WebSite/light-mode-button.png";
import DarkButton from "../../assets/WebSite/dark-mode-button.png";

const DarkMode = () => {
    const [theme, setTheme] = React.useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );

    const element = document.body; // Cambiado para afectar al <body>

    React.useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark");
        }
    }, [theme]); // Dependencia agregada para ejecutar solo cuando el tema cambie

    return (
        <div className="relative">
            <img
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                src={LightButton}
                alt=""
                className={`w-12 cursor-pointer absolute right-0 z-10 ${
                    theme === "dark" ? "opacity-0" : "opacity-100"
                } transition-all duration-300`}
            />
            <img
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                src={DarkButton}
                alt=""
                className={`w-12 cursor-pointer ${
                    theme === "dark" ? "opacity-100" : "opacity-0"
                } transition-all duration-300`}
            />
        </div>
    );
};

export default DarkMode;
