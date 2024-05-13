import { OverlayContainer } from "./Overlay.style.js";

export function Overlay({ onClose, children }) {
  return (
    <OverlayContainer className="overlay">
      <div className="overlay__background" onClick={() => onClose(false)} />
      <div className="overlay__container">
        <div className="overlay__controls">
          <button
            className="overlay__close"
            type="button"
            onClick={() => onClose(false)}
          />
        </div>
        {children}
      </div>
    </OverlayContainer>
  );
}

export default Overlay;
