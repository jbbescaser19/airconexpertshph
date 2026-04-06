/* ============================================================
   AIRCON EXPERTS PH – products.js (PRODUCT CATALOG & MODAL)
   ============================================================ */

// Brand-specific warranty information
const BRAND_WARRANTIES = {
  daikin: {
    compressor: "5 Years",
    pcb_fan_motor: "3 Years",
    parts: "1 Year",
  },
  midea: {
    compressor: "10 Years",
    pcb_fan_motor: "3 Year",
    parts: "1 Year",
  },
  carrier: {
    compressor: "10 Years",
    pcb_fan_motor: "3 Years",
    parts: "1 Year",
  },
  hisense: {
    compressor: "10 Years",
    pcb_fan_motor: "3 Years",
    parts: "2 Years",
  },
  matrix: {
    compressor: "10 Years",
    pcb_fan_motor: "3 Year",
    parts: "1 Year",
  },
  // Default fallback
  default: {
    compressor: "5 Years",
    pcb_fan_motor: "1 Year",
    parts: "1 Year",
  },
};

/* ── PRODUCT DATA ── */
const products = [
  /* DAIKIN */
  {
    id: "daikin-amihan",
    brand: "Daikin",
    name: "Amihan Series",
    icon: "🌬",
    section: "daikin",
    badges: [
      '<span class="badge badge--bestseller">🔥 Popular</span>',
      '<span class="badge badge--energy">🌿 Energy Saving</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "R32 Eco-Friendly Refrigerant",
      "Anti-Bacterial Filter",
      "60-Day Installation Warranty",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "0.8HP",
        spec: "FTKE20AVA / RKE20AVA · 0.8HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱30,800",
        price: "₱24,136",
        discount: "-22% OFF",
        image: "images/daikin/amihan.png",
      },
      {
        label: "1.0HP",
        spec: "FTKE25AVA / RKE25AVA · 1.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱33,600",
        price: "₱26,012",
        discount: "-23% OFF",
        image: "images/daikin/amihan.png",
      },
      {
        label: "1.5HP",
        spec: "FTKE35AVA / RKE35AVA · 1.5HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱35,700",
        price: "₱27,919",
        discount: "-22% OFF",
        image: "images/daikin/amihan.png",
      },
      {
        label: "2.0HP",
        spec: "FTKE50AVA / RKE50AVA · 2.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱51,100",
        price: "₱38,237",
        discount: "-25% OFF",
        image: "images/daikin/amihan.png",
      },
    ],
  },
  {
    id: "daikin-dsmart",
    brand: "Daikin",
    name: "D-Smart Series",
    icon: "❄️",
    section: "daikin",
    badges: [
      '<span class="badge badge--inverter">⚡ Inverter</span>',
      '<span class="badge badge--popular">🔥 Popular</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "Self-Cleaning Indoor Unit",
      "Wi-Fi Smart App Control",
      "Inverter Tech — 60% Energy Savings",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "0.8HP",
        spec: "FTKQ20CVAF / RKQ20CVA · 0.8HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱33,500",
        price: "₱27,285",
        discount: "-18% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "1.0HP",
        spec: "FTKQ25CVAF / RKQ25CVA · 1.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱37,800",
        price: "₱30,338",
        discount: "-20% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "1.5HP",
        spec: "FTKQ35CVAF / RKQ35CVA · 1.5HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱42,400",
        price: "₱34,104",
        discount: "-20% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "2.0HP",
        spec: "FTKQ50CVAF / RKQ50CVA · 2.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱55,400",
        price: "₱43,334",
        discount: "-22% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "2.5HP",
        spec: "FTKQ60CVAF / RKQ60CVA · 2.5HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱64,200",
        price: "₱50,082",
        discount: "-22% OFF",
        image: "images/daikin/dSmart.png",
      },
      {
        label: "3.0HP",
        spec: "FTKQ71CVAF / RKQ71CVA · 3.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱89,500",
        price: "₱70,045",
        discount: "-22% OFF",
        image: "images/daikin/dSmart.png",
      },
    ],
  },
  {
    id: "daikin-dsmart-queen",
    brand: "Daikin",
    name: "D-Smart Queen",
    icon: "👑",
    section: "daikin",
    badges: [
      '<span class="badge badge--inverter">⚡ Inverter</span>',
      '<span class="badge badge--new">✨ Premium</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "Coanda Airflow Technology",
      "Titanium Apatite Air Purifier",
      "PM 2.5 Filter Built-In",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "FTKC25BVAF / RKC25BVA · 1.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱46,200",
        price: "₱37,302",
        discount: "-19% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
      {
        label: "1.5HP",
        spec: "FTKC35BVAF / RKC35BVA · 1.5HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱51,900",
        price: "₱41,849",
        discount: "-19% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
      {
        label: "2.0HP",
        spec: "FTKC50BVAF / RKC50BVA · 2.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱66,500",
        price: "₱52,250",
        discount: "-21% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
      {
        label: "2.5HP",
        spec: "FTKC60BVAF / RKC60BVA · 2.5HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱77,300",
        price: "₱60,383",
        discount: "-22% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
      {
        label: "3.0HP",
        spec: "FTKC71BVAF / RKC71BVA · 3.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱107,700",
        price: "₱82,967",
        discount: "-23% OFF",
        image: "images/daikin/dSmartQueen.png",
      },
    ],
  },
  {
    id: "daikin-dsmart-king",
    brand: "Daikin",
    name: "D-Smart King",
    icon: "🏆",
    section: "daikin",
    badges: [
      '<span class="badge badge--inverter">⚡ Inverter</span>',
      '<span class="badge badge--limited">💎 Limited</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "Multi-Fan Speed Control",
      "Inverter Compressor Tech",
      "Energy Star 5-Star Rated",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "FTKZ25WVM / RKZ25WVM · 1.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱59,600",
        price: "₱46,816",
        discount: "-21% OFF",
        image: "images/daikin/dsmartKing.png",
      },
      {
        label: "1.5HP",
        spec: "FTKZ35WVM / RKZ35WVM · 1.5HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱65,900",
        price: "₱51,789",
        discount: "-21% OFF",
        image: "images/daikin/dsmartKing.png",
      },
      {
        label: "2.0HP",
        spec: "FTKZ50WVM / RKZ50WVM · 2.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱84,300",
        price: "₱64,853",
        discount: "-23% OFF",
        image: "images/daikin/dsmartKing.png",
      },
      {
        label: "2.5HP",
        spec: "FTKZ60WVM / RKZ60WVM · 2.5HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱98,100",
        price: "₱75,151",
        discount: "-23% OFF",
        image: "images/daikin/dsmartKing.png",
      },
      {
        label: "3.0HP",
        spec: "FTKZ71WVM / RKZ71WVM · 3.0HP Inverter · Indoor/Outdoor · 220-240V",
        srp: "₱132,100",
        price: "₱100,291",
        discount: "-24% OFF",
        image: "images/daikin/dsmartKing.png",
      },
    ],
  },

  /* MIDEA */
  {
    id: "midea-msbc",
    brand: "Midea",
    name: "Midea Split Type",
    icon: "❄",
    section: "midea",
    badges: [
      '<span class="badge badge--bestseller">⭐ Best Seller</span>',
      '<span class="badge badge--energy">🔥 Top Choice</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "Turbo Cool Mode",
      "Anti-Bacterial Filter",
      "Sleep & ECO Modes",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "MSCE-10CRFN8 · 1.0HP Inverter · R32 AC · Indoor/Outdoor · 10–15 sqm",
        srp: "₱30,495",
        price: "₱21,499",
        discount: "-30% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "1.5HP",
        spec: "MSCE-13CRFN8 · 1.5HP Inverter · R32 AC · Indoor/Outdoor · 15–20 sqm",
        srp: "₱31,995",
        price: "₱22,999",
        discount: "-28% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "2.0HP",
        spec: "MSCE-19CRFN8 · 2.0HP Inverter · R32 AC · Indoor/Outdoor · 20–30 sqm",
        srp: "₱40,995",
        price: "₱29,999",
        discount: "-27% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "2.5HP",
        spec: "MSCE-22CRFN8 · 2.5HP Inverter · R32 AC · Indoor/Outdoor · 28–40 sqm",
        srp: "₱49,395",
        price: "₱34,499",
        discount: "-30% OFF",
        image: "images/midea/midea.png",
      },
      {
        label: "3.0HP",
        spec: "MSCE-25CRFN8 · 3.0HP Inverter · R32 AC · Indoor/Outdoor · 35–50 sqm",
        srp: "₱74,895",
        price: "₱50,499",
        discount: "-33% OFF",
        image: "images/midea/midea.png",
      },
    ],
  },

  /* CARRIER */
  {
    id: "carrier-nexus",
    brand: "Carrier",
    name: "Nexus",
    icon: "🌬",
    section: "carrier",
    badges: ['<span class="badge badge--popular">🔥 Popular</span>'],
    features: [
      "Free Installation up to 10ft",
      "4-Way Auto Swing",
      "Ultra-Quiet 32dB Operation",
      "Auto Restart & Self-Diagnosis",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "42CEA009308 · 1.0HP Inverter · Nexus Series · Indoor/Outdoor",
        srp: "₱36,500",
        price: "₱25,999",
        discount: "-29% OFF",
        image: "images/carrier/nexus.png",
      },
      {
        label: "1.5HP",
        spec: "42CEA012308 · 1.5HP Inverter · Nexus Series · Indoor/Outdoor",
        srp: "₱41,000",
        price: "₱28,999",
        discount: "-29% OFF",
        image: "images/carrier/nexus.png",
      },
      {
        label: "2.0HP",
        spec: "42CEA018308 · 2.0HP Inverter · Nexus Series · Indoor/Outdoor",
        srp: "₱52,200",
        price: "₱36,499",
        discount: "-30% OFF",
        image: "images/carrier/nexus.png",
      },
      {
        label: "2.5HP",
        spec: "42CEA024308 · 2.5HP Inverter · Nexus Series · Indoor/Outdoor",
        srp: "₱60,500",
        price: "₱40,999",
        discount: "-32% OFF",
        image: "images/carrier/nexus.png",
      },
    ],
  },
  {
    id: "carrier-optima",
    brand: "Carrier",
    name: "Optima",
    icon: "❄",
    section: "carrier",
    badges: ['<span class="badge badge--energy">🌿 Eco</span>'],
    features: [
      "Free Installation up to 10ft",
      "Smart Sleep Comfort Mode",
      "Auto Restart Technology",
      "Golden Fin Coil Protection",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "42CAC009308 · 1.0HP Inverter · Optima Series · Indoor/Outdoor",
        srp: "₱36,500",
        price: "₱27,999",
        discount: "-23% OFF",
        image: "images/carrier/optima.png",
      },
      {
        label: "1.5HP",
        spec: "42CAC012308 · 1.5HP Inverter · Optima Series · Indoor/Outdoor",
        srp: "₱41,000",
        price: "₱30,499",
        discount: "-26% OFF",
        image: "images/carrier/optima.png",
      },
      {
        label: "2.0HP",
        spec: "42CAC018308 · 2.0HP Inverter · Optima Series · Indoor/Outdoor",
        srp: "₱52,200",
        price: "₱38,999",
        discount: "-25% OFF",
        image: "images/carrier/optima.png",
      },
      {
        label: "2.5HP",
        spec: "42CAC024308 · 2.5HP Inverter · Optima Series · Indoor/Outdoor",
        srp: "₱60,500",
        price: "₱42,499",
        discount: "-30% OFF",
        image: "images/carrier/optima.png",
      },
      {
        label: "3.0HP",
        spec: "42CXV030308-1 · 3.0HP Inverter · Optima Series · Indoor/Outdoor",
        srp: "₱105,500",
        price: "₱75,999",
        discount: "-28% OFF",
        image: "images/carrier/optima.png",
      },
    ],
  },
  {
    id: "carrier-aura",
    brand: "Carrier",
    name: "Aura Inverter",
    icon: "🏠",
    section: "carrier",
    badges: [
      '<span class="badge badge--new">✨ New</span>',
      '<span class="badge badge--inverter">⚡ Inverter</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "Built-In Air Purifier",
      "19dB Ultra-Silent Mode",
      "PM 2.5 Sensor Display",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "42CEP009308 · 1.0HP Inverter · Aura Series · Indoor/Outdoor",
        srp: "₱39,798",
        price: "₱32,999",
        discount: "-17% OFF",
        image: "images/carrier/aura.png",
      },
      {
        label: "1.5HP",
        spec: "42CEP012308 · 1.5HP Inverter · Aura Series · Indoor/Outdoor",
        srp: "₱44,998",
        price: "₱37,499",
        discount: "-17% OFF",
        image: "images/carrier/aura.png",
      },
      {
        label: "2.0HP",
        spec: "42CEP018308 · 2.0HP Inverter · Aura Series · Indoor/Outdoor",
        srp: "₱60,298",
        price: "₱47,999",
        discount: "-20% OFF",
        image: "images/carrier/aura.png",
      },
      {
        label: "2.5HP",
        spec: "42CEP024308 · 2.5HP Inverter · Aura Series · Indoor/Outdoor",
        srp: "₱70,498",
        price: "₱57,999",
        discount: "-18% OFF",
        image: "images/carrier/aura.png",
      },
    ],
  },

  /* FLOOR MOUNTED */
  {
    id: "carrier-floor",
    brand: "Carrier",
    name: "Optima Floor Mounted",
    icon: "🔷",
    section: "floormount",
    badges: [
      '<span class="badge badge--bestseller">⭐ Commercial</span>',
      '<span class="badge badge--inverter">⚡ Inverter</span>',
    ],
    features: [
      "Professional Installation Included",
      "360° Floor-Level Airflow",
      "5-Speed Fan Control",
      "Auto Horizontal Swing",
    ],
    installationNote: {
      free_installation: "Professional installation included up to 15ft",
      excess_copper_per_ft: 550,
      electrical_per_meter: 300,
      items: [
        "Heavy-Duty Copper Tube 15ft with Insulation",
        "Communication Wire 15ft",
        "Floor Mounting Bracket & Stand",
        "2 Length PVC Drain Pipe",
        "Industrial Circuit Breaker",
        "Vibration Dampeners",
      ],
    },
    variants: [
      {
        label: "4.0HP",
        spec: "DFE-ASD · 4.0HP Inverter · Optima Floor Mounted · Indoor/Outdoor",
        srp: "₱110,000",
        price: "₱93,000",
        discount: "-15% OFF",
        image: "images/carrier/mounted.png",
      },
      {
        label: "6.0HP",
        spec: "DFE-ASD 06.0HP · Inverter · Optima Floor Mounted · Indoor/Outdoor",
        srp: "₱167,800",
        price: "₱139,460",
        discount: "-17% OFF",
        image: "images/carrier/mounted.png",
      },
    ],
  },

  /* HISENSE */
  {
    id: "hisense-hi-smart",
    brand: "Hisense",
    name: "Hisense Inverter Split-Type",
    icon: "❄️",
    section: "hisense",
    badges: [
      '<span class="badge badge--inverter">⚡ Full DC Inverter</span>',
      '<span class="badge badge--energy">⭐ 5-Star DOE</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "Super Cooling & 4D Auto-Swing",
      "Blue Fin Corrosion Protection",
      "Self-Cleaning Function",
      "Hi-Smart QSD Technology",
      "ECO & Sleep Modes",
      "R32 Eco-Friendly Refrigerant",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "AS-09TR5RCB · 1.0HP Full DC Inverter · 10,220-240V/60Hz · Indoor/Outdoor",
        srp: "₱34,995",
        price: "₱21,499",
        discount: "-39% OFF",
        image: "images/hisense/hisense.png",
      },
      {
        label: "1.5HP",
        spec: "AS-12TR5RCB · 1.5HP Full DC Inverter · 10,220-240V/60Hz · Indoor/Outdoor",
        srp: "₱37,995",
        price: "₱22,999",
        discount: "-39% OFF",
        image: "images/hisense/hisense.png",
      },
      {
        label: "2.0HP",
        spec: "AS-18TR5RCB · 2.0HP Full DC Inverter · 10,220-240V/60Hz · Indoor/Outdoor",
        srp: "₱49,995",
        price: "₱28,499",
        discount: "-43% OFF",
        image: "images/hisense/hisense.png",
      },
      {
        label: "2.5HP",
        spec: "AS-24TR5RCB · 2.5HP Full DC Inverter · 10,220-240V/60Hz · Indoor/Outdoor",
        srp: "₱56,995",
        price: "₱34,499",
        discount: "-39% OFF",
        image: "images/hisense/hisense.png",
      },
      {
        label: "3.0HP",
        spec: "AS-30TR2RDJ · 3.0HP Full DC Inverter · 10,220-240V/60Hz · Indoor/Outdoor",
        srp: "₱87,995",
        price: "₱50,499",
        discount: "-43% OFF",
        image: "images/hisense/hisense.png",
      },
    ],
  },

  /* MATRIX */
  {
    id: "matrix-mxc-lat",
    brand: "Matrix",
    name: "MATRIX INVERTER SPLIT TYPE AIRCON",
    icon: "❄",
    section: "matrix",
    badges: [
      '<span class="badge badge--inverter">⚡ Full DC Inverter</span>',
      '<span class="badge badge--popular">💰 Best Value</span>',
    ],
    features: [
      "Free Installation up to 10ft",
      "360° 3D Air Delivery",
      "Turbo Cooling Mode",
      "Self-Diagnosis Function",
      "Anti-Mildew & ECO Modes",
      "Auto Restart",
      "R32 Refrigerant",
    ],
    installationNote: {
      free_installation: "Free for all capacities up to 10ft",
      excess_copper_per_ft: 450,
      electrical_per_meter: 300,
      items: [
        "Copper Tube 10ft with Rubber Insulation",
        "Communication Wire 10ft",
        "L-Type Outdoor Bracket",
        "1 Length PVC Drain Pipe",
        "Circuit Breaker with NEMA 3R",
      ],
    },
    variants: [
      {
        label: "1.0HP",
        spec: "MX-CS25L2A · 1.0HP Full DC Inverter · Indoor/Outdoor",
        srp: "₱20,400",
        price: "₱18,500",
        discount: "-9% OFF",
        image: "images/matrix/matrix.png",
      },
      {
        label: "1.5HP",
        spec: "MX-CS35L2A · 1.5HP Full DC Inverter · Indoor/Outdoor",
        srp: "₱29,000",
        price: "₱20,499",
        discount: "-29% OFF",
        image: "images/matrix/matrix.png",
      },
      {
        label: "2.0HP",
        spec: "MX-CS51L2A · 2.0HP Full DC Inverter · Indoor/Outdoor",
        srp: "₱42,500",
        price: "₱26,499",
        discount: "-38% OFF",
        image: "images/matrix/matrix.png",
      },
      {
        label: "2.5HP",
        spec: "MX-CS70L2A · 2.5HP Full DC Inverter · Indoor/Outdoor",
        srp: "₱49,800",
        price: "₱29,999",
        discount: "-40% OFF",
        image: "images/matrix/matrix.png",
      },
      {
        label: "3.0HP",
        spec: "MX-C304HNF · 3.0HP Full DC Inverter · Indoor/Outdoor",
        srp: "₱60,000",
        price: "₱38,499",
        discount: "-36% OFF",
        image: "images/matrix/matrix.png",
      },
    ],
  },
];

