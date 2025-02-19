import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeProvider";


const useTheme = () => {
     const {theme} = useContext(ThemeContext)
     return theme
};

export default useTheme;