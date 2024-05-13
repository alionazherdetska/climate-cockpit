import { useEffect } from "react";
import "./CloudAnimation.css";

const Hero3DCloud = () => {
  useEffect(() => {
    let lastTime = 0;
    const vendors = ["ms", "moz", "webkit", "o"];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelRequestAnimationFrame =
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };

    let layers = [];
    let objects = [];

    const world = document.getElementById("world");
    const viewport = document.getElementById("viewport");

    if (!viewport) {
      console.error(
        "Viewport not found in the DOM. Make sure your HTML structure is correct.",
      );
      return;
    }

    let d = 1000;
    let p = 1000;
    let worldXAngle = 1000;
    let worldYAngle = 1000;
    updateView();

    viewport.style.webkitPerspective = p;
    viewport.style.MozPerspective = p;
    viewport.style.oPerspective = p;

    generate();

    function createCloud() {
      const div = document.createElement("div");
      div.className = "cloudBase";
      let x = -50 - 0.2 * 512;
      let y = 90;
      let z = 106 - 0.1 * 512;
      const t = `translateX( ${x}px ) translateY( ${y}px ) translateZ( ${z}px )`;
      div.style.webkitTransform =
        div.style.MozTransform =
        div.style.msTransform =
        div.style.oTransform =
        div.style.transform =
          t;
      world.appendChild(div);

      for (let j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
        const cloud = document.createElement("div");
        cloud.style.opacity = 0;
        cloud.style.opacity = 0.8;
        cloud.className = "cloudLayer";

        let x = 256 - Math.random() * 512;
        let y = 256 - Math.random() * 512;
        let z = 100 - Math.random() * 200;
        const a = Math.random() * 360;
        const s = 0.25 + Math.random();
        x *= 0.2;
        y *= 0.2;
        cloud.data = {
          x: x,
          y: y,
          z: z,
          a: a,
          s: s,
          speed: 0.1 * Math.random(),
        };
        const t = `translateX( ${x}px ) translateY( ${y}px ) translateZ( ${z}px ) rotateZ( ${a}deg ) scale( ${s} )`;
        cloud.style.webkitTransform =
          cloud.style.MozTransform =
          cloud.style.msTransform =
          cloud.style.oTransform =
          cloud.style.transform =
            t;

        div.appendChild(cloud);
        layers.push(cloud);
      }

      return div;
    }

    function generate() {
      objects = [];
      if (world.hasChildNodes()) {
        while (world.childNodes.length >= 1) {
          world.removeChild(world.firstChild);
        }
      }
      for (let j = 0; j < 5; j++) {
        objects.push(createCloud());
      }
    }

    function updateView() {
      const t = `translateZ( ${d}px ) rotateX( ${worldXAngle}deg) rotateY( ${worldYAngle}deg)`;
      world.style.webkitTransform =
        world.style.MozTransform =
        world.style.msTransform =
        world.style.oTransform =
        world.style.transform =
          t;
    }

    function update() {
      for (let j = 0; j < layers.length; j++) {
        const layer = layers[j];
        layer.data.a += layer.data.speed;
        const t = `translateX( ${layer.data.x}px ) translateY( ${
          layer.data.y
        }px ) translateZ( ${
          layer.data.z
        }px ) rotateY( ${-worldYAngle}deg ) rotateX( ${-worldXAngle}deg ) rotateZ( ${
          layer.data.a
        }deg ) scale( ${layer.data.s} )`;
        layer.style.webkitTransform =
          layer.style.MozTransform =
          layer.style.msTransform =
          layer.style.oTransform =
          layer.style.transform =
            t;
      }

      requestAnimationFrame(update);
    }

    update();
  }, []);

  return (
    <div id="viewport">
      <div id="world"></div>
    </div>
  );
};

export default Hero3DCloud;
