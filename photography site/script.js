// Smooth scrolling for navbar links
const links = document.querySelectorAll(".nav-links a");
links.forEach(link => {
  link.addEventListener("click", event => {
    if (link.getAttribute("href").startsWith("#")) {
      event.preventDefault();
      const target =
        document.querySelector(
          link.getAttribute("href")
        );
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

// About me tabs functionality
function showTab(tabId, event) {
  const panels = document.querySelectorAll(".tab-panel");
  panels.forEach(panel => {
    panel.classList.remove("active");
  });

  const buttons = document.querySelectorAll(".tab");
  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
  if (event) {
    event.target.classList.add("active");
  }
}

// Gallery Lightbox (runs only if page contains the right elements)
document.addEventListener("DOMContentLoaded", function() {
  const galleryItems = document.querySelectorAll('.gallery-lightbox .gallery-item');
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".close-lightbox");
  const openOriginalBtn = document.getElementById("open-original-btn");

  if (galleryItems.length && lightbox && lightboxImg && closeBtn && openOriginalBtn) {
    galleryItems.forEach(item => {
      item.addEventListener("click", function() {
        const imgElement = item.querySelector("img");
        lightboxImg.src = imgElement.src;
        lightboxCaption.textContent = item.getAttribute("data-title") || "";

        // Wait for image to load to check orientation
        lightboxImg.onload = function() {
          if (lightboxImg.naturalHeight > lightboxImg.naturalWidth) {
            lightbox.classList.remove("landscape");
            lightbox.classList.add("portrait");
          } else {
            lightbox.classList.remove("portrait");
            lightbox.classList.add("landscape");
          }
        };
        if (lightboxImg.complete) {
          lightboxImg.onload();
        }

        // Compose viewer HTML url
        // Note: Because City/Nature/People.html and Viewer.html are in the same folder,
        // and Images/ are up one level, the src is already correct for both uses.
        const imgSrc = imgElement.getAttribute('src');
        const imgTitle = encodeURIComponent(lightboxCaption.textContent || "");
        openOriginalBtn.href = `Viewer.html?src=${encodeURIComponent(imgSrc)}&title=${imgTitle}`;

        lightbox.classList.add("active");
        document.body.classList.add("lightbox-open");
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("active", "portrait", "landscape");
      document.body.classList.remove("lightbox-open");
      setTimeout(() => {
        lightboxImg.src = "";
        lightboxCaption.textContent = "";
      }, 210);
    }

    closeBtn.onclick = closeLightbox;

    // Close on background click, not image
    lightbox.addEventListener("click", function(e) {
      if (e.target === this) closeLightbox();
    });

    // Close on Escape
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }
});