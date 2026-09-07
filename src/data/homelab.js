const homelab = {
  compute: [
    { name: "Proxmox", role: "Hypervisor", status: "ACTIVE", detail: "Hosts VMs and GPU workloads." },
    { name: "VMs", role: "Virtual machines", status: "ACTIVE", detail: "Isolated environments per workload." },
    { name: "GPU node", role: "GPU workloads", status: "BUILDING", detail: "Dedicated node for GPU computation and experiments." },
  ],
  networking: [
    { name: "Routing", role: "Network core", status: "ACTIVE", detail: "Routing between LAN segments and services." },
    { name: "Firewall", role: "Edge security", status: "ACTIVE", detail: "Central firewall and traffic filtering." },
    { name: "WireGuard", role: "VPN", status: "ACTIVE", detail: "Remote access mesh across devices." },
  ],
  containers: [
    { name: "Docker", role: "Container runtime", status: "ACTIVE", detail: "Self-hosted services and app workloads." },
    { name: "Kubernetes", role: "Orchestration", status: "EXPLORING", detail: "Cluster experiments and workload orchestration." },
  ],
  storage: [
    { name: "Storage pool", role: "Persistence", status: "ACTIVE", detail: "Backups, ISO library and data volumes." },
  ],
  observability: [
    { name: "Monitoring", role: "Telemetry", status: "BUILDING", detail: "Metrics, logs and dashboards for services." },
  ],
  ai: [
    { name: "AI infrastructure", role: "LLM / inference", status: "BUILDING", detail: "Local models via Ollama plus GPU inference." },
  ],
  iac: [
    { name: "OpenTofu", role: "Provisioning", status: "BUILDING", detail: "Infrastructure-as-code for Proxmox resources." },
    { name: "cloud-init", role: "VM bootstrap", status: "ACTIVE", detail: "First-boot configuration for VMs." },
    { name: "Ansible", role: "Configuration", status: "PLANNED", detail: "Declarative service configuration." },
  ],
};

export default homelab;