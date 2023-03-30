import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github-dark.css";
import "./styles/common.scss";
import "./styles/index.scss";
hljs.registerLanguage("javascript", javascript);
hljs.highlightAll();
hljs.getLanguage("javascript");