const sections = [
  {
    id: "midea",
    label: "Value for Money · Smart Cooling",
    title: '<span class="brand-logo">MIDEA</span> Split Type',
    sub: "Reliable performance, proven technology — perfect for every budget",
    info: ["🏆 Best Seller", "⚡ Inverter Tech"],
  },
  {
    id: "daikin",
    label: "Premium Inverter Technology",
    title: '<span class="brand-logo">DAIKIN</span> Series',
    sub: "Japan's #1 air conditioning brand — unmatched efficiency & comfort",
    info: ["💰 Best Value", "🛡 Warranty Covered"],
  },
  {
    id: "carrier",
    label: "American Legacy · Global Trust",
    title: '<span class="brand-logo">CARRIER</span> Split Type',
    sub: "115 years of innovation — where cooling meets quiet luxury",
    info: ["🏅 Trusted Brand", "🔇 Ultra-Quiet"],
  },
  {
    id: "floormount",
    label: "Heavy-Duty · Commercial Grade",
    title: '<span class="brand-logo">CARRIER</span> Floor Mounted',
    sub: "Powerful floor-standing units for large spaces — offices, showrooms & more",
    info: ["🏢 Commercial", "💪 High Power"],
  },
  {
    id: "hisense",
    label: "Smart Tech · 5-Star Energy Efficient",
    title: '<span class="brand-logo">HISENSE</span> Wall Mounted',
    sub: "Full DC Inverter with Hi-Smart QSD Technology — 5-Star DOE rated for big savings",
    info: ["⭐ 5-Star DOE", "🌿 R32 Eco"],
  },
  {
    id: "matrix",
    label: "Affordable · Reliable Cooling",
    title: '<span class="brand-logo">MATRIX</span> MXC-LAT Inverter',
    sub: "Budget-friendly full DC inverter — great value without compromising comfort",
    info: ["💰 Affordable", "✅ Full Inverter"],
  },
];

