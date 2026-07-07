const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/1e293b/dc2626?text=Erasan+Blog'
const AUTHOR = {
  name: 'Erasan Engineering',
  avatar: null,
  description: 'Precision winding experts',
}

function createPost({
  id,
  slug,
  title,
  excerpt,
  content,
  date,
  categoryId,
  categoryName,
  categorySlug,
  tags = [],
}) {
  return {
    id,
    slug,
    title: { rendered: title },
    excerpt: { rendered: excerpt },
    content: { rendered: content },
    date,
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: PLACEHOLDER_IMAGE,
          media_details: {
            sizes: {
              thumbnail: { source_url: PLACEHOLDER_IMAGE },
              medium: { source_url: PLACEHOLDER_IMAGE },
              large: { source_url: PLACEHOLDER_IMAGE },
              full: { source_url: PLACEHOLDER_IMAGE },
            },
          },
        },
      ],
      author: [
        {
          name: AUTHOR.name,
          avatar_urls: { 96: AUTHOR.avatar },
          description: AUTHOR.description,
        },
      ],
      'wp:term': [
        [{ id: categoryId, name: categoryName, slug: categorySlug }],
        tags.map((tag, index) => ({
          id: 100 + index,
          name: tag,
          slug: tag.toLowerCase().replace(/\s+/g, '-'),
        })),
      ],
    },
  }
}

export const blogPosts = [
  createPost({
    id: 1,
    slug: 'transformer-winding-best-practices',
    title: 'Transformer Winding Best Practices',
    excerpt:
      'Key techniques for achieving consistent quality in power transformer coil production.',
    content: `
      <p>Achieving consistent quality in transformer winding requires attention to tension control, layer alignment, and insulation placement. Modern CNC-controlled winders eliminate much of the variability that manual processes introduce.</p>
      <h2>Tension Control</h2>
      <p>Programmable tension systems adapt in real time to wire diameter and bobbin geometry, preventing wire stretch and ensuring uniform turns across every layer.</p>
      <h2>Layer Counting</h2>
      <p>Automatic layer counting systems verify that each coil meets design specifications before it moves to the next production stage, reducing rework and scrap rates.</p>
      <blockquote>Consistent tension and layer control are the foundation of reliable transformer performance.</blockquote>
    `,
    date: '2024-11-15T09:00:00',
    categoryId: 3,
    categoryName: 'Technical',
    categorySlug: 'technical',
    tags: ['Transformers', 'Quality'],
  }),
  createPost({
    id: 2,
    slug: 'servo-motor-advantages-winding',
    title: 'Why Servo Motors Transform Coil Winding',
    excerpt:
      'How servo-driven winding machines deliver superior precision and repeatability.',
    content: `
      <p>Servo motor drives have become the standard for precision winding applications. Unlike traditional stepper or mechanical drives, servos provide closed-loop feedback that maintains exact wire placement even under varying load conditions.</p>
      <h2>Precision at Speed</h2>
      <p>Servo systems enable high-speed winding without sacrificing accuracy, making them ideal for motor coil and solenoid production where throughput and quality must coexist.</p>
      <h2>Recipe Management</h2>
      <p>Stored recipes allow operators to switch between products in minutes, with all tension, speed, and layer parameters recalled automatically.</p>
    `,
    date: '2024-10-28T14:30:00',
    categoryId: 2,
    categoryName: 'Technology',
    categorySlug: 'technology',
    tags: ['Servo Motors', 'Automation'],
  }),
  createPost({
    id: 3,
    slug: 'automation-trends-coil-winding',
    title: 'Automation Trends in Coil Winding',
    excerpt:
      'The latest developments in automated winding lines and robotic integration.',
    content: `
      <p>The coil winding industry is rapidly adopting full-line automation. Manufacturers are integrating winding machines with robotic handling, vision inspection, and automated testing to create closed-loop production systems.</p>
      <h2>Robotic Integration</h2>
      <p>Robotic arms handle bobbin loading, wire threading, and finished coil transfer, reducing manual labor and improving cycle times.</p>
      <h2>Vision Inspection</h2>
      <p>Inline vision systems detect wire misplacement, insulation defects, and terminal issues before coils proceed to assembly.</p>
    `,
    date: '2024-09-10T11:00:00',
    categoryId: 1,
    categoryName: 'Industry News',
    categorySlug: 'industry-news',
    tags: ['Automation', 'Robotics'],
  }),
  createPost({
    id: 4,
    slug: 'quality-control-winding-process',
    title: 'Quality Control in the Winding Process',
    excerpt:
      'Testing methods and standards for verifying coil electrical characteristics.',
    content: `
      <p>Quality verification is critical at every stage of coil production. From DC resistance measurements to hipot testing and turn ratio analysis, comprehensive testing ensures every component meets specification.</p>
      <h2>DC Resistance Testing</h2>
      <p>Verifies that wire gauge and turn count are within tolerance, catching winding errors before they reach assembly.</p>
      <h2>Hipot Testing</h2>
      <p>Insulation integrity testing confirms that coils can withstand operating voltages without breakdown, essential for transformer and motor applications.</p>
    `,
    date: '2024-08-22T08:00:00',
    categoryId: 3,
    categoryName: 'Technical',
    categorySlug: 'technical',
    tags: ['Quality Control', 'Testing'],
  }),
  createPost({
    id: 5,
    slug: 'choosing-right-winding-machine',
    title: 'How to Choose the Right Winding Machine',
    excerpt:
      'A practical guide to selecting winding equipment for your production requirements.',
    content: `
      <p>Selecting the right winding machine depends on your product type, production volume, wire specifications, and quality requirements. This guide walks through the key decision factors.</p>
      <h2>Product Type</h2>
      <p>Toroidal, linear, and transformer windings each require specialized machine geometries and tension systems. Match the machine type to your primary product category.</p>
      <h2>Production Volume</h2>
      <p>Low-volume or prototype work may suit manual or semi-automatic machines, while high-volume production benefits from fully automated lines with recipe management and inline testing.</p>
      <h2>Wire Specifications</h2>
      <p>Consider wire diameter range, insulation type, and maximum operating speed when evaluating machine capabilities.</p>
    `,
    date: '2024-07-05T16:00:00',
    categoryId: 4,
    categoryName: 'Guides',
    categorySlug: 'guides',
    tags: ['Buying Guide', 'Equipment'],
  }),
]
