const theme = localStorage.getItem("theme");
document.querySelector('html').className = theme;

const changeTheme = ()=>{
    const html = document.querySelector('html');
    const themeNow = html.className;
    if(themeNow === "dark"){
        html.className = "light";
        localStorage.setItem("theme","light");
    }else{
        html.className = "dark";
        localStorage.setItem("theme","dark");
    }
};

document.addEventListener('DOMContentLoaded',function(){
    const themeBtn = document.querySelector(".page-header_button");
    themeBtn.addEventListener("click",changeTheme);
});