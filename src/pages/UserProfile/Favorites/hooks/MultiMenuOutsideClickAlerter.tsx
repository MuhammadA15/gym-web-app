import React, { useEffect } from "react";

export function useMultiMenuOutsideClickAlerter(
  ref: React.RefObject<HTMLInputElement>,
  openStateList: Map<number, boolean>,
  componentId: number,
  setOpenState: React.Dispatch<React.SetStateAction<Map<number, boolean>>>
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenState(new Map(openStateList?.set(componentId, false)));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
