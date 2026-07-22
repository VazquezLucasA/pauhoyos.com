export const courses = [
  {
    slug: 'psicoanalisis-freud',
    tag: 'UNT · Teoría',
    icon: 'bi-diagram-3',
    title: 'Psicoanálisis Freud',
    description: 'Una guía de estudio para recorrer conceptos, textos y preguntas fundamentales de Freud.',
    units: ['Primeras formulaciones y descubrimientos.', 'Inconsciente, pulsión y sexualidad.', 'La primera tópica y el sueño.', 'Segunda tópica, síntoma y cultura.'],
  },
  {
    slug: 'evaluacion-y-diagnostico',
    tag: 'UNT · Clínica',
    icon: 'bi-clipboard2-check',
    title: 'Evaluación y Diagnóstico Psicológico',
    description: 'Material de apoyo para el trabajo con niños, adolescentes y adultos.',
    units: ['Encuadre, demanda y entrevista.', 'Técnicas y herramientas de evaluación.', 'Lectura clínica de los resultados.', 'Elaboración y devolución de informes.'],
  },
  {
    slug: 'direcciones-contemporaneas',
    tag: 'UNT · Corrientes',
    icon: 'bi-compass',
    title: 'Direcciones Contemporáneas',
    description: 'Una síntesis de autores, problemas y debates de la psicología contemporánea.',
    units: ['Contextos y giros contemporáneos.', 'Perspectivas clínicas actuales.', 'Sujetos, lazos y malestares.', 'Herramientas para leer bibliografía.'],
  },
];

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}
