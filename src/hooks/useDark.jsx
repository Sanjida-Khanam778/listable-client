import  { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeProvider';

const useDark = () => {
      const {theme} = useContext(ThemeContext)
      return theme === "dark"
};

export default useDark;