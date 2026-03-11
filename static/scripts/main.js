document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.getElementById("navBar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelectorAll('#navMenu a[href^="#"]');
    const chatButtons = document.querySelectorAll(".js-open-chat");

    if (menuToggle && navBar) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navBar.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navBar.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", function (event) {
            const clickedInsideNav = navBar.contains(event.target);
            if (!clickedInsideNav && navBar.classList.contains("open")) {
                navBar.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    function waitForTawkAndOpen(attempt = 0) {
        const maxAttempts = 40;

        if (window.Tawk_API) {
            try {
                if (typeof window.Tawk_API.maximize === "function") {
                    window.Tawk_API.maximize();
                    return;
                }

                if (typeof window.Tawk_API.toggle === "function") {
                    window.Tawk_API.toggle();
                    return;
                }
            } catch (error) {
                console.error("Ошибка при открытии Tawk:", error);
            }
        }

        const tawkIframe = document.querySelector('iframe[src*="tawk.to"], iframe[title*="chat"], iframe[title*="Chat"]');
        if (tawkIframe) {
            try {
                tawkIframe.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            } catch (error) {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth"
                });
            }
        }

        if (attempt < maxAttempts) {
            setTimeout(function () {
                waitForTawkAndOpen(attempt + 1);
            }, 250);
        }
    }

    chatButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            waitForTawkAndOpen();
        });
    });

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();

            const topOffset = 110;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });

    const revealItems = document.querySelectorAll(
        ".hero, .service-pill, .info-card, .step-card, .contact-box, .band, .footer-box"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealItems.forEach(function (item) {
            item.classList.add("reveal-init");
            observer.observe(item);
        });
    }

    let lastScrollY = window.scrollY;
    const topStrip = document.querySelector(".top-strip");

    window.addEventListener("scroll", function () {
        const currentScrollY = window.scrollY;

        if (!topStrip) return;

        if (currentScrollY > 80) {
            topStrip.classList.add("is-scrolled");
        } else {
            topStrip.classList.remove("is-scrolled");
        }

        lastScrollY = currentScrollY;
    });
});
