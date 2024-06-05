import { useContext } from "react";
import { State } from "../context/stateContext";

export default function Footer() {

    useContext(State);

  return (
    <>
      <footer className="footer border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center">
          <li>
            <span className="font-bold">  Good Returns wii be accepted within 7 days of purchase. <br />
            Electrical items are not returnable.</span> 
          </li>

        </ul>
      </footer>

      <p className="text-center px-5 mt-8 text-xs ">
       <br />
        Thank You Come Again !
        
      </p>
    </>
  );
}
