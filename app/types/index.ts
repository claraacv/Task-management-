import { ColorKey } from "@/lib/colorMap";

export type Task = {
  id: number;
  title: string;
  description: string;
  color: string;
  stateId: number;
};

export type State = {
  id: number;
  name: string;
  color: ColorKey;
};

export type Course = {
  id: number;
  title: string;
  color: ColorKey;
  studentId: number;
};