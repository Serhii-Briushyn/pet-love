import { FriendsItem } from "types/friends/types";

export const getTodaySchedule = (workDays?: FriendsItem[] | null): string => {
  if (!Array.isArray(workDays) || workDays.length === 0) {
    return "Day and night";
  }
  const todayIndex = new Date().getDay();
  const normalizedIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  const day = workDays[normalizedIndex];

  if (!day?.isOpen) return "Closed today";
  return `${day.from} - ${day.to}`;
};
