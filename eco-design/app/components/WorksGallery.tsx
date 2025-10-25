export default function WorksGallery() {
  return (
    <section className="p-12 md:p-20 bg-neutral-900/30 backdrop-blur-sm border border-white/10 rounded-2xl my-8 mx-4 md:mx-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white">
            Obras Reales en San Martín de los Andes
          </h3>
          <p className="mt-2 text-gray-200 max-w-2xl mx-auto">
            Calidad, terminaciones impecables y soluciones personalizadas
            instaladas por nuestro equipo.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <img
            src="https://placehold.co/600x400/004D40/FFFFFF?text=Obra+Residencial"
            alt="Obra residencial con aberturas de PVC de EcoDesign"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
          <img
            src="https://placehold.co/600x400/004D40/FFFFFF?text=Detalle+Ventana"
            alt="Detalle de una ventana de PVC instalada"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
          <img
            src="https://placehold.co/600x400/004D40/FFFFFF?text=Puerta+Balc%C3%B3n"
            alt="Puerta balcón de PVC en casa de montaña"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
          <img
            src="https://placehold.co/600x400/004D40/FFFFFF?text=Obra+Comercial"
            alt="Aberturas de PVC en un local comercial"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
          <img
            src="https://placehold.co/600x400/004D40/FFFFFF?text=Ventana+Panor%C3%A1mica"
            alt="Ventana panorámica con vista a la montaña"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
          <img
            src="https://placehold.co/600x400/004D40/FFFFFF?text=Vista+Interior"
            alt="Vista desde el interior a través de una ventana EcoDesign"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
        </div>
      </div>
    </section>
  );
}
