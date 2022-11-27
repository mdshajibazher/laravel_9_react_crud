import './bootstrap';
import PostsIndex from "./Pages/Posts";
import {createRoot} from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container)
root.render(<PostsIndex/>);
