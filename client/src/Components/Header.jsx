export default function Header() {
  return (
    <>
      <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
      <div class="container">
      <div className="text-center">
  <div id="company" className="space-y-3">
    <img src="src/assets/Logo.jpg" alt="LHI Company" className="w-full md:w-64 mx-auto" />
  </div>
  <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">
    LHI Logistic
  </h1>
  <h6 className="text-center">Address: No 164/B, Kottawa - Malabe Rd, Pannipitiya</h6>
  <h6 className="text-center">Tel: +94 7652 996</h6>
  <h6 className="text-center">Fax: 7684935493</h6>
</div>

</div>

        {/* <div>
          <ul className="flex items-center justify-between flex-wrap">
            <li>
              <button
                onClick={handlePrint}
                className="bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
              >
                Print
              </button>
            </li>
            <li className="mx-2">
              <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Download
              </button>
            </li>
            <li>
              <button className="bg-green-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300">
                Send
              </button>
            </li>
          </ul>
        </div> */}
      </header>
    </>
  );
}
