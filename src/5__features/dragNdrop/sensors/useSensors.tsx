import { MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useSensor } from "@dnd-kit/core";

export function useSensors(){
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  return [touchSensor, mouseSensor];
}
