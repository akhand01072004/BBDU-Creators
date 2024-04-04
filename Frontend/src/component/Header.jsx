
import "./Design.css"
import {ReactTyped} from "react-typed";

const Header = () => {
  return (
    <>
      <header className="container-md h-screen  ok">
        <div className="container mx-auto py-4 flex justify-center ">
          <div className=" flex justify-center t1">
            <div className="bg-transparent b2  ">
              <div className="b3 mr-[20%]">
                <h1 className="text-6xl    fs">  BABU BANARASI  </h1>
                <h1 className='text-6xl  fs'> DAS UNIVERSITY </h1>
                <h5 className="mt-12"><ReactTyped className="text-3xl " strings={["Innovate. Create. Showcase"]} typeSpeed={100} loop /></h5>
                <button className=" mt-12 text-white font-normal cursur-pointer bg-green-500 p-1 rounded-md px-2 hover:bg-green-700">Upload Project</button>
              </div>

            </div>
            <div className="  bg-transparent image">

            </div>

          </div>


        </div>
      </header>
    </>
  )
}

export default Header