const activeVariant = {};

// Helper function to get warranty for a product
function getWarrantyForProduct(product) {
  const brandKey = product.section.toLowerCase();
  return BRAND_WARRANTIES[brandKey] || BRAND_WARRANTIES.default;
}

/* ── BUILD CATALOG ── */
function buildCatalog() {
  const main = document.getElementById("catalog-main");
  if (!main) return;

  let html = "";
  sections.forEach((sec, si) => {
    const secProducts = products.filter((p) => p.section === sec.id);
    if (!secProducts.length) return;
    secProducts.forEach((p) => {
      activeVariant[p.id] = 0;
    });
    const divider = si > 0 ? '<div class="section-divider"></div>' : "";
    html += `${divider}
    <section id="${sec.id}" class="cat-section">
      <div class="cat-section__header observe-me">
        <div class="cat-section__left">
          <div class="cat-section__label">${sec.label}</div>
          <h2 class="cat-section__title">${sec.title}</h2>
          <p class="cat-section__sub">${sec.sub}</p>
        </div>
        <div class="cat-section__info">${sec.info.map((i) => `<span>${i}</span>`).join("")}</div>
      </div>
      <div class="product-grid">${secProducts.map((p) => buildCard(p)).join("")}</div>
    </section>`;
  });
  main.innerHTML = html;
}

