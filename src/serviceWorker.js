// Yeh code ek service worker ko register karne ke liye hai.
// register() default roop se nahi bulaya jata.

// Yeh app ko fast load karne me madad karta hai aur offline mode bhi provide karta hai.
// Lekin naye updates tabhi dikhayi denge jab sabhi purane tabs band ho chuke honge.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Localhost par check karega ki service worker maujood hai ya nahi.
        checkValidServiceWorker(swUrl, config);

        // Agar service worker ready hai to console me message dikhayega.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "Yeh web app ek service worker ke dwara cache-first mode me chal rahi hai."
          );
        });
      } else {
        // Agar localhost nahi hai to service worker ko register karega.
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // Agar naye updates available hain to console me message dikhayega.
              console.log(
                "Naya content available hai, lekin yeh tabhi update hoga jab sabhi tabs band ho jayenge."
              );

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Agar sab kuch cache ho chuka hai to offline mode enable karega.
              console.log("Content offline mode ke liye cache ho chuka hai.");

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Service worker register karne me error aayi:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Yeh function check karega ki service worker available hai ya nahi.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // Agar service worker nahi mila to page reload karega.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "Internet connection nahi mili, app offline mode me chal rahi hai."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
