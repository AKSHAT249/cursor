"use client";
import React, { Suspense, lazy } from 'react';
import { ThreeDMarquee } from './components/ui/ThreeDMarquee';
import { GiveawayWizard } from './components/ui/GiveawayWizard';
import Reward from './components/ui/Reward';
import GiftPage from './components/ui/GiftPage';
import PageThree from './components/ui/PageThree';
import FourthPage from './components/ui/FourthPage';
import FifthPage from './components/ui/FifthPage';
import RewardItemDetails from './components/ui/RewardItemDetails';
import Preview from './components/ui/Preview';
import NewReward from './components/ui/NewReward';
import OutputOne from './components/ui/OutputOne';
import OutputTwo from './components/ui/OutputTwo';
import CheckoutPage from './components/ui/CheckoutPage';


const HeavyComponent = lazy(() => import('./components/ui/HeavyComponent'));

function App() {
  // const images = [
  //   "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  //   "https://assets.aceternity.com/animated-modal.png",
  //   "https://assets.aceternity.com/animated-testimonials.webp",
  //   "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  //   "https://assets.aceternity.com/github-globe.png",
  //   "https://assets.aceternity.com/glare-card.png",
  //   "https://assets.aceternity.com/layout-grid.png",
  //   "https://assets.aceternity.com/flip-text.png",
  //   "https://assets.aceternity.com/hero-highlight.png",
  //   "https://assets.aceternity.com/carousel.webp",
  //   "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  //   "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  //   "https://assets.aceternity.com/signup-form.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  //   "https://assets.aceternity.com/spotlight-new.webp",
  //   "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  //   "https://assets.aceternity.com/tabs.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  //   "https://assets.aceternity.com/glowing-effect.webp",
  //   "https://assets.aceternity.com/hover-border-gradient.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  //   "https://assets.aceternity.com/macbook-scroll.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  //   "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  //   "https://assets.aceternity.com/multi-step-loader.png",
  //   "https://assets.aceternity.com/vortex.png",
  //   "https://assets.aceternity.com/wobble-card.png",
  //   "https://assets.aceternity.com/world-map.webp",
  // ];
  return (
    <div
      // className="mx-auto flex justify-between my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800"
      >
      {/* <ThreeDMarquee images={images} /> */}
      {/* <GiveawayWizard /> */}
      {/* <Reward /> */}
      {/* <GiftPage /> */}
      {/* <PageThree /> */}
      {/* <FourthPage /> */}
      {/* <FifthPage /> */}
      {/* <RewardItemDetails />
      <Preview
        retailPrice={300.98}
        title="Reward Item Title"
        description="Short Description"
        imageUrl={null} // or pass an image URL
      /> */}
      {/* <h1>uwygvouw</h1> */}
      {/* <GiveawayWizard /> */}
      {/* <NewReward /> */}
      {/* <OutputOne /> */}
      <OutputTwo />
      <CheckoutPage />
    </div>
  );
}


// const App = () => {
//   return (
//     <div>
//       <h1 className='text-3xl font-bold underline'>Hello World</h1>
//     </div>
//   )
// }

export default App;
