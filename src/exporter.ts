import axios from "axios";
import * as XLSX from "xlsx";
import { allCountries as countries } from "./countryData";

const API_KEY = "dlg4WGdVSURMZFY1ZG42TkpuTGRqT2ppMU05U29RUE5ieGZpelNRdQ==";

async function getCities(countryCode: string) {
  try {
    const res = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`,
      { headers: { "X-CSCAPI-KEY": API_KEY } }
    );
    return res.data;
  } catch (err: any) {
    console.error(`❌ Failed for ${countryCode}:`, err.message);
    return [];
  }
}

export async function exportCitiesToExcel() {
  const rows: any[] = [];

  for (const country of countries) {
    console.log(`🌍 Fetching cities for ${country.label} (${country.value})`);
    const cities = await getCities(country.value);

    cities.forEach((city: any) => {
      rows.push({
        Country: country.label,
        Code: country.value,
        CityID: city.id,
        City: city.name,
      });
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cities");

  XLSX.writeFile(workbook, "cities.xlsx");
  console.log("✅ cities.xlsx created successfully!");
}
