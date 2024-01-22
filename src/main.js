import "./styles/main.css";
import App from "./App.svelte";

// await auth.refresh();

const app = new App({
  target: document.getElementById("app"),
});

export default app;
