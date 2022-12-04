import './bootstrap';
import 'react-toastify/dist/ReactToastify.css';

import App from "./Layouts/App";
import {createRoot} from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container)
root.render(<App/>);
