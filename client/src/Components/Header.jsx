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

       
      </header>
    </>
  );
}
