export default function Navbar() {
    return (
        <div className="container mb-5">
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-5">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav mx-auto mb-2 mb-md-0">
                            <li class="nav-item">
                                <a class="nav-link active" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#articulos">Articulos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}