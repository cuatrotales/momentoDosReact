export default function Banner() {
  return (
    <div
      id="myCarousel"
      class="carousel slide my-5 py-5"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images.wallpaperscraft.com/image/single/soltador_cruiser_hamann_bike_custom_95865_1366x768.jpg"
            alt="Imagen Portada"
            className="w-100"
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://images.wallpaperscraft.com/image/single/motocross_kiss_love_moto_sport_sunset_120297_1366x768.jpg"
            alt="Imagen Portada"
            className="w-100"
          />

          <div class="container">
            <div class="carousel-caption text-dark rounded shadow bg-warning">
              <h1>Puedes añadir un articulo</h1>
              <p>
                A conticacion encontraras un boton
              </p>
              <p>
                <a class="btn btn-lg btn-dark text-light" href="#articulos">
                  Añadir
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="https://images.wallpaperscraft.com/image/single/ktm_1290_super_duke_r_motorcycle_sports_123405_1366x768.jpg"
            alt="Imagen Portada"
            className="w-100"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}
