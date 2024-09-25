/* eslint-disable no-unused-vars */
import Lenis from "@studio-freight/lenis";
import Schemes from "../Schemes/Schemes";

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const Home = () => {
  return (
    <div className="">
      <div className="main-data">
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <Schemes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
