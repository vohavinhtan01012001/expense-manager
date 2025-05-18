import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FieldValues } from "react-hook-form";
import React from "react";
import FormController, { type FormControllerProps } from '@/components/shared/FormController';
import { useAuthStore } from "@/store/useAuthStore";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function createFormController<T extends FieldValues>() {
  const TypedFormController: React.FC<FormControllerProps<T>> = (props) => {
    return React.createElement(FormController as React.FC<FormControllerProps<T>>, props);
  };
  return TypedFormController;
}


export const getUserFromToken = () => {
  const token = useAuthStore.getState().token;
  if (!token) return null;
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