function buildCard(p) {
  const v = p.variants[0];
  const variantBtns = p.variants
    .map(
      (vr, i) =>
        `<button class="variant-btn${i === 0 ? " active" : ""}" onclick="event.stopPropagation();selectVariant('${p.id}',${i},this)">${vr.label}</button>`,
    )
    .join("");
  const imgHtml = v.image
    ? `<img src="${v.image}" alt="${p.name}" />`
    : `<div class="card__img-placeholder">${p.icon}</div>`;
  return `
  <div class="product-card" id="card-${p.id}" onclick="openModal('${p.id}')">
    <div class="card__img-wrap">
      <div class="card__badges">${p.badges.join("")}</div>
      <div class="card__discount-badge" id="card-disc-${p.id}" ">${v.discount}</div>
      <div id="card-img-${p.id}">${imgHtml}</div>
    </div>
    <div class="card__body">
      <div class="card__brand">${p.brand}</div>
      <div class="card__name">${p.name}</div>
      <div class="card__spec" id="card-spec-${p.id}">${v.spec}</div>
      <div class="card__variants">${variantBtns}</div>
      <div class="card__pricing">
        <div class="card__srp" id="card-srp-${p.id}">${v.srp}</div>
        <div class="card__price-row">
          <div class="card__price" id="card-price-${p.id}">${v.price}</div>
          <div class="card__savings" id="card-save-${p.id}">Save ${calcSave(v.srp, v.price)}</div>
        </div>
      </div>
    </div>
    <div class="card__cta">👁 View Details →</div>
  </div>`;
}

