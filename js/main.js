(function($) {
    "use strict";

    /*---------------------
    Preloader
  ---------------------*/
    $(document).ready(function() {
        $("#loading").fadeOut(500);
    });

    /*---------------------
      Menu Stick
    --------------------- */
    var navOffset = $(".header").offset().top;
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop();
        if (scrollPos > navOffset) {
            $(".header").addClass("stick");
        } else {
            $(".header").removeClass("stick");
        }
    });

    /*---------------------
    Home Two Menu
  ---------------------*/
    if ($('.header-two').length) {
        $('.header-two .navbar-toggler').on('click', function() {
            $('.header-two').toggleClass("active");
        });
        $('.header-two .navbar-nav .menu-item-has-children').on('click', function() {
            $(this).children('.sub-menu').slideToggle();
        });
    }

    /*---------------------
    Mobile Menu Dropdown
  ---------------------*/
    if ($('.header-one').length) {
        $('.header-one .navbar-toggler').on('click', function() {
            $('.header-one').toggleClass("is-active");
        });
    }

    /*---------------------
      Hero Title
    ---------------------*/
    if ($(".hero").length) {
        $(".hero").appear(function() {
            $(this).addClass("appear");
        });
    }

    /*----------------------------
    Reset All ScrollTriggers
  ------------------------------ */
    $(window).on('load', function() {
        ScrollTrigger.refresh();
    });
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    /*----------------------------
    Image Full
  ------------------------------ */
    if ($(".image-full").length) {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".image-full",
                start: "top top",
                end: "+=120%",
                scrub: true,
                pin: true
            }
        });
        tl.to(".image-full__scroll", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "none"
        });
    }

    /*----------------------------
      Text
    ------------------------------ */
    if ($('.text-fill').length) {
        var controller = new ScrollMagic.Controller();
        $('.text-fill').each(function() {
            var words = $(this).text();
            var total = words;
            $(this).empty();
            $(this).append($("<span /> ").text(words));
        });
        $('.text-fill span').each(function() {
            var $this = $(this);
            var $thisHeight = $(this).height() * 2;

            var maskFillText = gsap.to($this, {
                duration: 1,
                backgroundSize: "200% 100%",
                ease: Linear.easeNone
            });

            var maskFillTextScene = new ScrollMagic.Scene({
                    triggerElement: $this[0],
                    triggerHook: 0.8,
                    duration: $thisHeight
                })
                .setTween(maskFillText)
                .addTo(controller);

            if ($("body").hasClass("smooth-scroll")) {
                maskFillTextScene.refresh();
            }
        });
    }

    /*----------------------------
    Data Background JS
  ------------------------------ */
    $("[data-background]").each(function() {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
    });

    /*---------------------
    About Draggable Element
  ---------------------*/
    if ($('.about__project-wrapper').length) {
        $('.about__project').draggable({
            scroll: true,
            cursor: "move",
            containment: ".about__project-wrapper"
        });
    }

    /*---------------------
    Counter
  ---------------------*/
    var timer = $('.timer');
    if (timer.length) {
        timer.appear(function() {
            timer.countTo();
        });
    }

    /*---------------------
      Marquee
    ---------------------*/
    if ($('.marquee__items').length) {
        var marqueeCarousel = $('.marquee__items');
        marqueeCarousel.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            centerMode: false,
            speed: 6000,
            loop: true,
            initialSlide: 1,
            arrows: false,
            draggable: false,
            focusOnSelect: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnHover: false,
            cssEase: 'linear',
        });
    }

    /*----------------------------
      Testimonial
    ------------------------------ */
    $(document).ready(function() {
        if ($(".testimonial__block").length) {
            gsap.registerPlugin(ScrollTrigger);
            const testimonialSections = gsap.utils.toArray(".testimonial__items");
            const testimonialSectionWidth = $(".testimonial__block").width();
            testimonialSections.forEach((section, index) => {
                let testimonialPanel = Array.from(section.querySelectorAll(".testimonial__item"));
                let tlTestimonial = gsap.timeline({
                    scrollTrigger: {
                        id: `testimonialSectionTrigger-${index}`,
                        start: 'center center',
                        pin: true,
                        scrub: 1,
                        trigger: section,
                        invalidateOnRefresh: true,
                        end: () =>
                            "+=" + (section.scrollWidth - testimonialSectionWidth)
                    }
                });
                tlTestimonial.to(
                    testimonialPanel, {
                        x: () =>
                            -(section.scrollWidth - testimonialSectionWidth) + "px",
                        duration: 1,
                        ease: "none"
                    },
                    0.05
                );
                tlTestimonial.to({}, {
                    duration: 0.1
                });
            });
        }
    });

    /*---------------------
    CTA Draggable Element
  ---------------------*/
    if ($('.cta__heading').length) {
        $('.cta__list').draggable({
            scroll: true,
            cursor: "move",
            containment: ".cta__lists"
        });
    }

    /*----------------------------
      Experience
    ------------------------------ */
    if ($(".experience").length) {
        $(".experience__item").on('mouseenter', function() {
            $(this).children().children(".experience__content").slideDown();
        });
        $(".experience__item").on('mouseleave', function() {
            $(this).children().children(".experience__content").slideUp();
        });
    }

    /*---------------------
      Clients Carousel
    ---------------------*/
    if ($('.clients').length) {
        var clientsCarousel = $('.clients__carousel');
        clientsCarousel.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            centerMode: false,
            speed: 2000,
            loop: true,
            initialSlide: 1,
            arrows: false,
            draggable: false,
            focusOnSelect: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnHover: false,
            cssEase: 'linear',
        });
    }

    /*--------------------------------------------------
    Hero Page Height Titles
    ---------------------------------------------------*/
    HeightTitles();

    function HeightTitles() {
        function generateSpans(selector) {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                const text = element.textContent.trim();
                const words = text.split(' ');
                let finalHTML = ''; // Empty span at the beginning		
                words.forEach((word, index) => {
                    finalHTML += '<div>'; // Open a div for each word
                    for (let i = 0; i < word.length; i++) {
                        finalHTML += `<span>${word[i]}</span>`; // Wrap each letter in a span
                    }
                    finalHTML += '</div>'; // Close the div for each word

                    if (index === words.length - 1) {
                        finalHTML += '<div><span></span></div>'; // Empty span and a div between words
                    }
                });
                finalHTML += ''; // Empty span at the end		
                element.innerHTML = finalHTML;
            });
        }
        generateSpans('.hero-page__tittle h1');

        function applyHoverEffect(selector) {
            const spans = document.querySelectorAll(selector);
            spans.forEach((span) => {
                span.originalScaleY = 1;
                span.addEventListener('mousemove', handleMouseMove);
            });

            function handleMouseMove(e) {
                const hoveredSpan = e.target;
                const rect = hoveredSpan.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const scaleFactor = 0.2;
                const center = rect.width / 2;
                let scale;
                if (mouseX < center) {
                    scale = (scaleFactor + 1) + (scaleFactor * mouseX) / center;
                } else {
                    scale = (scaleFactor + 1) + (scaleFactor * (rect.width - mouseX)) / center;
                }
                gsap.to(hoveredSpan, {
                    scaleY: scale,
                    duration: 0.5,
                    ease: 'power4.out',
                });
                const spansArray = Array.from(spans);
                const hoveredIndex = spansArray.indexOf(hoveredSpan);
                const prevSpan = spansArray[hoveredIndex - 1];
                const nextSpan = spansArray[hoveredIndex + 1];
                if (prevSpan) {
                    let distanceFromMouse = Math.abs(rect.left - e.clientX);
                    distanceFromMouse = Math.min(distanceFromMouse, center);
                    const scalePrev = 1 + (scaleFactor * (center - distanceFromMouse)) / center;
                    gsap.to(prevSpan, {
                        scaleY: scalePrev,
                        duration: 0.5,
                        ease: 'power4.out',
                    });
                }
                if (nextSpan) {
                    let distanceFromMouse = Math.abs(rect.right - e.clientX);
                    distanceFromMouse = Math.min(distanceFromMouse, center);
                    const scaleNext = 1 + (scaleFactor * (center - distanceFromMouse)) / center;
                    gsap.to(nextSpan, {
                        scaleY: scaleNext,
                        duration: 0.5,
                        ease: 'power4.out',
                    });
                }
            }
            spans.forEach((span) => {
                span.addEventListener('mouseleave', handleMouseLeave);
            });

            function handleMouseLeave() {
                spans.forEach((span) => {
                    gsap.to(span, {
                        scaleY: span.originalScaleY,
                        duration: 0.5,
                        ease: 'power4.out',
                    });
                });
            }
        }
        applyHoverEffect('.hero-page__tittle h1 span');
    } // End Height Titles
    gsap.set($(".hero-page__tittle h1 span"), {
        y: 120,
        opacity: 0
    });
    gsap.set($(".hero-page__text p"), {
        y: 30,
        opacity: 0
    });
    const spanLetters = document.querySelectorAll('.hero-page__tittle h1 span');
    gsap.set(spanLetters, {
        scaleY: 0.3,
        opacity: 0,
        y: 0
    });
    const shuffledSpans = Array.from(spanLetters).sort(() => Math.random() - 0.5);
    const spanLettersPlay = gsap.timeline({
        delay: 0.8
    });
    shuffledSpans.forEach((spanLetters, index) => {
        spanLettersPlay.to(spanLetters, {
            duration: 0.7,
            scaleY: 1,
            y: 0,
            opacity: 1,
            ease: Power3.easeOut,
        }, index * 0.05);
    });
    gsap.to('.hero-page__text p', {
        duration: 0.7,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 1,
        ease: Power3.easeOut
    });

    /*----------------------------
     Image Pixel Box
    ------------------------------ */
    var pixelsAnimation = document.querySelectorAll('.pixels-animation');

    pixelsAnimation.forEach(function(pixelAnimation) {
        var pixelsBlock = document.createElement('div');
        pixelsBlock.className = 'pixels-block';
        pixelAnimation.appendChild(pixelsBlock);
    });

    function calculatePixelBox() {
        var windowWidth = window.innerWidth;
        var pixelsPerRow = 0;

        // Define breakpoints and corresponding pixels per row
        if (windowWidth >= 1920) {
            pixelsPerRow = 14;
        } else if (windowWidth >= 1600) {
            pixelsPerRow = 18;
        } else if (windowWidth >= 1280) {
            pixelsPerRow = 16;
        } else if (windowWidth >= 1024) {
            pixelsPerRow = 14;
        } else if (windowWidth >= 768) {
            pixelsPerRow = 12;
        } else {
            pixelsPerRow = 10;
        }

        // Assuming pixels are square, calculate pixel size in pixels
        var pixelSize = windowWidth / pixelsPerRow;

        var pixelsBlocks = document.querySelectorAll('.pixels-block');

        pixelsBlocks.forEach(function(block) {
            // Clear previous pixels if any
            block.innerHTML = '';

            // Calculate the size of the parent .pixels-animation element
            var parentWidth = block.parentElement.offsetWidth;
            var parentHeight = block.parentElement.offsetHeight;

            // Calculate the number of pixels needed to cover the parent element
            var cols = Math.ceil(parentWidth / pixelSize);
            var rows = Math.ceil(parentHeight / pixelSize);
            rows += 1; // Increment rows by 1

            // Calculate pixel size in percentage relative to wrapper width
            var pixelSizePercent = (100 / cols) + '%';

            // Create and append the pixel elements
            for (var i = 0; i < rows * cols; i++) {
                var pixelBox = document.createElement('div');
                pixelBox.className = 'pixel-box';
                pixelBox.style.width = pixelSizePercent;
                block.appendChild(pixelBox);
            }
        });
    }
    calculatePixelBox();

    // Recalculate on window resize
    window.addEventListener('resize', calculatePixelBox);

    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.pixels-animation').forEach((pixelBlock) => {
        const pixelAnimation = pixelBlock.querySelectorAll(".pixel-box");

        gsap.to(pixelAnimation, {
            scrollTrigger: {
                trigger: pixelBlock,
                start: "top 60%",
            },
            duration: 0.2,
            opacity: 0,
            delay: function() {
                return gsap.utils.random(0, 0.6);
            },
            ease: Power4.easeOut,
            onComplete: function() {
                pixelBlock.querySelectorAll(".pixels-block").forEach(pixelbox => {
                    pixelbox.remove();
                });
            }
        });
    });

    /*---------------------
      Stack Fill
    ---------------------*/
    if ($(".stack").length) {
        $(".stack__item-fillwrap").appear(function() {
            $(this).addClass("appear");
        });
    }

    /*---------------------
      Section Subtitle
    ---------------------*/
    if ($(".section-subtitle").length) {
        $(".section-subtitle").appear(function() {
            $(this).addClass("appear");
        });
    }

    /*---------------------
      Portfolio Details Slider
    ---------------------*/
    if ($('.portfolio-details-slider').length) {
        var portfolioSlider = $('.portfolio-details-slider__items');
        portfolioSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            loop: true,
            draggable: false,
            focusOnSelect: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnHover: false,
        });
    }

    /*---------------------
      Service Details Slider
    ---------------------*/
    if ($('.service-details-slider').length) {
        var serviceSlider = $('.service-details-slider__items');
        serviceSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            loop: true,
            draggable: false,
            focusOnSelect: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnHover: false,
        });
    }

    /*----------------------------
    Service Details Video
  ------------------------------ */
    if ($(".service-details-content__video").length) {
        var playerAbc = new Plyr('#service-details-content__video-player');
        jQuery(".service-details-content__video-play").on("click", function() {
            playerAbc.play();
        });
        playerAbc.on("play", function(e) {
            jQuery(".service-details-content__video-overlay").css("display", "none");
        });

        const videoContainer = document.getElementById("service-details-content__video");
        const playButton = document.getElementById("service-details-content__video-play");

        videoContainer.addEventListener("mousemove", function(event) {
            const containerRect = videoContainer.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            const buttonWidth = playButton.offsetWidth;
            const buttonHeight = playButton.offsetHeight;
            const buttonX = mouseX - buttonWidth / 2;
            const buttonY = mouseY - buttonHeight / 2;

            const maxButtonX = containerRect.width - buttonWidth;
            const maxButtonY = containerRect.height - buttonHeight;
            playButton.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
            playButton.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
        });

        videoContainer.addEventListener("mouseleave", function() {
            setTimeout(function() {
                playButton.style.left = "50%";
                playButton.style.top = "50%";
                playButton.style.transform = "translate(-50%, -50%) scale(1)";
                playButton.style.transition = "all 0.3s ease-out";
            }, 50);
        });
        videoContainer.addEventListener("mouseover", function() {
            playButton.style.transition = "transform ease-out 0.3s";
            playButton.style.transform = "scale(1.2)";
        });
    }

    /*----------------------------
      FAQ Accordion
    ------------------------------ */
    if ($(".faq").length) {
        $(".faq__items .faq__single > .faq__content").hide();
        $(".faq__items > .faq__item:first-child .faq__content").show();
        $(".faq__items > .faq__item:first-child").addClass("active");

        $(".faq__item .faq__heading").on('click', function() {
            if ($(this).parent().parent().hasClass("active")) {
                $(this).parent().parent().removeClass("active").find(".faq__content").slideUp(500);
            } else {
                $(".faq__item.active .faq__content").slideUp(500);
                $(".faq__item.active").removeClass("active");
                $(this).parent().parent().addClass("active").find(".faq__content").slideDown(500);
            }
            return false;
        });
    }

})(jQuery);