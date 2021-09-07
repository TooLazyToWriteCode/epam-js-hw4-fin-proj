import { store } from "@/config/Store";

export type RootState = ReturnType<typeof store.getState>;
