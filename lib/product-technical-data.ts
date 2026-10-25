export type ProductSpecification = { label: string; value: string };
export type ProductCapacity = {
  label: string;
  unit: "ft³/hr" | "ft³/rev";
  speedsRpm?: string[];
  rows: { size: string; values: string[] }[];
};
export type ProductTechnicalData = {
  specifications: ProductSpecification[];
  capacity?: ProductCapacity;
};

export const productTechnicalData: Record<string, ProductTechnicalData> = {
  "an-x-dust-collector": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "3 sizes: 8\", 10\", 12\""
      },
      {
        "label": "Material of Construction",
        "value": "Mild Steel or Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 psi"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/rev",
      "rows": [
        {
          "size": "8\"",
          "values": [
            "0.64"
          ]
        },
        {
          "size": "10\"",
          "values": [
            "1.34"
          ]
        },
        {
          "size": "12\"",
          "values": [
            "2.46"
          ]
        }
      ]
    }
  },
  "airlock-ci-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "11 sizes from 6\" to 26\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 22 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "750 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        },
        {
          "size": "14",
          "values": [
            "66",
            "330",
            "528",
            "660",
            "792",
            "924",
            "1056",
            "1188",
            "1320",
            "1452"
          ]
        },
        {
          "size": "16",
          "values": [
            "84",
            "420",
            "672",
            "840",
            "1008",
            "1176",
            "1344",
            "1512",
            "1680",
            "1848"
          ]
        },
        {
          "size": "16T",
          "values": [
            "120",
            "600",
            "960",
            "1200",
            "1440",
            "1680",
            "1920",
            "2160",
            "2400",
            "2640"
          ]
        },
        {
          "size": "18",
          "values": [
            "162",
            "810",
            "1296",
            "1620",
            "1944",
            "2268",
            "2592",
            "2916",
            "3240",
            "3564"
          ]
        },
        {
          "size": "22",
          "values": [
            "276",
            "1380",
            "2208",
            "2760",
            "3312",
            "3864",
            "4416",
            "4968",
            "5520",
            "6072"
          ]
        },
        {
          "size": "24",
          "values": [
            "384",
            "1920",
            "3072",
            "3840",
            "4608",
            "5376",
            "6144",
            "6912",
            "7680",
            "8448"
          ]
        },
        {
          "size": "26",
          "values": [
            "540",
            "2700",
            "4320",
            "5400",
            "6480",
            "7560",
            "8640",
            "9720",
            "10800",
            "11880"
          ]
        }
      ]
    }
  },
  "ci-series-with-quick-clean": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "9 sizes, 6\" to 22\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        },
        {
          "size": "14",
          "values": [
            "66",
            "330",
            "528",
            "660",
            "792",
            "924",
            "1056",
            "1188",
            "1320",
            "1452"
          ]
        },
        {
          "size": "16",
          "values": [
            "84",
            "420",
            "672",
            "840",
            "1008",
            "1176",
            "1344",
            "1512",
            "1680",
            "1848"
          ]
        },
        {
          "size": "16T",
          "values": [
            "120",
            "600",
            "960",
            "1200",
            "1440",
            "1680",
            "1920",
            "2160",
            "2400",
            "2640"
          ]
        },
        {
          "size": "18",
          "values": [
            "162",
            "810",
            "1296",
            "1620",
            "1944",
            "2268",
            "2592",
            "2916",
            "3240",
            "3564"
          ]
        },
        {
          "size": "22",
          "values": [
            "276",
            "1380",
            "2208",
            "2760",
            "3312",
            "3864",
            "4416",
            "4968",
            "5520",
            "6072"
          ]
        }
      ]
    }
  },
  "sanitary-ci-with-quick-clean": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "9 sizes from 6\" to 22\""
      },
      {
        "label": "Material of Construction",
        "value": "Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        },
        {
          "size": "14",
          "values": [
            "66",
            "330",
            "528",
            "660",
            "792",
            "924",
            "1056",
            "1188",
            "1320",
            "1452"
          ]
        },
        {
          "size": "16",
          "values": [
            "84",
            "420",
            "672",
            "840",
            "1008",
            "1176",
            "1344",
            "1512",
            "1680",
            "1848"
          ]
        },
        {
          "size": "16T",
          "values": [
            "120",
            "600",
            "960",
            "1200",
            "1440",
            "1680",
            "1920",
            "2160",
            "2400",
            "2640"
          ]
        },
        {
          "size": "18",
          "values": [
            "162",
            "810",
            "1296",
            "1620",
            "1944",
            "2268",
            "2592",
            "2916",
            "3240",
            "3564"
          ]
        },
        {
          "size": "22",
          "values": [
            "276",
            "1380",
            "2208",
            "2760",
            "3312",
            "3864",
            "4416",
            "4968",
            "5520",
            "6072"
          ]
        }
      ]
    }
  },
  "xtr-ci-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "8\" to 12\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron with protective coating"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500°F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        }
      ]
    }
  },
  "md-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "7 sizes from 4\" to 16\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 22 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "750 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "4",
          "values": [
            "2",
            "8",
            "12",
            "15",
            "18",
            "21",
            "24",
            "27",
            "30",
            "33"
          ]
        },
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        },
        {
          "size": "14",
          "values": [
            "66",
            "330",
            "528",
            "660",
            "792",
            "924",
            "1056",
            "1188",
            "1320",
            "1452"
          ]
        },
        {
          "size": "16",
          "values": [
            "84",
            "420",
            "672",
            "840",
            "1008",
            "1176",
            "1344",
            "1512",
            "1680",
            "1848"
          ]
        }
      ]
    }
  },
  "md-series-with-quick-clean": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "7 sizes from 4\" to 15\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "4",
          "values": [
            "2",
            "8",
            "12",
            "15",
            "18",
            "21",
            "24",
            "27",
            "30",
            "33"
          ]
        },
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        },
        {
          "size": "14",
          "values": [
            "66",
            "330",
            "528",
            "660",
            "792",
            "924",
            "1056",
            "1188",
            "1320",
            "1452"
          ]
        },
        {
          "size": "15",
          "values": [
            "84",
            "420",
            "672",
            "840",
            "1008",
            "1176",
            "1344",
            "1512",
            "1680",
            "1848"
          ]
        }
      ]
    }
  },
  "sanitary-md-series-with-quick-clean": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "7 sizes from 4\" to 15\""
      },
      {
        "label": "Material of Construction",
        "value": "Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "4",
          "values": [
            "2",
            "8",
            "12",
            "15",
            "18",
            "21",
            "24",
            "27",
            "30",
            "33"
          ]
        },
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        },
        {
          "size": "14",
          "values": [
            "66",
            "330",
            "528",
            "660",
            "792",
            "924",
            "1056",
            "1188",
            "1320",
            "1452"
          ]
        },
        {
          "size": "15",
          "values": [
            "84",
            "420",
            "672",
            "840",
            "1008",
            "1176",
            "1344",
            "1512",
            "1680",
            "1848"
          ]
        }
      ]
    }
  },
  "xtr-md-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "Round Flange 4\" to 16\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron with protective coating"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500°F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        }
      ]
    }
  },
  "12-inch-multi-port-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "Multi-Port 12 x 24 RAL, 1.42 C.F.R. ; Multi-Port 12 x 36 RAL, 2.13 C.F.R. ; Multi-Port 12 x 48 RAL, 2.84 C.F.R."
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 20 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "450°F Max"
      }
    ]
  },
  "dr-s-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "4 sizes from 7 5/8\" to 16\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 22 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "750 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "8",
          "values": [
            "10",
            "51",
            "82",
            "102",
            "122",
            "143",
            "163",
            "184",
            "204",
            "224"
          ]
        },
        {
          "size": "10",
          "values": [
            "20",
            "102",
            "163",
            "204",
            "245",
            "286",
            "326",
            "367",
            "408",
            "449"
          ]
        },
        {
          "size": "12",
          "values": [
            "37",
            "183",
            "293",
            "366",
            "439",
            "512",
            "586",
            "659",
            "732",
            "805"
          ]
        },
        {
          "size": "16",
          "values": [
            "120",
            "600",
            "960",
            "1200",
            "1440",
            "1680",
            "1920",
            "2160",
            "2400",
            "2640"
          ]
        }
      ]
    }
  },
  "aero-flow-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "4 sizes from 6 5/8\" x 6 3/4\" to 25 1/4\" x 12\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 20 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "750 °F"
      }
    ]
  },
  "dc-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "4 sizes from 6\" to 12\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "High Temperature Range",
        "value": "250 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        }
      ]
    }
  },
  "s-pellet-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "6 sizes from 6\" to 16\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "750 °F"
      }
    ],
    "capacity": {
      "label": "Round flange rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "6",
          "values": [
            "14",
            "71",
            "114",
            "142",
            "171",
            "199",
            "228",
            "256",
            "284",
            "313"
          ]
        },
        {
          "size": "8",
          "values": [
            "26",
            "132",
            "211",
            "264",
            "317",
            "370",
            "422",
            "475",
            "528",
            "581"
          ]
        },
        {
          "size": "10",
          "values": [
            "54",
            "270",
            "432",
            "540",
            "648",
            "756",
            "864",
            "972",
            "1080",
            "1188"
          ]
        },
        {
          "size": "12",
          "values": [
            "84",
            "420",
            "672",
            "840",
            "1008",
            "1176",
            "1344",
            "1512",
            "1680",
            "1848"
          ]
        },
        {
          "size": "14",
          "values": [
            "144",
            "570",
            "912",
            "1140",
            "1368",
            "1596",
            "1824",
            "2052",
            "2280",
            "2508"
          ]
        },
        {
          "size": "16",
          "values": [
            "186",
            "930",
            "1488",
            "1860",
            "2232",
            "2604",
            "2976",
            "3348",
            "3720",
            "4092"
          ]
        }
      ]
    }
  },
  "s-pellet-series-with-quick-clean": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "5 sizes from 6\" to 14\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "750 °F"
      }
    ],
    "capacity": {
      "label": "Round flange rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "12",
            "60",
            "96",
            "120",
            "144",
            "168",
            "192",
            "216",
            "240",
            "264"
          ]
        },
        {
          "size": "10",
          "values": [
            "24",
            "120",
            "192",
            "240",
            "288",
            "336",
            "384",
            "432",
            "480",
            "528"
          ]
        },
        {
          "size": "12",
          "values": [
            "45",
            "225",
            "360",
            "450",
            "540",
            "630",
            "720",
            "810",
            "900",
            "990"
          ]
        },
        {
          "size": "14",
          "values": [
            "66",
            "330",
            "528",
            "660",
            "792",
            "924",
            "1056",
            "1188",
            "1320",
            "1452"
          ]
        }
      ]
    }
  },
  "bt-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "2 sizes, 8\" and 10\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 20 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ]
  },
  "sd-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "4 sizes from 6\" to 12\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "High Temperature Range",
        "value": "250 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "6",
          "values": [
            "6",
            "30",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132"
          ]
        },
        {
          "size": "8",
          "values": [
            "10",
            "51",
            "82",
            "102",
            "122",
            "143",
            "163",
            "184",
            "204",
            "224"
          ]
        },
        {
          "size": "10",
          "values": [
            "20",
            "102",
            "163",
            "204",
            "245",
            "286",
            "326",
            "367",
            "408",
            "449"
          ]
        },
        {
          "size": "12",
          "values": [
            "37",
            "183",
            "293",
            "366",
            "439",
            "512",
            "586",
            "659",
            "732",
            "805"
          ]
        }
      ]
    }
  },
  "ft-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "10 sizes from 4\" to 30\", or custom"
      },
      {
        "label": "Material of Construction",
        "value": "Mild Steel, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 18\" WG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/rev",
      "rows": [
        {
          "size": "4",
          "values": [
            ".10"
          ]
        },
        {
          "size": "6",
          "values": [
            ".23"
          ]
        },
        {
          "size": "8",
          "values": [
            ".64"
          ]
        },
        {
          "size": "10",
          "values": [
            "1.34"
          ]
        },
        {
          "size": "12",
          "values": [
            "2.46"
          ]
        },
        {
          "size": "14",
          "values": [
            "6.2"
          ]
        },
        {
          "size": "16",
          "values": [
            "6.2"
          ]
        },
        {
          "size": "20",
          "values": [
            "12.6"
          ]
        },
        {
          "size": "24",
          "values": [
            "21.0"
          ]
        },
        {
          "size": "30",
          "values": [
            "42.4"
          ]
        }
      ]
    }
  },
  "discharge-trough-feeder-valve-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "3 sizes, 12\" x 24\" to 12\" x 48\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "High Temperature Range",
        "value": "450 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "speedsRpm": [
        "1",
        "5",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22"
      ],
      "rows": [
        {
          "size": "12\"x24\"",
          "values": [
            "78",
            "390",
            "624",
            "780",
            "936",
            "1092",
            "1248",
            "1404",
            "1560",
            "1716"
          ]
        },
        {
          "size": "12\"x36\"",
          "values": [
            "102",
            "510",
            "816",
            "1020",
            "1224",
            "1428",
            "1632",
            "1836",
            "2040",
            "2244"
          ]
        },
        {
          "size": "12\"x48\"",
          "values": [
            "135",
            "675",
            "1080",
            "1350",
            "1620",
            "1890",
            "2160",
            "2430",
            "2700",
            "2970"
          ]
        }
      ]
    }
  },
  "gravity-diverter-valve": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "4 sizes from 6\" to 12\", or custom"
      },
      {
        "label": "Material of Construction",
        "value": "Carbon Steel, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 30\" WG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ]
  },
  "ci-rpv-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "5 sizes 6\" to 14\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ]
  },
  "mini-19-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "2 sizes, 2\" and 3\", round or square"
      },
      {
        "label": "Material of Construction",
        "value": "Carbon Steel, Stainless Steel"
      }
    ]
  },
  "double-flap-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "6 sizes from 6\" to 16\", or custom"
      },
      {
        "label": "Material of Construction",
        "value": "Carbon Steel, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 30\" WG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ],
    "capacity": {
      "label": "Rotary valve capacity",
      "unit": "ft³/hr",
      "rows": [
        {
          "size": "6",
          "values": [
            "50"
          ]
        },
        {
          "size": "8",
          "values": [
            "100"
          ]
        },
        {
          "size": "10",
          "values": [
            "200"
          ]
        },
        {
          "size": "12",
          "values": [
            "350"
          ]
        },
        {
          "size": "14",
          "values": [
            "600"
          ]
        },
        {
          "size": "16",
          "values": [
            "790"
          ]
        }
      ]
    }
  },
  "cdc-ci-series": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "3 sizes from 8\" to 12\""
      },
      {
        "label": "Material of Construction",
        "value": "Cast Iron, Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ]
  },
  "sanitary-cdc-ci": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "3 sizes from 8\" to 12\""
      },
      {
        "label": "Material of Construction",
        "value": "Stainless Steel"
      },
      {
        "label": "Pressure Differential",
        "value": "Up to 15 PSIG"
      },
      {
        "label": "High Temperature Range",
        "value": "500 °F"
      }
    ]
  },
  "micro-ingredient-valve": {
    "specifications": [
      {
        "label": "Inlet/Outlet Flange Sizes",
        "value": "1.5\" to 3\""
      },
      {
        "label": "Available Valve Sizes",
        "value": "1.5\", 2\", 2.5\", 3\""
      },
      {
        "label": "Material of Construction",
        "value": "Aluminum, Stainless Steel"
      }
    ]
  }
};
