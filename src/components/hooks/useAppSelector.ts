import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "@/states/Root/Root.types";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