function calcSave(srp, price) {
  const s = parseInt(srp.replace(/[^0-9]/g, ""));
  const p = parseInt(price.replace(/[^0-9]/g, ""));
  return "₱" + (s - p).toLocaleString();
}

function selectVariant(productId, variantIndex) {
  const p = products.find((x) => x.id === productId);
  if (!p) return;
  activeVariant[productId] = variantIndex;
  const v = p.variants[variantIndex];
  document.getElementById(`card-spec-${productId}`).textContent = v.spec;
  document.getElementById(`card-srp-${productId}`).textContent = v.srp;
  document.getElementById(`card-price-${productId}`).textContent = v.price;
  document.getElementById(`card-save-${productId}`).textContent =
    "Save " + calcSave(v.srp, v.price);
  document.getElementById(`card-disc-${productId}`).textContent = v.discount;
  const imgWrap = document.getElementById(`card-img-${productId}`);
  imgWrap.innerHTML = v.image
    ? `<img src="${v.image}" alt="${p.name}" />`
    : `<div class="card__img-placeholder">${p.icon}</div>`;
  document
    .getElementById(`card-${productId}`)
    .querySelectorAll(".variant-btn")
    .forEach((b, i) => b.classList.toggle("active", i === variantIndex));
}

/* ── MODAL ── */
let currentModalProduct = null;

