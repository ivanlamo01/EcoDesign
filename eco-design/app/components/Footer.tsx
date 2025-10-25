export default function Footer() {
  return (
    <footer className="bg-neutral-900/55 backdrop-blur-sm border border-white/10 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold font-heading text-white">
              EcoDesign PVC
            </h4>
            <p className="mt-2 text-gray-300">
              Aberturas de alta eficiencia.
              <br />
              San Martín de los Andes, Patagonia.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold font-heading text-white">
              Navegación
            </h4>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="#diferenciales"
                  className="text-gray-300 hover:text-white"
                >
                  Diferenciales
                </a>
              </li>
              <li>
                <a
                  href="#configurador"
                  className="text-gray-300 hover:text-white"
                >
                  Proyecto
                </a>
              </li>
              <li>
                <a href="#obras" className="text-gray-300 hover:text-white">
                  Obras
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold font-heading text-white">
              Contacto
            </h4>
            <p className="mt-2 text-gray-300">
              📩 Escribinos hoy y llevá tu proyecto al siguiente nivel con
              aberturas premium hechas a tu medida.
            </p>
            <a
              href="mailto:ventas@ecodesignpvc.com"
              className="mt-4 inline-block bg-white text-patagonia-accent font-bold py-2 px-4 rounded-lg hover:bg-gray-200"
            >
              ventas@ecodesignpvc.com
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; 2025 EcoDesign PVC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
