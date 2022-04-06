// Get our instant tracker
const instantTracker = document.getElementById("instant-tracker");

// Get our placement button & hide on launch
const placementUI = document.getElementById("zappar-placement-ui");
placementUI.style.display = "none";
// Create a variable to easily manage when anchor has been placed or not
let hasPlaced = false;

// Get our hotspot
const hotspot = document.getElementById("hotspot");

// Listen for when the user taps the UI...
placementUI.addEventListener("click", function() {
    // ...if at this point we've already placed the anchor...
    if (hasPlaced) {
        // ...reset hasPlaced to false...
        hasPlaced = false;
        // ...set placement mode to true on our instant tracker...
        instantTracker.setAttribute("zappar-instant", "placement-mode: true");
        // ...replace the text on the placement button...
        placementUI.innerText = "Tap here to place";
        // ...pause any active holograms...
        sosHologramContext.pauseActiveHolograms();
        // ...show our hotspot again...
        hotspot.setAttribute("visible", "true");
        return;
    }
    // ...otherwise, if at this point we have NOT already placed the anchor,
    // set hasPlaced to true
    hasPlaced = true;
    // Set placement mode to false on our instant tracker
    instantTracker.setAttribute("zappar-instant", "placement-mode: false");
    // ...replace the text on the placement button...
    placementUI.innerText = "Tap here to pick up";
    // ...hide our hotspot...
    hotspot.setAttribute("visible", "false");

    // ...then start the hologram!
    sosHologramContext.playActiveHolograms();
});

window.addEventListener("load", init);

function init() {
    // Begin using our splash screen...
    examplesSplash.showUI({
        // When the button is pressed, hide the splash screen
        // & show permission request when user taps on the button.
        onClick: (e) => {
            ZapparAFrame.ZapparThreeForAFrame.permissionRequestUI().then((granted) => {
                // Get our scene, camera and loading circle...
                const zapparScene = document.querySelector("a-scene");
                const system = zapparScene.systems["zappar-camera"];
                const loadingCircle = document.getElementById('loading-circle-ui');
                //...show our loading circle to signify wait...
                loadingCircle.style.display = 'block';
                system.permissionGranted = granted;

                // If permission is granted...
                if (granted) {
                    // ...start the camera...
                    system.camera.start(system.userFacing);
                    // Set the encoding to sRGB
                    zapparScene.renderer.outputEncoding = THREE.sRGBEncoding;
                    system.camera.backgroundTexture.encoding = THREE.sRGBEncoding;
                    // ...show our scene & hide the loading circle...
                    zapparScene.style.display = "block";
                    // ...& show our placementUI after 3 miliseconds to make sure
                    // it starts in the right position
                    setTimeout(() => placementUI.style.display = "block", 300);
                    setTimeout(() => loadingCircle.style.display = "none", 5000);
                } else {
                    // Otherwise, permission is denied.
                    ZapparAFrame.ZapparThreeForAFrame.permissionDeniedUI();
                }
            });

          // Pass 'false' to skip fading out.
          e.destroy();
        },
        title: 'AR Volumetric Video',
        subtitle: 'Presented by:</br>Zappar & Sense of Space',
        buttonText: 'Tap to Start',
        background: '',
        logo: './assets/logo.png',
    });
}