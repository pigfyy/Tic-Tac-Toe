import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";
import Banner from "./Banner";

import store from "../../../store";

export default function Game() {
  const isShown = store.useGameStore((state) => state.banner.isShown);

  return (
    <div className="relative">
      {/* Main Board */}
      <div className="flex min-h-screen flex-col justify-center space-y-4 bg-neutral-900 py-4">
        {/* Header */}
        <div className="flex w-full justify-center">
          <Header />
        </div>
        <div className="mx-auto flex w-11/12 max-w-L flex-col gap-5">
          {/* Game-Board */}
          <Board />
          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Banner */}
      {isShown && <Banner />}
    </div>
  );
}
