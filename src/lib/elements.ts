export interface ChemicalElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  electronegativity: string;
  electronConfiguration: string;
  groupBlock: "Nonmetal" | "Noble gas" | "Alkali metal" | "Alkaline earth metal" | "Metalloid" | "Post-transition metal" | "Transition metal" | "Halogen";
  row: number;
  column: number;
}

export const elements: ChemicalElement[] = [
  // ROW 1
  { atomicNumber: 1, symbol: "H", name: "Hydrogen", atomicMass: "1.008", electronegativity: "2.20", electronConfiguration: "1s1", groupBlock: "Nonmetal", row: 1, column: 1 },
  { atomicNumber: 2, symbol: "He", name: "Helium", atomicMass: "4.002", electronegativity: "-", electronConfiguration: "1s2", groupBlock: "Noble gas", row: 1, column: 18 },
  // ROW 2
  { atomicNumber: 3, symbol: "Li", name: "Lithium", atomicMass: "6.94", electronegativity: "0.98", electronConfiguration: "[He] 2s1", groupBlock: "Alkali metal", row: 2, column: 1 },
  { atomicNumber: 4, symbol: "Be", name: "Beryllium", atomicMass: "9.012", electronegativity: "1.57", electronConfiguration: "[He] 2s2", groupBlock: "Alkaline earth metal", row: 2, column: 2 },
  { atomicNumber: 5, symbol: "B", name: "Boron", atomicMass: "10.81", electronegativity: "2.04", electronConfiguration: "[He] 2s2 2p1", groupBlock: "Metalloid", row: 2, column: 13 },
  { atomicNumber: 6, symbol: "C", name: "Carbon", atomicMass: "12.011", electronegativity: "2.55", electronConfiguration: "[He] 2s2 2p2", groupBlock: "Nonmetal", row: 2, column: 14 },
  { atomicNumber: 7, symbol: "N", name: "Nitrogen", atomicMass: "14.007", electronegativity: "3.04", electronConfiguration: "[He] 2s2 2p3", groupBlock: "Nonmetal", row: 2, column: 15 },
  { atomicNumber: 8, symbol: "O", name: "Oxygen", atomicMass: "15.999", electronegativity: "3.44", electronConfiguration: "[He] 2s2 2p4", groupBlock: "Nonmetal", row: 2, column: 16 },
  { atomicNumber: 9, symbol: "F", name: "Fluorine", atomicMass: "18.998", electronegativity: "3.98", electronConfiguration: "[He] 2s2 2p5", groupBlock: "Halogen", row: 2, column: 17 },
  { atomicNumber: 10, symbol: "Ne", name: "Neon", atomicMass: "20.180", electronegativity: "-", electronConfiguration: "[He] 2s2 2p6", groupBlock: "Noble gas", row: 2, column: 18 },
  // ROW 3
  { atomicNumber: 11, symbol: "Na", name: "Sodium", atomicMass: "22.990", electronegativity: "0.93", electronConfiguration: "[Ne] 3s1", groupBlock: "Alkali metal", row: 3, column: 1 },
  { atomicNumber: 12, symbol: "Mg", name: "Magnesium", atomicMass: "24.305", electronegativity: "1.31", electronConfiguration: "[Ne] 3s2", groupBlock: "Alkaline earth metal", row: 3, column: 2 },
  { atomicNumber: 13, symbol: "Al", name: "Aluminum", atomicMass: "26.982", electronegativity: "1.61", electronConfiguration: "[Ne] 3s2 3p1", groupBlock: "Post-transition metal", row: 3, column: 13 },
  { atomicNumber: 14, symbol: "Si", name: "Silicon", atomicMass: "28.085", electronegativity: "1.90", electronConfiguration: "[Ne] 3s2 3p2", groupBlock: "Metalloid", row: 3, column: 14 },
  { atomicNumber: 15, symbol: "P", name: "Phosphorus", atomicMass: "30.974", electronegativity: "2.19", electronConfiguration: "[Ne] 3s2 3p3", groupBlock: "Nonmetal", row: 3, column: 15 },
  { atomicNumber: 16, symbol: "S", name: "Sulfur", atomicMass: "32.06", electronegativity: "2.58", electronConfiguration: "[Ne] 3s2 3p4", groupBlock: "Nonmetal", row: 3, column: 16 },
  { atomicNumber: 17, symbol: "Cl", name: "Chlorine", atomicMass: "35.45", electronegativity: "3.16", electronConfiguration: "[Ne] 3s2 3p5", groupBlock: "Halogen", row: 3, column: 17 },
  { atomicNumber: 18, symbol: "Ar", name: "Argon", atomicMass: "39.95", electronegativity: "-", electronConfiguration: "[Ne] 3s2 3p6", groupBlock: "Noble gas", row: 3, column: 18 },
  // ROW 4
  { atomicNumber: 19, symbol: "K", name: "Potassium", atomicMass: "39.098", electronegativity: "0.82", electronConfiguration: "[Ar] 4s1", groupBlock: "Alkali metal", row: 4, column: 1 },
  { atomicNumber: 20, symbol: "Ca", name: "Calcium", atomicMass: "40.078", electronegativity: "1.00", electronConfiguration: "[Ar] 4s2", groupBlock: "Alkaline earth metal", row: 4, column: 2 },
  { atomicNumber: 21, symbol: "Sc", name: "Scandium", atomicMass: "44.956", electronegativity: "1.36", electronConfiguration: "[Ar] 3d1 4s2", groupBlock: "Transition metal", row: 4, column: 3 },
  { atomicNumber: 22, symbol: "Ti", name: "Titanium", atomicMass: "47.867", electronegativity: "1.54", electronConfiguration: "[Ar] 3d2 4s2", groupBlock: "Transition metal", row: 4, column: 4 },
  { atomicNumber: 23, symbol: "V", name: "Vanadium", atomicMass: "50.942", electronegativity: "1.63", electronConfiguration: "[Ar] 3d3 4s2", groupBlock: "Transition metal", row: 4, column: 5 },
  { atomicNumber: 24, symbol: "Cr", name: "Chromium", atomicMass: "51.996", electronegativity: "1.66", electronConfiguration: "[Ar] 3d5 4s1", groupBlock: "Transition metal", row: 4, column: 6 },
  { atomicNumber: 25, symbol: "Mn", name: "Manganese", atomicMass: "54.938", electronegativity: "1.55", electronConfiguration: "[Ar] 3d5 4s2", groupBlock: "Transition metal", row: 4, column: 7 },
  { atomicNumber: 26, symbol: "Fe", name: "Iron", atomicMass: "55.845", electronegativity: "1.83", electronConfiguration: "[Ar] 3d6 4s2", groupBlock: "Transition metal", row: 4, column: 8 },
  { atomicNumber: 27, symbol: "Co", name: "Cobalt", atomicMass: "58.933", electronegativity: "1.88", electronConfiguration: "[Ar] 3d7 4s2", groupBlock: "Transition metal", row: 4, column: 9 },
  { atomicNumber: 28, symbol: "Ni", name: "Nickel", atomicMass: "58.693", electronegativity: "1.91", electronConfiguration: "[Ar] 3d8 4s2", groupBlock: "Transition metal", row: 4, column: 10 },
  { atomicNumber: 29, symbol: "Cu", name: "Copper", atomicMass: "63.546", electronegativity: "1.90", electronConfiguration: "[Ar] 3d10 4s1", groupBlock: "Transition metal", row: 4, column: 11 },
  { atomicNumber: 30, symbol: "Zn", name: "Zinc", atomicMass: "65.38", electronegativity: "1.65", electronConfiguration: "[Ar] 3d10 4s2", groupBlock: "Transition metal", row: 4, column: 12 },
  { atomicNumber: 31, symbol: "Ga", name: "Gallium", atomicMass: "69.723", electronegativity: "1.81", electronConfiguration: "[Ar] 3d10 4s2 4p1", groupBlock: "Post-transition metal", row: 4, column: 13 },
  { atomicNumber: 32, symbol: "Ge", name: "Germanium", atomicMass: "72.630", electronegativity: "2.01", electronConfiguration: "[Ar] 3d10 4s2 4p2", groupBlock: "Metalloid", row: 4, column: 14 },
  { atomicNumber: 33, symbol: "As", name: "Arsenic", atomicMass: "74.922", electronegativity: "2.18", electronConfiguration: "[Ar] 3d10 4s2 4p3", groupBlock: "Metalloid", row: 4, column: 15 },
  { atomicNumber: 34, symbol: "Se", name: "Selenium", atomicMass: "78.971", electronegativity: "2.55", electronConfiguration: "[Ar] 3d10 4s2 4p4", groupBlock: "Nonmetal", row: 4, column: 16 },
  { atomicNumber: 35, symbol: "Br", name: "Bromine", atomicMass: "79.904", electronegativity: "2.96", electronConfiguration: "[Ar] 3d10 4s2 4p5", groupBlock: "Halogen", row: 4, column: 17 },
  { atomicNumber: 36, symbol: "Kr", name: "Krypton", atomicMass: "83.798", electronegativity: "3.00", electronConfiguration: "[Ar] 3d10 4s2 4p6", groupBlock: "Noble gas", row: 4, column: 18 },
  // ROW 5
  { atomicNumber: 37, symbol: "Rb", name: "Rubidium", atomicMass: "85.468", electronegativity: "0.82", electronConfiguration: "[Kr] 5s1", groupBlock: "Alkali metal", row: 5, column: 1 },
  { atomicNumber: 38, symbol: "Sr", name: "Strontium", atomicMass: "87.62", electronegativity: "0.95", electronConfiguration: "[Kr] 5s2", groupBlock: "Alkaline earth metal", row: 5, column: 2 },
  { atomicNumber: 39, symbol: "Y", name: "Yttrium", atomicMass: "88.906", electronegativity: "1.22", electronConfiguration: "[Kr] 4d1 5s2", groupBlock: "Transition metal", row: 5, column: 3 },
  { atomicNumber: 40, symbol: "Zr", name: "Zirconium", atomicMass: "91.224", electronegativity: "1.33", electronConfiguration: "[Kr] 4d2 5s2", groupBlock: "Transition metal", row: 5, column: 4 },
  { atomicNumber: 41, symbol: "Nb", name: "Niobium", atomicMass: "92.906", electronegativity: "1.6", electronConfiguration: "[Kr] 4d4 5s1", groupBlock: "Transition metal", row: 5, column: 5 },
  { atomicNumber: 42, symbol: "Mo", name: "Molybdenum", atomicMass: "95.95", electronegativity: "2.16", electronConfiguration: "[Kr] 4d5 5s1", groupBlock: "Transition metal", row: 5, column: 6 },
  { atomicNumber: 43, symbol: "Tc", name: "Technetium", atomicMass: "(98)", electronegativity: "1.9", electronConfiguration: "[Kr] 4d5 5s2", groupBlock: "Transition metal", row: 5, column: 7 },
  { atomicNumber: 44, symbol: "Ru", name: "Ruthenium", atomicMass: "101.07", electronegativity: "2.2", electronConfiguration: "[Kr] 4d7 5s1", groupBlock: "Transition metal", row: 5, column: 8 },
  { atomicNumber: 45, symbol: "Rh", name: "Rhodium", atomicMass: "102.91", electronegativity: "2.28", electronConfiguration: "[Kr] 4d8 5s1", groupBlock: "Transition metal", row: 5, column: 9 },
  { atomicNumber: 46, symbol: "Pd", name: "Palladium", atomicMass: "106.42", electronegativity: "2.2", electronConfiguration: "[Kr] 4d10", groupBlock: "Transition metal", row: 5, column: 10 },
  { atomicNumber: 47, symbol: "Ag", name: "Silver", atomicMass: "107.87", electronegativity: "1.93", electronConfiguration: "[Kr] 4d10 5s1", groupBlock: "Transition metal", row: 5, column: 11 },
  { atomicNumber: 48, symbol: "Cd", name: "Cadmium", atomicMass: "112.41", electronegativity: "1.69", electronConfiguration: "[Kr] 4d10 5s2", groupBlock: "Transition metal", row: 5, column: 12 },
  { atomicNumber: 49, symbol: "In", name: "Indium", atomicMass: "114.82", electronegativity: "1.78", electronConfiguration: "[Kr] 4d10 5s2 5p1", groupBlock: "Post-transition metal", row: 5, column: 13 },
  { atomicNumber: 50, symbol: "Sn", name: "Tin", atomicMass: "118.71", electronegativity: "1.96", electronConfiguration: "[Kr] 4d10 5s2 5p2", groupBlock: "Post-transition metal", row: 5, column: 14 },
  { atomicNumber: 51, symbol: "Sb", name: "Antimony", atomicMass: "121.76", electronegativity: "2.05", electronConfiguration: "[Kr] 4d10 5s2 5p3", groupBlock: "Metalloid", row: 5, column: 15 },
  { atomicNumber: 52, symbol: "Te", name: "Tellurium", atomicMass: "127.60", electronegativity: "2.1", electronConfiguration: "[Kr] 4d10 5s2 5p4", groupBlock: "Metalloid", row: 5, column: 16 },
  { atomicNumber: 53, symbol: "I", name: "Iodine", atomicMass: "126.90", electronegativity: "2.66", electronConfiguration: "[Kr] 4d10 5s2 5p5", groupBlock: "Halogen", row: 5, column: 17 },
  { atomicNumber: 54, symbol: "Xe", name: "Xenon", atomicMass: "131.29", electronegativity: "2.6", electronConfiguration: "[Kr] 4d10 5s2 5p6", groupBlock: "Noble gas", row: 5, column: 18 },
  // ROW 6
  { atomicNumber: 55, symbol: "Cs", name: "Cesium", atomicMass: "132.91", electronegativity: "0.79", electronConfiguration: "[Xe] 6s1", groupBlock: "Alkali metal", row: 6, column: 1 },
  { atomicNumber: 56, symbol: "Ba", name: "Barium", atomicMass: "137.33", electronegativity: "0.89", electronConfiguration: "[Xe] 6s2", groupBlock: "Alkaline earth metal", row: 6, column: 2 },
  { atomicNumber: 74, symbol: "W", name: "Tungsten", atomicMass: "183.84", electronegativity: "2.36", electronConfiguration: "[Xe] 4f14 5d4 6s2", groupBlock: "Transition metal", row: 6, column: 6 },
  { atomicNumber: 78, symbol: "Pt", name: "Platinum", atomicMass: "195.08", electronegativity: "2.28", electronConfiguration: "[Xe] 4f14 5d9 6s1", groupBlock: "Transition metal", row: 6, column: 10 },
  { atomicNumber: 79, symbol: "Au", name: "Gold", atomicMass: "196.97", electronegativity: "2.54", electronConfiguration: "[Xe] 4f14 5d10 6s1", groupBlock: "Transition metal", row: 6, column: 11 },
  { atomicNumber: 80, symbol: "Hg", name: "Mercury", atomicMass: "200.59", electronegativity: "2.00", electronConfiguration: "[Xe] 4f14 5d10 6s2", groupBlock: "Transition metal", row: 6, column: 12 },
  { atomicNumber: 82, symbol: "Pb", name: "Lead", atomicMass: "207.2", electronegativity: "2.33", electronConfiguration: "[Xe] 4f14 5d10 6s2 6p2", groupBlock: "Post-transition metal", row: 6, column: 14 },
];
