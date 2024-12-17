import { MessageType } from "./pages/home";

export const formattedTime = (date: Date) => {
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return time;
};

export const formattedName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// Function to add a new element to an array stored in localStorage
export function addMessageToLocalStorage(key: string, newElement: MessageType) {
  // Step 1: Get the current array from localStorage
  const storedValue = localStorage.getItem(key);
  const currentArray = storedValue ? JSON.parse(storedValue) : []; // Default to an empty array if key doesn't exist

  // Step 2: Add the new element to the array
  currentArray.push(newElement);

  // Step 3: Update the array in localStorage
  localStorage.setItem(key, JSON.stringify(currentArray));
}

export function getMessageFromLocalStorage(key: string) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : [];
}
