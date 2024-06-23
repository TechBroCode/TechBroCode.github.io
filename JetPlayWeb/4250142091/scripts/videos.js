let tabItem = document.querySelectorAll(".tab-item");
let tabIconPath = document.querySelectorAll(".tab_icon_path");
let tabButton = document.querySelectorAll(".tab_btn");
let tabIndicator = document.querySelector(".tab_indicator");

fetch("https://techbrocode.github.io/JetPlayWeb/4250142091/assets/json/video.json")
    .then(response => {
        if (!response.ok) {
            alert(`Http Error ${response.status}`);
        }
        loadScript();
        return response.json();
    })
    .then(data => {
        console.log(`json: ${data.toString()}`);
        alert(`Good ${data.fruit}`);
    })
    .catch(error => {

    });
function loadScript() {
    window.onload = function () {
        tabIndicator.style.width = tabItem[0].offsetWidth + "px";
        tabIndicator.style.top = (tabItem[0].offsetHeight - 1) + "px";
        tabIndicator.style.left = tabItem[0].offsetLeft + "px";
    }
    for (let c = 0; c < tabItem.length; c++) {
        tabItem[c].onmouseup = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(0, 0, 0, 0)";
                clearInterval(clearBackground);
            }, 150);
        }

        tabItem[c].onmousedown = () => {
            tabItem[c].style.backgroundColor = "rgb(228,228,228)";
        };

        tabItem[c].onmouseout = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(0, 0, 0, 0)";
                clearInterval(clearBackground);
            }, 150);
        };

        tabItem[c].ontouchstart = () => {
            tabItem[c].style.backgroundColor = "rgb(228,228,228)";
        };

        tabItem[c].ontouchend = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(0, 0, 0, 0)";
                clearInterval(clearBackground);
            }, 150);
        };

        tabItem[c].ontouchcancel = () => {
            let clearBackground = setInterval(() => {
                tabItem[c].style.backgroundColor = "rgba(0, 0, 0, 0)";
                clearInterval(clearBackground);
            }, 150);
        };
    }

    tabItem.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabIconPath.forEach(svgPath => {
                svgPath.classList.remove("active");
            });
            tabButton.forEach(eachTabButton => {
                eachTabButton.classList.remove("active");
            });
            tab.firstElementChild.firstElementChild.classList.add("active");
            tab.lastElementChild.classList.add("active");
            tabIndicator.style.width = tab.offsetWidth + "px";
            tabIndicator.style.top = (tab.offsetHeight - 1) + "px";
            tabIndicator.style.left = tab.offsetLeft + "px";
        });
    })
}