import type { Metadata } from "next";
import Arcade from "@/components/arcade/Arcade";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "AML Arcade",
  description:
    "Daily AML brain games — typology sorting, word puzzles, timed recognition, regulatory dates and alert dispositions. Same puzzles for everyone, streaks tracked locally.",
};

export default function ArcadePage() {
  return (
    <>
      <ViewTracker type="search" id="arcade" />
      <Arcade />
    </>
  );
}
