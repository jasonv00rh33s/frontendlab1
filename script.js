function initFallingImages() {
    const header = document.querySelector(".home header");
    if (!header) return;

    const images = ["images/dumbells.webp", "images/barbell.avif", "images/mat.avif"];

    setInterval(() => {
        const img = document.createElement("img");
        img.src = images[Math.floor(Math.random() * images.length)];
        img.className = "falling-img";
        img.style.left = Math.random() * (header.clientWidth - 40) + "px";
        img.addEventListener("animationend", () => header.removeChild(img));
        header.appendChild(img);
    }, 1200);
}

initFallingImages();


function initNewBadge() {
    document.querySelectorAll(".product-card[data-new]").forEach(card => {
        const title = card.querySelector("h3");
        const badge = document.createElement("span");
        badge.className = "new-badge";
        title.appendChild(badge);

        const text = "Новинка!";
        let i = 0;
        const timer = setInterval(() => {
            i++;
            badge.textContent = text.slice(0, i);
            if (i === text.length) clearInterval(timer);
        }, 300);
    });
}

initNewBadge()


function initSearch() {
    const input = document.getElementById("search");
    if (!input) return;

    const cards = document.querySelectorAll(".product-card");
    const empty = document.getElementById("no-results");

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        let found = 0;

        cards.forEach(card => {
            const name = card.querySelector("h3").firstChild.textContent.trim().toLowerCase();
            const match = name.includes(query);
            card.hidden = !match;
            if (match) found++;
        });

        empty.hidden = found > 0;
    });
}

initSearch();


function initDetailsTooltip() {
    const details = document.getElementById("details");
    if (!details) return;
    const wrap = details.closest(".details-wrap");

    details.addEventListener("mouseenter", () => wrap.classList.add("active"))
    details.addEventListener("mouseleave", () => wrap.classList.remove("active"))

}

initDetailsTooltip()


function initNavLayout() {
    const nav = document.querySelector(".home nav");
    if (!nav) return;

    const mq = window.matchMedia("(max-width: 768px)");

    function apply() {
        nav.classList.toggle("nav-vertical", mq.matches);
        document.body.classList.toggle("nav-right", mq.matches);
    }

    apply();
    mq.addEventListener("change", apply);
}

// initNavLayout();




const logo = document.querySelector('header img');
if (logo) {
    logo.onclick = function () {
        console.log("клік по логотипу");
    };
}