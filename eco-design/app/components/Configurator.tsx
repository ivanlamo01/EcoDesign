"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Chart as ChartType } from "chart.js";

type Opening = {
  type: string;
  glass: string;
  width: number;
  height: number;
};

type Project = {
  type: "obra-nueva" | "renovacion";
  openings: Opening[];
};

export default function Configurator() {
  const [project, setProject] = useState<Project>({
    type: "obra-nueva",
    openings: [],
  });
  const [showContact, setShowContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ChartType | null>(null);

  const hasOpenings = project.openings.length > 0;

  const typeCounts = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const op of project.openings) acc[op.type] = (acc[op.type] || 0) + 1;
    return acc;
  }, [project.openings]);

  // Initialize/destroy Chart.js dynamically on client only
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    let isMounted = true;
    (async () => {
      const { default: Chart } = await import("chart.js/auto");
      if (!isMounted) return;

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(el.getContext("2d")!, {
        type: "doughnut",
        data: {
          labels: Object.keys(typeCounts),
          datasets: [
            {
              label: "Tipos de Aberturas",
              data: Object.values(typeCounts),
              backgroundColor: [
                "#004D40",
                "#344E41",
                "#588157",
                "#A3B18A",
                "#DAD7CD",
              ],
              borderColor: "#111827",
              borderWidth: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#E0E0E0",
                font: { family: "Inter, sans-serif" },
              },
            },
          },
        },
      });
    })();

    return () => {
      isMounted = false;
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [typeCounts]);

  const selectProjectType = (type: Project["type"]) => {
    setProject((p) => ({ ...p, type }));
  };

  const addOpening = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const type = String(data.get("tipoAbertura") || "");
    const glass = String(data.get("tipoVidrio") || "");
    const width = Number(data.get("ancho") || 0);
    const height = Number(data.get("alto") || 0);

    if (!width || !height || width <= 0 || height <= 0) {
      // Let tailwind focus/outline communicate error; quick shake not implemented
      return;
    }

    setProject((p) => ({
      ...p,
      openings: [...p.openings, { type, glass, width, height }],
    }));

    form.reset();
  };

  const deleteOpening = (index: number) => {
    setProject((p) => ({
      ...p,
      openings: p.openings.filter((_, i) => i !== index),
    }));
  };

  const onContinueToContact = () => {
    setShowContact(true);
    // Smooth scroll to contact block using ref instead of id
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    // Here you would send to your backend
    console.log("Proyecto a enviar:", project);
    console.log("Datos de contacto:", Object.fromEntries(data.entries()));
  };

  const onReset = () => {
    setProject({ type: "obra-nueva", openings: [] });
    setShowContact(false);
    setSubmitted(false);
  };

  return (
    <section
      id="configurador"
      className="py-5 bg-neutral-900/45 backdrop-blur-sm border border-white/10 rounded-2xl my-8 mx-4 md:mx-8 max-h-screen"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">  
          <h3 className="text-3xl font-bold text-white">Iniciá tu Proyecto</h3>
          <p className=" text-gray-200 max-w-2xl mx-auto">
            Descubrí cómo optimizar tu obra con eficiencia y estilo. Usá esta
            herramienta para agilizar el contacto con nuestro equipo técnico y
            recibir una pre-cotización.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-white">
          {/* Paso 1 */}
          {!submitted && (
            <div className="bg-gray-800/60 p-8 rounded-xl shadow-md border border-gray-700">
              <h4 className="text-xl font-semibold mb-2">
                Paso 1: Tipo de Proyecto
              </h4>
              <p className="mb-6 text-gray-300">
                Seleccioná si estás construyendo desde cero o reemplazando
                aberturas existentes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => selectProjectType("obra-nueva")}
                  className={`flex-1 text-left p-6 border-2 rounded-lg ${
                    project.type === "obra-nueva"
                      ? "border-[#004D40] bg-teal-700"
                      : "border-gray-600 bg-gray-700"
                  }`}
                >
                  <h5 className="font-bold text-lg">🏗️ Obra Nueva</h5>
                  <p className="text-sm text-gray-200">
                    Para construcciones nuevas o ampliaciones.
                  </p>
                </button>
                <button
                  onClick={() => selectProjectType("renovacion")}
                  className={`flex-1 text-left p-6 border-2 rounded-lg ${
                    project.type === "renovacion"
                      ? "border-[#004D40] bg-teal-700"
                      : "border-gray-600 bg-gray-700"
                  }`}
                >
                  <h5 className="font-bold text-lg">🏠 Renovación</h5>
                  <p className="text-sm text-gray-200">
                    Para reemplazar aberturas existentes.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Paso 2 */}
          {!submitted && (
            <div
              className={`mt-8 bg-gray-800/60 p-8 rounded-xl shadow-md border border-gray-700 ${
                project.type ? "" : "opacity-50 pointer-events-none"
              }`}
            >
              <h4 className="text-xl font-semibold mb-6">
                Paso 2: Agregá tus Aberturas
              </h4>
              <form
                className="grid md:grid-cols-2 gap-6 items-end"
                onSubmit={(e) => {
                  e.preventDefault();
                  addOpening(e.currentTarget);
                }}
              >
                <div>
                  <label
                    htmlFor="tipoAbertura"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Tipo de Abertura
                  </label>
                  <select
                    id="tipoAbertura"
                    name="tipoAbertura"
                    className="mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm text-white"
                  >
                    <option>Ventana Fija</option>
                    <option>Ventana de Abrir</option>
                    <option>Ventana Oscilobatiente</option>
                    <option>Puerta Balcón Corrediza</option>
                    <option>Puerta de Entrada</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="tipoVidrio"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Tipo de Vidrio
                  </label>
                  <select
                    id="tipoVidrio"
                    name="tipoVidrio"
                    className="mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm text-white"
                  >
                    <option value="DVH">DVH (Doble Vidriado Hermético)</option>
                    <option value="TVH">TVH (Triple Vidriado Hermético)</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="ancho"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Ancho (cm)
                  </label>
                  <input
                    type="number"
                    id="ancho"
                    name="ancho"
                    placeholder="Ej: 150"
                    className="mt-1 block w-full py-2 px-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="alto"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Alto (cm)
                  </label>
                  <input
                    type="number"
                    id="alto"
                    name="alto"
                    placeholder="Ej: 110"
                    className="mt-1 block w-full py-2 px-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm bg-gray-700 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full font-semibold py-3 px-4 rounded-lg bg-[#004D40] text-white hover:bg-[#00382d] transition-colors"
                  >
                    Agregar Abertura al Proyecto
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Paso 3 */}
          {!submitted && (
            <div
              className={`mt-8 bg-gray-800/60 p-8 rounded-xl shadow-md border border-gray-700 ${
                project.type ? "" : "opacity-50 pointer-events-none"
              }`}
            >
              <h4 className="text-xl font-semibold mb-4">
                Paso 3: Resumen del Proyecto
              </h4>
              {!hasOpenings ? (
                <p className="text-gray-300 mb-4">
                  Aún no has agregado ninguna abertura. Utilizá el formulario
                  anterior para empezar.
                </p>
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                            Medidas
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                            Vidrio
                          </th>
                          <th className="px-2 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800/50 divide-y divide-gray-700 text-gray-100">
                        {project.openings.map((op, idx) => (
                          <tr className="text-sm" key={`${op.type}-${idx}`}>
                            <td className="px-4 py-3">{op.type}</td>
                            <td className="px-4 py-3">
                              {op.width}x{op.height} cm
                            </td>
                            <td className="px-4 py-3">{op.glass}</td>
                            <td className="px-2 py-3 text-center">
                              <button
                                onClick={() => deleteOpening(idx)}
                                className="text-red-400 hover:text-red-200"
                                aria-label="Eliminar abertura"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h5 className="font-semibold mb-2 text-white">
                      Composición del Proyecto
                    </h5>
                    <div className="relative w-full max-w-[400px] mx-auto h-[300px] md:h-[350px] max-h-[400px]">
                      <canvas ref={canvasRef} />
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-8">
                <button
                  onClick={onContinueToContact}
                  className="w-full font-semibold py-3 px-4 rounded-lg bg-[#004D40] text-white hover:bg-[#00382d] transition-colors"
                >
                  Continuar al último paso
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: Contacto */}
          {!submitted && showContact && (
            <div
              ref={contactRef}
              className="mt-8 bg-gray-800/60 p-8 rounded-xl shadow-md border border-gray-700 text-white"
            >
              <h4 className="text-xl font-semibold mb-6">
                Paso 4: Datos de Contacto
              </h4>
              <form id="contact-form" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Nombre y Apellido
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="mt-1 block w-full py-2 px-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="comments"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Comentarios Adicionales
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={4}
                      className="mt-1 block w-full py-2 px-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm bg-gray-700 text-white"
                      placeholder="Si tenés alguna especificación, podés detallarla acá."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full font-bold py-3 px-4 rounded-lg text-lg bg-[#004D40] text-white hover:bg-[#00382d] transition-colors"
                    >
                      Enviar Solicitud de Cotización
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Success message */}
          {submitted && (
            <div className="mt-8 bg-green-900/50 p-8 rounded-xl shadow-md border border-green-700 text-center text-white">
              <h4 className="text-2xl font-bold text-green-200 mb-4">
                ¡Gracias por tu solicitud!
              </h4>
              <p className="text-green-100">
                Hemos recibido los detalles de tu proyecto. Un miembro de
                nuestro equipo técnico se pondrá en contacto con vos a la
                brevedad para continuar con la cotización formal.
              </p>
              <p className="mt-6">
                <button
                  onClick={onReset}
                  className="font-semibold py-2 px-4 rounded-lg bg-gray-700 text-green-200 border border-green-200 hover:bg-green-200 hover:text-gray-900"
                >
                  Iniciar un nuevo proyecto
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
