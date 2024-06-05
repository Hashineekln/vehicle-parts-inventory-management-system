import { useContext } from "react";
import { State } from "../context/stateContext";

export default function ClientDetails() {
  const { firstName,lastName,phone } = useContext(State);

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{firstName}</h2>
        <p></p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{lastName}</h2>
        <p></p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{phone}</h2>
        <p></p>
      </section>
    </>
  );
}
