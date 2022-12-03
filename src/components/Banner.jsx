export default function Banner() {
  return (
    <div className="container">
      <div class="px-4 pt-5 my-5 text-center border-bottom">
        <h1 class="display-4 fw-bold">Productos de aseo</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            En este apartado encontraras el formulario pertinente para registrar
            los productos de aseo personal y de uso diario. Recuerda que el
            limite de dinero son 100.000 por producto y el minimo seran 15.000
          </p>
        </div>
        <div class="overflow-hidden">
          <div class="container px-5">
            <img
              src="https://www.cosmeticlatam.com/wp-content/uploads/2021/09/aseo-personal.jpg"
              class="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div class="b-example-divider"></div>
    </div>
  );
}
