import { useEffect, useState } from "react";
import placeholderCountData from "../public/placeholders/count.json";

export function getPlaceholderImage(uuid: string) {
    const accumulatedNumber = uuid
        .replace(/\D/g, "") // Strip non-integers from UUID
        .split("") // Split each integer into a list/array element
        .reduce((acc, digit) => acc + parseInt(digit), 0); // Accumulates (sums) digits in UUID
    return (
        "/placeholders/placeholder-" +
        (accumulatedNumber % (placeholderCountData.count - 1)).toString() +
        ".png"
    );
}
