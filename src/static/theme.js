const theme = localStorage.getItem("theme");
document.querySelector('html').className = theme;

const changeTheme = () => {
    const html = document.querySelector('html');
    const themeNow = html.className;
    if (themeNow === "dark") {
        html.className = "light";
        changeGiscusTheme('light');
        localStorage.setItem("theme", "light");
    } else {
        html.className = "dark";
        changeGiscusTheme('dark');
        localStorage.setItem("theme", "dark");
    }
};

const changeGiscusTheme = (theme) => {
    // const theme = document.documentElement.getAttribute('data-theme') === 'dark' ?  'dark' : 'light'
    const sendMessage = (message) => {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
    sendMessage({
        setConfig: {
            theme: theme
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.querySelector(".page-header_button");
    themeBtn.addEventListener("click", changeTheme);
});