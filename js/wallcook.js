var ewfSetCookie = function (exdays) {
  var psmed = $("#email").val();
  var pswed = $("#pcodeStu").val();
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie =
    "mwallcstu=true; expires=" + expires + ";path=/;domain=mastrowall.com";
  document.cookie =
    "mwallpswstus=" +
    btoa(psmed) +
    "; expires=" +
    expires +
    ";path=/;domain=mastrowall.com";
  document.cookie =
    "mwallpswstud=" +
    btoa(pswed) +
    "; expires=" +
    expires +
    ";path=/;domain=mastrowall.com";
};

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var p = 0; p < ca.length; p++) {
    var cookstrem = ca[p].split("mwallpswstus=");
    var cookstrkd = ca[p].split("mwallpswstud=");
    if (cookstrem[0] == 0) {
      var paem = window.atob(cookstrem[1]);
      document.getElementById("email").value = paem;
    } else if (cookstrkd[0] == 0) {
      var pacd = window.atob(cookstrkd[1]);
      document.getElementById("pcodeStu").value = pacd;
      inwallStu();
    }
  }
}
$(document).ready(function () {
  getCookie();
});
function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name +
      "=true;" +
      "expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=mastrowall.com";
  }
  setTimeout(function () {
    location.reload();
  }, 2000);
}
function signagn() {
  let stateObj = { id: "0" };
  window.history.replaceState(stateObj, "", "/");
  document.title = "Student | MASTROWALL";
  deleteAllCookies();
  setTimeout(function () {
    location.reload();
  }, 2000);
}
$(document).ready(function () {
  var mn = "https://mastrowall.com/";
  // var mn = "http://127.0.0.1:5505/";
  var rcWidgetContainer = document.getElementById("rc-widget");
  var xhrHTML = new XMLHttpRequest();
  xhrHTML.onreadystatechange = function () {
    if (xhrHTML.readyState === 4 && xhrHTML.status === 200) {
      rcWidgetContainer.innerHTML = xhrHTML.responseText;
      loadScript(mn + "rc-widget/script.js");
      loadScript(mn + "/src-engines/scrpt.js");
    }
  };
  xhrHTML.open("GET", mn + "rc-widget/index.html");
  xhrHTML.send();
  $("<link>", {
    rel: "stylesheet",
    href: mn + "/rc-widget/style.css",
  }).appendTo("head");
  document.body.style.backgroundColor = "#414141";
  function loadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  }
});

/* -----------------------------------------------------------------
   What it does:
   1️⃣  Intercept every `window.open` call (including links).
   2️⃣  If the target URL is on the host live.mastrowall.com,
       show a prompt whose text/value is loaded from localStorage.
   3️⃣  Return the opened Window object (or null when cancelled).
   ----------------------------------------------------------------- */
