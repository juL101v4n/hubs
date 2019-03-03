import { sets } from "./sets";

let rightHandState;
let leftHandState;
let cursorHand;
let leftTeleporter;
let rightTeleporter;
let cursorController;

export function resolveActionSets() {
  rightHandState = new Map(); //rightHandState || document.querySelector("#player-right-controller").components["super-hands"].state;
  leftHandState = new Map(); //leftHandState || document.querySelector("#player-left-controller").components["super-hands"].state;
  cursorHand = new Map(); //cursorHand || document.querySelector("#cursor").components["super-hands"].state;
  leftTeleporter = leftTeleporter || document.querySelector("#player-left-controller").components["teleporter"];
  rightTeleporter = rightTeleporter || document.querySelector("#player-right-controller").components["teleporter"];
  cursorController = cursorController || document.querySelector("#cursor-controller").components["cursor-controller"];

  const leftHandHoveringOnInteractable =
    !leftTeleporter.isTeleporting &&
    leftHandState.has("hover-start") &&
    leftHandState.get("hover-start").matches(".interactable, .interactable *");
  const leftHandHoveringOnPen =
    !leftTeleporter.isTeleporting &&
    leftHandState.has("hover-start") &&
    leftHandState.get("hover-start").matches(".pen, .pen *");
  const leftHandHoveringOnCamera =
    !leftTeleporter.isTeleporting &&
    leftHandState.has("hover-start") &&
    leftHandState.get("hover-start").matches(".icamera, .icamera *");
  const leftHandHoldingInteractable =
    leftHandState.has("grab-start") && leftHandState.get("grab-start").matches(".interactable, .interactable *");
  const leftHandHoldingPen = leftHandState.has("grab-start") && leftHandState.get("grab-start").matches(".pen, .pen *");
  const leftHandHoldingCamera =
    leftHandState.has("grab-start") && leftHandState.get("grab-start").matches(".icamera, .icamera *");
  const leftHandHovering = !leftTeleporter.isTeleporting && leftHandState.has("hover-start");
  const leftHandHoveringOnNothing = !leftHandHovering && !leftHandState.has("grab-start");
  const leftHandTeleporting = leftTeleporter.isTeleporting;

  const cursorGrabbing = cursorHand.has("grab-start");

  const rightHandTeleporting = rightTeleporter.isTeleporting;
  const rightHandHovering = !rightHandTeleporting && !cursorGrabbing && rightHandState.has("hover-start");
  const rightHandGrabbing = !rightHandTeleporting && !cursorGrabbing && rightHandState.has("grab-start");

  const rightHandHoveringOnInteractable =
    !rightHandTeleporting &&
    !cursorGrabbing &&
    rightHandState.has("hover-start") &&
    rightHandState.get("hover-start").matches(".interactable, .interactable *");
  const rightHandHoveringOnPen =
    !rightHandTeleporting &&
    !cursorGrabbing &&
    rightHandState.has("hover-start") &&
    rightHandState.get("hover-start").matches(".pen, .pen *");
  const rightHandHoveringOnCamera =
    !rightTeleporter.isTeleporting &&
    !cursorGrabbing &&
    rightHandState.has("hover-start") &&
    rightHandState.get("hover-start").matches(".icamera, .icamera *");
  const rightHandHoldingInteractable =
    !cursorGrabbing &&
    rightHandState.has("grab-start") &&
    rightHandState.get("grab-start").matches(".interactable, .interactable *");
  const rightHandHoldingPen =
    !cursorGrabbing && rightHandState.has("grab-start") && rightHandState.get("grab-start").matches(".pen, .pen *");
  const rightHandHoldingCamera =
    !cursorGrabbing &&
    rightHandState.has("grab-start") &&
    rightHandState.get("grab-start").matches(".icamera, .icamera *");

  const rightHandHoveringOnNothing =
    !rightHandTeleporting &&
    !rightHandHovering &&
    !cursorHand.has("hover-start") &&
    !cursorGrabbing &&
    !rightHandState.has("grab-start");

  // Cursor
  cursorController.enabled = !(rightHandTeleporting || rightHandHovering || rightHandGrabbing);
  const cursorHoldingUI =
    cursorController.enabled &&
    !rightHandTeleporting &&
    !rightHandHovering &&
    !rightHandGrabbing &&
    (cursorHand.has("grab-start") && cursorHand.get("grab-start").matches(".ui, .ui *"));
  const cursorHoveringOnUI = cursorHand.has("hover-start") && cursorHand.get("hover-start").matches(".ui, .ui *");
  const cursorCanHover =
    cursorController.enabled &&
    !rightHandTeleporting &&
    !rightHandHovering &&
    !rightHandGrabbing &&
    !cursorHoveringOnUI &&
    cursorHand.has("hover-start");

  const cursorHoveringOnInteractable =
    cursorCanHover && cursorHand.get("hover-start").matches(".interactable, .interactable *");
  const cursorHoveringOnCamera = cursorCanHover && cursorHand.get("hover-start").matches(".icamera, .icamera *");
  const cursorHoveringOnPen = cursorCanHover && cursorHand.get("hover-start").matches(".pen, .pen *");
  const cursorHoveringOnVideo = cursorCanHover && cursorHand.get("hover-start").components["media-video"];
  const cursorHoldingInteractable =
    !rightHandTeleporting &&
    cursorHand.has("grab-start") &&
    cursorHand.get("grab-start").matches(".interactable, .interactable *");
  const cursorHoldingPen =
    !rightHandTeleporting && cursorHand.has("grab-start") && cursorHand.get("grab-start").matches(".pen, .pen *");

  const cursorHoldingCamera =
    !rightTeleporter.isTeleporting &&
    cursorHand.has("grab-start") &&
    cursorHand.get("grab-start").matches(".icamera, .icamera *");

  const cursorHoveringOnNothing =
    !rightHandTeleporting &&
    !rightHandHovering &&
    !rightHandGrabbing &&
    !cursorHand.has("hover-start") &&
    !cursorHand.has("grab-start");

  const userinput = AFRAME.scenes[0].systems.userinput;
  userinput.toggleSet(sets.leftHandHoveringOnInteractable, leftHandHoveringOnInteractable);
  userinput.toggleSet(sets.leftHandHoveringOnPen, leftHandHoveringOnPen);
  userinput.toggleSet(sets.leftHandHoveringOnCamera, leftHandHoveringOnCamera);
  userinput.toggleSet(sets.leftHandHoveringOnNothing, leftHandHoveringOnNothing);
  userinput.toggleSet(sets.leftHandHoldingPen, leftHandHoldingPen);
  userinput.toggleSet(sets.leftHandHoldingInteractable, leftHandHoldingInteractable);
  userinput.toggleSet(sets.leftHandHoldingCamera, leftHandHoldingCamera);
  userinput.toggleSet(sets.leftHandTeleporting, leftHandTeleporting);

  userinput.toggleSet(sets.rightHandHoveringOnInteractable, rightHandHoveringOnInteractable);
  userinput.toggleSet(sets.rightHandHoveringOnPen, rightHandHoveringOnPen);
  userinput.toggleSet(sets.rightHandHoveringOnNothing, rightHandHoveringOnNothing);
  userinput.toggleSet(sets.rightHandHoveringOnCamera, rightHandHoveringOnCamera);
  userinput.toggleSet(sets.rightHandHoldingPen, rightHandHoldingPen);
  userinput.toggleSet(sets.rightHandHoldingInteractable, rightHandHoldingInteractable);
  userinput.toggleSet(sets.rightHandTeleporting, rightHandTeleporting);
  userinput.toggleSet(sets.rightHandHoldingCamera, rightHandHoldingCamera);

  userinput.toggleSet(sets.cursorHoveringOnPen, cursorHoveringOnPen);
  userinput.toggleSet(sets.cursorHoveringOnCamera, cursorHoveringOnCamera);
//  userinput.toggleSet(sets.cursorHoveringOnInteractable, cursorHoveringOnInteractable);
  userinput.toggleSet(sets.cursorHoveringOnUI, cursorHoveringOnUI);
  userinput.toggleSet(sets.cursorHoveringOnVideo, cursorHoveringOnVideo);
//  userinput.toggleSet(sets.cursorHoveringOnNothing, cursorHoveringOnNothing);
  userinput.toggleSet(sets.cursorHoldingPen, cursorHoldingPen);
  userinput.toggleSet(sets.cursorHoldingCamera, cursorHoldingCamera);
  userinput.toggleSet(sets.cursorHoldingInteractable, cursorHoldingInteractable);
  userinput.toggleSet(sets.cursorHoldingUI, cursorHoldingUI);
  userinput.toggleSet(
    sets.inputFocused,
    document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA"
  );
}
