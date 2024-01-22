import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const message = error.data as MessageResponse;
    console.log(error)
    toast.error(message.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();
  currentDate.date(1);
  const lastSixMonths: string[] = [];
  const lastTwelveMonths: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDdate = currentDate.clone().subtract(i, "months");
    const monthName = monthDdate.format("MMMM");
    lastSixMonths.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDdate = currentDate.clone().subtract(i, "months");
    const monthName = monthDdate.format("MMM");
    lastTwelveMonths.unshift(monthName);
  }

  return { lastSixMonths, lastTwelveMonths };
};
