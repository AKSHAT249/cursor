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
import Button from './components/ui/Button';
import SignUpForm from './components/ui/SignUpForm';
import Dashboard from './components/ui/Dashboard';

const HeavyComponent = lazy(() => import('./components/ui/HeavyComponent'));

function App() {
  const writeValue = (message) => {
    console.log(message);
    // You could also set state here or perform other actions with the message
  };
  
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
      {/* <OutputOne /> 
      {/* <CheckoutPage />   */}
      {/* <Button variant="primary" size="md" onClick={() => console.log('Button clicked!')}>
        Click me
      </Button> */}

      {/* <OutputTwo /> */}
        {/* <SignUpForm /> */}
        <Dashboard />
        // In your App 
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