function openModal(productId) {
  const p = products.find((x) => x.id === productId);
  if (!p) return;
  currentModalProduct = p;
  const vi = activeVariant[productId] || 0;
  renderModal(p, vi);
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderModal(p, vi) {
  const v = p.variants[vi];
  const warranty = getWarrantyForProduct(p);
  const installation = p.installationNote; // Each product has its own installation note

  document.getElementById("modal-brand").textContent = p.brand;
  document.getElementById("modal-img-brand").textContent = p.brand;
  document.getElementById("modal-name").textContent = p.name;
  document.getElementById("modal-spec").textContent = v.spec;
  document.getElementById("modal-price").textContent = v.price;
  document.getElementById("modal-srp").textContent = v.srp;
  document.getElementById("modal-discount").textContent = v.discount;
  document.getElementById("modal-img-discount").textContent = v.discount;

  const modalImg = document.getElementById("modal-img");
  modalImg.innerHTML = v.image
    ? `<img src="${v.image}" alt="${p.name}" />`
    : p.icon;

  /* HP variant buttons */
  const row = document.getElementById("modal-variants-row");
  row.innerHTML = p.variants
    .map(
      (vr, i) =>
        `<button class="modal__variant-btn${i === vi ? " active" : ""}" onclick="switchModalVariant(${i})">${vr.label}</button>`,
    )
    .join("");
  document.getElementById("modal-variants-block").style.display =
    p.variants.length > 1 ? "block" : "none";

  /* Product features */
  document.getElementById("modal-features").innerHTML = p.features
    .map(
      (f) =>
        `<div class="modal__feature-item"><span class="modal__feature-check">✓</span>${f}</div>`,
    )
    .join("");

  /* Warranty + Installation block — inject before CTA */
  let infoEl = document.getElementById("modal-info-blocks");
  if (!infoEl) {
    const cta = document.querySelector(".modal__cta-section");
    infoEl = document.createElement("div");
    infoEl.id = "modal-info-blocks";
    cta.parentNode.insertBefore(infoEl, cta);
  }

  // Use brand-specific warranty and product's own installation note
  infoEl.innerHTML = `
    <div class="modal__warranty-block">
      <div class="modal__warranty-label">🛡️ Warranty Coverage</div>
      <div class="modal__warranty-grid">
        <div class="modal__warranty-item">
          <span class="modal__warranty-icon">🔧</span>
          <div>
            <div class="modal__warranty-name">Compressor</div>
            <div class="modal__warranty-val">${warranty.compressor}</div>
          </div>
        </div>
        <div class="modal__warranty-item">
          <span class="modal__warranty-icon">⚡</span>
          <div>
            <div class="modal__warranty-name">PCB / Fan Motor</div>
            <div class="modal__warranty-val">${warranty.pcb_fan_motor}</div>
          </div>
        </div>
        <div class="modal__warranty-item">
          <span class="modal__warranty-icon">🔩</span>
          <div>
            <div class="modal__warranty-name">Parts</div>
            <div class="modal__warranty-val">${warranty.parts}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal__install-block">
      <div class="modal__install-header">
        <div class="modal__install-header-icon">🔨</div>
        <div>
          <div class="modal__install-title">Free Installation Inclusions — First 10 Feet</div>
          <div class="modal__install-subtitle">${installation.free_installation}</div>
        </div>
      </div>
      <div class="modal__install-items">
        ${installation.items
          .map(
            (item) => `
          <div class="modal__install-item">
            <span class="modal__install-check">✓</span>
            ${item}
          </div>`,
          )
          .join("")}
      </div>
      <div class="modal__install-footer">
        <span>ℹ️</span>
        <div>
          <span class="modal__install-extra">Beyond 10ft charges apply: </span>
          Excess copper ₱${installation.excess_copper_per_ft}/ft &nbsp;·&nbsp; Electrical works ₱${installation.electrical_per_meter}/m
        </div>
      </div>
    </div>`;
}

function switchModalVariant(vi) {
  if (!currentModalProduct) return;
  const p = currentModalProduct;
  activeVariant[p.id] = vi;
  const v = p.variants[vi];
  document.getElementById("modal-spec").textContent = v.spec;
  document.getElementById("modal-price").textContent = v.price;
  document.getElementById("modal-srp").textContent = v.srp;
  document.getElementById("modal-discount").textContent = v.discount;
  document.getElementById("modal-img-discount").textContent = v.discount;
  const modalImg = document.getElementById("modal-img");
  modalImg.innerHTML = v.image
    ? `<img src="${v.image}" alt="${p.name}" />`
    : p.icon;
  document
    .querySelectorAll(".modal__variant-btn")
    .forEach((b, i) => b.classList.toggle("active", i === vi));
  selectVariant(p.id, vi);
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}
function closeModalOutside(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ── SCROLL SPY ── */
const sectionIds = [
  "daikin",
  "midea",
  "carrier",
  "floormount",
  "hisense",
  "matrix",
];
window.addEventListener("scroll", () => {
  const catNav = document.getElementById("cat-nav");
  const topBar = document.querySelector(".catalog-topbar");
  if (!catNav || !topBar) return;
  const navH = catNav.offsetHeight + topBar.offsetHeight + 30;
  let current = sectionIds[0];
  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - navH) current = id;
  });
  document
    .querySelectorAll(".cat-nav__item")
    .forEach((btn, i) =>
      btn.classList.toggle("active", sectionIds[i] === current),
    );
});

/* ── INTERSECTION OBSERVER ── */
const catalogObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    }),
  { threshold: 0.12 },
);

buildCatalog();
document
  .querySelectorAll(".observe-me")
  .forEach((el) => catalogObserver.observe(el));
setTimeout(() => {
  document
    .querySelectorAll(".observe-me")
    .forEach((el) => catalogObserver.observe(el));
}, 100);

/* ── BRAND MARQUEE ── */
const brands = [
  { name: "Daikin", logo: "daikin.png" },
  { name: "Midea", logo: "midea.png" },
  { name: "Carrier", logo: "carrier.png" },
];
function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  let content = "";
  for (let i = 0; i < 4; i++) {
    content += brands
      .map(
        (b) =>
          `<div class="brand-card"><img src="${b.logo}" alt="${b.name}" class="brand-logo" loading="lazy"></div>`,
      )
      .join("");
  }
  track.innerHTML = content + content;
}
initMarquee();
