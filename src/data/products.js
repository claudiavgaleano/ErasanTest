const PLACEHOLDER_IMAGE = 'https://placehold.co/800x600/1e293b/dc2626?text=Erasan+Product'

function createProduct({
  id,
  slug,
  title,
  excerpt,
  content,
  categoryId,
  categorySlug,
  categoryName,
  featured = false,
  features = [],
  specifications = [],
}) {
  return {
    id,
    slug,
    title: { rendered: title },
    excerpt: { rendered: excerpt },
    content: { rendered: content },
    date: '2024-06-01T10:00:00',
    acf: {
      featured,
      features,
      specifications,
    },
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: PLACEHOLDER_IMAGE,
          media_details: {
            sizes: {
              thumbnail: { source_url: PLACEHOLDER_IMAGE },
              medium: { source_url: PLACEHOLDER_IMAGE },
              large: { source_url: PLACEHOLDER_IMAGE },
            },
          },
        },
      ],
      'wp:term': [
        [{ id: categoryId, name: categoryName, slug: categorySlug }],
        [],
      ],
    },
  }
}

export const products = [
  createProduct({
    id: 1,
    slug: 'toroidal-winders',
    title: 'Toroidal Winders',
    excerpt:
      'High-precision toroidal winding machines for inductors, current transformers, and power supplies.',
    content: `
      <p>Our toroidal winding machines deliver exceptional precision for inductors, current transformers, and power supply applications. Programmable tension control ensures consistent wire placement across every production run.</p>
      <p>Designed for wire diameters from 0.05mm to 6mm, these machines support speeds up to 3000 RPM with multi-spindle configurations for high-volume manufacturing.</p>
    `,
    categoryId: 1,
    categorySlug: 'toroidal',
    categoryName: 'Toroidal',
    featured: true,
    features: [
      'Programmable tension control',
      'Wire diameter 0.05–6mm',
      'Up to 3000 RPM speed',
    ],
    specifications: [
      { label: 'Wire Diameter', value: '0.05 – 6 mm' },
      { label: 'Max Speed', value: '3000 RPM' },
      { label: 'Control System', value: 'Touch screen HMI' },
    ],
  }),
  createProduct({
    id: 2,
    slug: 'linear-winders',
    title: 'Linear Winders',
    excerpt:
      'Versatile linear winding systems for motor coils, solenoids, and relay components.',
    content: `
      <p>Linear winding systems provide the flexibility needed for motor coils, solenoids, and relay components. Servo motor drives and automatic wire guides deliver repeatable, high-quality results.</p>
      <p>Ideal for both prototype development and full-scale production, with recipe management for quick changeovers between product types.</p>
    `,
    categoryId: 2,
    categorySlug: 'linear',
    categoryName: 'Linear',
    features: [
      'Servo motor drives',
      'Automatic wire guides',
      'Recipe management',
    ],
    specifications: [
      { label: 'Drive System', value: 'Servo motors' },
      { label: 'Wire Guide', value: 'Automatic' },
      { label: 'Configuration', value: 'Multi-spindle available' },
    ],
  }),
  createProduct({
    id: 3,
    slug: 'transformer-winders',
    title: 'Transformer Winders',
    excerpt:
      'Specialized equipment for power transformers, distribution transformers, and custom windings.',
    content: `
      <p>Transformer winding equipment is engineered for power and distribution transformers as well as specialty custom windings. Advanced layer counting and tensioning systems ensure every coil meets exacting electrical standards.</p>
      <p>Custom tooling is available for unique bobbin geometries and insulation requirements.</p>
    `,
    categoryId: 3,
    categorySlug: 'transformer',
    categoryName: 'Transformer',
    featured: true,
    features: [
      'Layer counting system',
      'Custom tooling available',
      'Precision tension control',
    ],
    specifications: [
      { label: 'Application', value: 'Power & distribution transformers' },
      { label: 'Layer Control', value: 'Automatic counting' },
      { label: 'Tooling', value: 'Custom options available' },
    ],
  }),
  createProduct({
    id: 4,
    slug: 'cnc-layer-winders',
    title: 'CNC Layer Winders',
    excerpt:
      'Computer-controlled layer winding machines for precision multi-layer coils and bobbin winding.',
    content: `
      <p>CNC layer winders offer full axis control for precision multi-layer coils and bobbin winding. Real-time monitoring and PLC automation keep production consistent and traceable.</p>
      <p>Perfect for applications requiring tight tolerances on layer alignment and wire tension throughout the winding process.</p>
    `,
    categoryId: 4,
    categorySlug: 'cnc',
    categoryName: 'CNC',
    features: [
      'CNC axis control',
      'Real-time monitoring',
      'PLC automation',
    ],
    specifications: [
      { label: 'Control', value: 'Full CNC axis' },
      { label: 'Monitoring', value: 'Real-time' },
      { label: 'Automation', value: 'PLC integrated' },
    ],
  }),
  createProduct({
    id: 5,
    slug: 'automatic-systems',
    title: 'Automatic Systems',
    excerpt:
      'Fully automated winding lines with robotic handling and quality inspection systems.',
    content: `
      <p>Fully automated winding lines integrate robotic arm handling with vision inspection for end-to-end production. Reduce manual intervention while maintaining consistent quality across high-volume runs.</p>
      <p>Designed for manufacturers scaling up production without compromising on precision or traceability.</p>
    `,
    categoryId: 5,
    categorySlug: 'automation',
    categoryName: 'Automation',
    featured: true,
    features: [
      'Robotic arm integration',
      'Vision inspection',
      'Fully automated lines',
    ],
    specifications: [
      { label: 'Handling', value: 'Robotic arm' },
      { label: 'Inspection', value: 'Vision system' },
      { label: 'Integration', value: 'Full production line' },
    ],
  }),
  createProduct({
    id: 6,
    slug: 'testing-equipment',
    title: 'Testing Equipment',
    excerpt:
      'Comprehensive testing systems for electrical characteristics, insulation, and quality verification.',
    content: `
      <p>Our testing equipment covers DC resistance testing, hipot testing, and turn ratio analysis to verify every coil before it leaves your production floor.</p>
      <p>Integrate seamlessly with winding lines for automated pass/fail reporting and full quality traceability.</p>
    `,
    categoryId: 6,
    categorySlug: 'testing',
    categoryName: 'Testing',
    features: [
      'DC resistance testing',
      'Hipot testing',
      'Turn ratio analysis',
    ],
    specifications: [
      { label: 'DC Resistance', value: 'Included' },
      { label: 'Hipot Testing', value: 'Included' },
      { label: 'Turn Ratio', value: 'Automated analysis' },
    ],
  }),
]
