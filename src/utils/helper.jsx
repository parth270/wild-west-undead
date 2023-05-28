import * as THREE from "three";

export const ExactNegate = (rota, desired) => {
  let curr = 0;
  if (rota > desired) {
    curr = rota - desired;
    while (curr >= 360) {
      curr -= 360;
    }
    if (curr < 180) {
      curr = -curr;
    } else {
      curr = 360 - curr;
    }
  } else if (rota < desired) {
    curr = desired - rota;
    while (curr > 360) {
      curr -= 360;
    }
    if (curr < 180) {
    } else {
      curr = -(360 - curr);
    }
  }
  return curr * THREE.MathUtils.DEG2RAD;
};

// export const ExactNegate = (rota,desired) => {
//   console.log(rota, "camera-rotation-deg");
//   let curr = 0;
//   if (rota > 270) {
//     curr = rota - 270;
//     while (curr >= 360) {
//       curr -= 360;
//     }
//     if (curr < 180) {
//       curr = -curr;
//     } else {
//       curr = 360 - curr;
//     }
//     console.log(curr, "rota>270");
//   } else if (rota < 270) {
//     curr = 270 - rota;
//     while (curr > 360) {
//       curr -= 360;
//     }
//     if (curr < 180) {
//     } else {
//       curr = -(360 - curr);
//     }
//     console.log(curr, "rota<=270");
//   }
//   return curr * THREE.MathUtils.DEG2RAD;
// };