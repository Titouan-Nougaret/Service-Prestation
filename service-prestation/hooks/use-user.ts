"use client"

import { useAppSelector } from "@/store/hooks";

export const useUser = () => {
  return useAppSelector((state) => state.user.user);
};