(() => {
  // -----------------------------------------------------------------
  // 1️⃣  Configuration – change these if you need a different key
  // -----------------------------------------------------------------
  const LOCAL_STORAGE_KEY = "mastrowallPrompt"; // the key you store the prompt text under
  const DEFAULT_PROMPT =
    "You’re about to leave this site and open a LIVE session. We recommend using only one LIVE session at a time. Do you want to continue?";

  // -----------------------------------------------------------------
  // 2️⃣  Helper – read the prompt text from localStorage (fallback to default)
  // -----------------------------------------------------------------
  function getPromptText() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored !== null && stored.trim() !== "" ? stored : DEFAULT_PROMPT;
  }

  // -----------------------------------------------------------------
  // 3️⃣  Core – a wrapper around the native window.open
  // -----------------------------------------------------------------
  function guardedOpen(url, target = "_blank", features = "") {
    // If url is not a string (some callers pass a window reference), just forward it.
    if (typeof url !== "string") {
      return originalOpen.apply(window, arguments);
    }

    // Parse the URL – we need the hostname.
    let parsed;
    try {
      parsed = new URL(url, location.href); // works for relative URLs too
    } catch (e) {
      // Invalid URL → just use the native open and bail out.
      return originalOpen.apply(window, arguments);
    }

    // -----------------------------------------------------------------
    // 4️⃣  Is the hostname the one we care about?
    // -----------------------------------------------------------------
    if (parsed.hostname === "live.mastrowall.com") {
      const promptText = getPromptText();

      // You can replace `confirm` with a custom modal if you need richer UI.
      const ok = window.confirm(promptText);

      if (!ok) {
        // User cancelled → do NOT open the new tab/window.
        console.log(
          "[mastrowall‑guard] navigation to",
          url,
          "blocked by user.",
        );
        return null;
      }
    }

    // -----------------------------------------------------------------
    // 5️⃣  If we got here the user approved (or it wasn't a Mastrowall URL)
    // -----------------------------------------------------------------
    const opened = originalOpen.apply(window, [url, target, features]);

    // Optional: you may want to keep a reference to every Mastrowall window
    // openedWindows.push(opened);

    return opened;
  }

  // -----------------------------------------------------------------
  // 6️⃣  Preserve the original window.open reference
  // -----------------------------------------------------------------
  const originalOpen = window.open;

  // -----------------------------------------------------------------
  // 7️⃣  Replace the global `window.open` with our guarded version.
  //     Use `Object.defineProperty` to keep the same descriptor (writable, enumerable)
  // -----------------------------------------------------------------
  Object.defineProperty(window, "open", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: guardedOpen,
  });

  // -----------------------------------------------------------------
  // 8️⃣  Also guard plain <a> clicks that have target="_blank" or that rely on the default browser navigation.
  // -----------------------------------------------------------------
  document.addEventListener(
    "click",
    (e) => {
      // Only handle left‑clicks without modifier keys
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      // Find the closest anchor element
      const anchor = e.target.closest("a");
      if (!anchor) return;

      // If the link has no href or is a hash link, ignore
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      // Resolve the URL (relative to the current page)
      let linkUrl;
      try {
        linkUrl = new URL(href, location.href);
      } catch {
        return; // malformed URL – let the browser handle it
      }

      // -----------------------------------------------------------------
      // 9️⃣  Same check as for window.open – only intercept Mastrowall links
      // -----------------------------------------------------------------
      if (linkUrl.hostname === "live.mastrowall.com") {
        const promptText = getPromptText();
        const ok = window.confirm(promptText);
        if (!ok) {
          e.preventDefault(); // stop navigation
          console.log(
            "[mastrowall‑guard] link navigation to",
            linkUrl.href,
            "blocked.",
          );
          return;
        }
        // If the user accepts, the default navigation proceeds normally.
      }
    },
    true, // capture phase – runs before the default navigation
  );

  // -----------------------------------------------------------------
  // 9️⃣  OPTIONAL – expose a tiny API for debugging / configuration
  // -----------------------------------------------------------------
  window.mastrowallGuard = {
    /** Change the localStorage key that holds the prompt text */
    setPromptStorageKey(key) {
      if (typeof key === "string") {
        // Update the constant used by getPromptText (a closure variable)
        // Note: we cannot re‑assign a const, so we re‑define the function.
        const old = getPromptText;
        getPromptText = () => {
          const stored = localStorage.getItem(key);
          return stored !== null && stored.trim() !== ""
            ? stored
            : DEFAULT_PROMPT;
        };
        console.info(`[mastrowall‑guard] storage key changed to "${key}"`);
      }
    },

    /** Manually trigger the prompt for a given URL (useful for tests) */
    askIfMastrowall(url) {
      try {
        const parsed = new URL(url, location.href);
        if (parsed.hostname === "live.mastrowall.com") {
          return window.confirm(getPromptText());
        }
        return true; // not a Mastrowall URL → auto‑allow
      } catch (e) {
        console.warn(
          "Invalid URL passed to mastrowallGuard.askIfMastrowall",
          e,
        );
        return false;
      }
    },

    /** Return the current prompt text (read‑only) */
    getCurrentPrompt() {
      return getPromptText();
    },
  };
})();
