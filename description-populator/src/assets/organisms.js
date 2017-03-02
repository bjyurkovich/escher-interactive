export default [
  {
    "displayName": "Erythrocyte",
    "id":"erythrocyte",
    "isItalicized": false,
    "hasSubMaps": false,
    "description": "iAB-RBC-283",
    "imageUrl":"organisms/rbc/rbc_general.png",
    "maps":[
      {
        "name" : "rbc-complete",
        "title": "Complete metabolism",
        "mapUrl":"organisms/rbc/rbc_map.json",
        "modelUrl":"organisms/rbc/rbc_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/combined.png"
      }
    ]
  },
  {
    "displayName": "Escherichia coli",
    "id": "escherichia-coli",
    "isItalicized": true,
    "hasSubMaps": true,
    "description": "iJO1366",
    "imageUrl":"organisms/ecoli/ecoli_general.png",
    "maps":[
      {
        "name" : "ecoli-core",
        "title": "Core metabolism",
        "mapUrl":"organisms/ecoli/ecoli_core_map.json",
        "modelUrl":"organisms/ecoli/ecoli_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/core.png"
      },
      {
        "name" : "ecoli-central-metabolism",
        "title": "Central carbon metabolism",
        "mapUrl":"organisms/ecoli/ecoli_central-metabolism_map.json",
        "modelUrl":"organisms/ecoli/ecoli_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/central-carbon.png"
      },
      {
        "name" : "ecoli-FA-beta-ox",
        "title": "Fatty acid and beta oxidation",
        "mapUrl":"organisms/ecoli/ecoli_fatty-acid-beta-oxidation_map.json",
        "modelUrl":"organisms/ecoli/ecoli_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/fa-beta-ox.png"
      },
      {
        "name" : "ecoli-FA-biosynth",
        "title": "Fatty acid biosynthesis",
        "mapUrl":"organisms/ecoli/ecoli_fatty-acid-biosynthesis-saturated_map.json",
        "modelUrl":"organisms/ecoli/ecoli_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/fa-biosynth.png"
      },
      {
        "name" : "ecoli-nucleotide-biosynth",
        "title": "Nucleotide biosynthesis",
        "mapUrl":"organisms/ecoli/ecoli_nucleotide-histidine-biosynthesis_maap.json",
        "modelUrl":"organisms/ecoli/ecoli_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/nucl-biosynth.png"
      },
      {
        "name" : "ecoli-nucleotide-metabolism",
        "title": "Nucleotide metabolism",
        "mapUrl":"organisms/ecoli/ecoli_nucleotide-metabolism_map.json",
        "modelUrl":"organisms/ecoli/ecoli_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/nucl-metabolism.png"
      }
    ]
  },
  {
    "displayName": "Helicobacter pylori",
    "id": "helicobacter-pylori",
    "isItalicized": true,
    "hasSubMaps": true,
    "description": "iIT341",
    "imageUrl":"organisms/helicobacter-pylori/helicobacter-pylori_general.png",
    "maps":[
      {
        "name" : "helico-combined",
        "title": "Combined map",
        "mapUrl":"organisms/helicobacter-pylori/iIT341_COMBINED_map.json",
        "modelUrl":"organisms/helicobacter-pylori/iIT341_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/combined.png"
      },
      {
        "name" : "helico-central-metabolism",
        "title": "Central carbon metabolism",
        "mapUrl":"organisms/helicobacter-pylori/iIT341_central-metabolism013_map.json",
        "modelUrl":"organisms/helicobacter-pylori/iIT341_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/central-carbon.png"
      }
    ]
  },
  {
    "displayName": "Human",
    "id": "human",
    "isItalicized": false,
    "hasSubMaps": true,
    "description": "RECON1",
    "imageUrl":"organisms/human/human_general.png",
    "maps":[
      {
        "name" : "human-AA-metabolism",
        "title": "Amino acid metabolism",
        "mapUrl":"organisms/human/recon1_amino-acid-metabolism-partial_map.json",
        "modelUrl":"organisms/human/recon1_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/nucl-metabolism.png"
      },
      {
        "name" : "human-carb-metabolism",
        "title": "Carbohydrate metabolism",
        "mapUrl":"organisms/human/recon1_carbohydrate-metabolism_map.json",
        "modelUrl":"organisms/human/recon1_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/fa-biosynth.png"
      },
      {
        "name" : "human-central-metabolism",
        "title": "Central carbon metabolism",
        "mapUrl":"organisms/human/recon1_glycolysis-TCA-PPP_map.json",
        "modelUrl":"organisms/human/recon1_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/central-carbon.png"
      },
      {
        "name" : "human-inos-ret-metabolism",
        "title": "Inositol and retinol metabolism",
        "mapUrl":"organisms/human/recon1_inositol-retinol-metabolism_map.json",
        "modelUrl":"organisms/human/recon1_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/fa-beta-ox.png"
      },
      {
        "name" : "human-trp-metabolism",
        "title": "Tryptophan metabolism",
        "mapUrl":"organisms/human/recon1_tryptophan-metabolism_map.json",
        "modelUrl":"organisms/human/recon1_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/nucl-biosynth.png"
      }
    ]
  },
  // {
  //   "displayName": "Platelet",
  //   "id": "platelet",
  //   "isItalicized": false,
  //   "hasSubMaps": false,
  //   "description": "iAT-PLT-636",
  //   "imageUrl":"organisms/plt/plt_general.png",
  //   "maps":[
  //     {
  //       "name" : "plt-map",
  //       "title": "Central carbon metabolism",
  //       "mapUrl":"organisms/plt/plt_map.json",
  //       "modelUrl":"organisms/plt/plt_model.json",
  //       "description":"",
  //       "imageUrl":"organisms/submaps/central-carbon.png"
  //     }
  //   ]
  // },
  {
    "displayName": "Saccharomyces cerevisiae",
    "id":"saccharomyces-cerevisiae",
    "isItalicized": true,
    "hasSubMaps": false,
    "description": "iMM904",
    "imageUrl":"organisms/yeast/yeast_general.png",
    "maps":[
      {
        "name" : "sc-central-metabolism",
        "title": "Central carbon metabolism",
        "mapUrl":"organisms/yeast/yeast_central-carbon-metabolism_map.json",
        "modelUrl":"organisms/yeast/yeast_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/central-carbon.png"
      }
    ]
  },
  {
    "displayName": "Staphylococcus aureus",
    "id":"staphylococcus-aureus",
    "isItalicized": true,
    "hasSubMaps": true,
    "description": "iSB619",
    "imageUrl":"organisms/staphylococcus-aureus/staphylococcus-aureus_general.png",
    "maps":[
      {
        "name" : "staph-combined",
        "title": "Combined map",
        "mapUrl":"organisms/staphylococcus-aureus/iSB619_COMBINED_map.json",
        "modelUrl":"organisms/staphylococcus-aureus/iSB619_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/combined.png"
      },
      {
        "name" : "staph-heme-biosynth",
        "title": "Heme biosynthesis",
        "mapUrl":"organisms/staphylococcus-aureus/iSB619_Heme-Biosynthesis_map.json",
        "modelUrl":"organisms/staphylococcus-aureus/iSB619_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/nucl-biosynth.png"
      },
      {
        "name" : "staph-ox",
        "title": "Oxidative phosphorylation",
        "mapUrl":"organisms/staphylococcus-aureus/iSB619_Oxidative-Phosphorylation_map.json",
        "modelUrl":"organisms/staphylococcus-aureus/iSB619_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/nucl-metabolism.png"
      },
      {
        "name" : "staph-AA-metabolism",
        "title": "Amino acid metabolism",
        "mapUrl":"organisms/staphylococcus-aureus/iSB619_amino-acid-metabolism_map.json",
        "modelUrl":"organisms/staphylococcus-aureus/iSB619_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/fa-biosynth.png"
      },
      {
        "name" : "staph-central-metabolism",
        "title": "Central metabolism",
        "mapUrl":"organisms/staphylococcus-aureus/iSB619_central-metabolism_map.json",
        "modelUrl":"organisms/staphylococcus-aureus/iSB619_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/central-carbon.png"
      },
      {
        "name" : "staph-nucl-metabolism",
        "title": "Purine and pyrimidine metabolism",
        "mapUrl":"organisms/staphylococcus-aureus/iSB619_purine-pyrimidine-metabolism_map.json",
        "modelUrl":"organisms/staphylococcus-aureus/iSB619_model.json",
        "description":"",
        "imageUrl":"organisms/submaps/fa-beta-ox.png"
      }
    ]
  },
  {
    "displayName": "Synechococcus elongatus",
    "id":"se",
    "isItalicized": true,
    "hasSubMaps": false,
    "description": "iJB785",
    "imageUrl":"organisms/synechococcus-elongatus/se_general.png",
    "maps":[
      {
        "name" : "se-central-carbon",
        "title": "Central metabolism",
        "mapUrl":"organisms/synechococcus-elongatus/iJB785_central-carbon_map.json",
        "modelUrl":"organisms/synechococcus-elongatus/iJB785.json",
        "description":"",
        "imageUrl":"organisms/submaps/central-carbon.png"
      }
    ]
  },
  {
    "displayName": "Mycoplasma tuberculosis",
    "id":"tuberculosis",
    "isItalicized": true,
    "hasSubMaps": false,
    "description": "iNJ661",
    "imageUrl":"organisms/tuberculosis/tuberculosis_general.png",
    "maps":[
      {
        "name" : "tb-combined",
        "title": "Combined map",
        "mapUrl":"organisms/tuberculosis/iNJ661_COMBINED_map.json",
        "modelUrl":"organisms/tuberculosis/iNJ661.json",
        "description":"",
        "imageUrl":"organisms/submaps/combined.png"
      }
    ]
  }
]
