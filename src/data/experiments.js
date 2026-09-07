const GITHUB = "https://github.com/NataliaPerez08";

const experiments = [
  {
    slug: "genomica-computacional",
    name: "Computational Genomics",
    type: "experiment",
    category: ["science", "genomics"],
    status: "ARCHIVED",
    summary:
      "Main project for the computational genomics course — sequence analysis and genomic data processing.",
    stack: ["Python", "Biopython", "NumPy", "Pandas"],
    repository: `${GITHUB}/Proyecto-Genomica-Computacional`,
  },
  {
    slug: "spectrum-classifier",
    name: "Electromagnetic Spectrum Classifier",
    type: "experiment",
    category: ["science", "data", "ml"],
    status: "ACTIVE",
    summary:
      "Classifier for hyperspectral images of Mexico cultural heritage using supervised learning.",
    stack: ["Python", "NumPy", "Scikit-learn", "Pandas", "Matplotlib", "PyQt"],
    repository: `${GITHUB}/servicio-social`,
  },
  {
    slug: "redes-neuronales",
    name: "Neural Networks",
    type: "experiment",
    category: ["science", "ml"],
    status: "ARCHIVED",
    summary: "Neural network implementations and experiments from the machine learning course.",
    stack: ["Python", "TensorFlow", "Keras"],
    repository: `${GITHUB}/Proyecto-Redes-Neuronales`,
  },
  {
    slug: "astro-001-gaia-hr",
    name: "ASTRO-001 — Gaia HR Diagram Explorer",
    type: "experiment",
    category: ["astrophysics"],
    status: "PLANNED",
    summary: "Explore stellar populations using Gaia catalogue data.",
    stack: ["Python", "Astropy", "Pandas", "Plotly", "WebGL"],
    repository: null,
  },
  {
    slug: "astro-002-exoplanet-transit",
    name: "ASTRO-002 — Exoplanet Transit Detector",
    type: "experiment",
    category: ["astrophysics"],
    status: "PLANNED",
    summary: "Detect transit candidates from TESS or Kepler light curves.",
    stack: ["Python", "Lightkurve", "NumPy", "SciPy"],
    repository: null,
  },
  {
    slug: "sim-001-nbody",
    name: "SIM-001 — N-Body Gravity Simulator",
    type: "experiment",
    category: ["simulations"],
    status: "PLANNED",
    summary: "Compare numerical integration methods and visualize gravitational systems.",
    stack: ["Python", "Rust", "WebGL"],
    repository: null,
  },
  {
    slug: "gpu-001-playground",
    name: "GPU-001 — GPU Playground",
    type: "experiment",
    category: ["gpu"],
    status: "PLANNED",
    summary:
      "GPU benchmarks and computational experiments — PyTorch, CUDA, matrix multiplication, CPU vs GPU benchmarks, numerical workloads.",
    stack: ["Python", "PyTorch", "CUDA"],
    repository: null,
  },
];

export default experiments;