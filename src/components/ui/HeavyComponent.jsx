import React, {useState, useEffect} from 'react'

const HeavyComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);
  return (
    <div>
      {/* <h1>Heavy Component</h1> */}
      {isLoading ? <div>Loading...</div> : <div>Heavy Component</div>}
    </div>
  )
}

export default HeavyComponent
