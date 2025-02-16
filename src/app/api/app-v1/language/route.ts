import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { apiRespObject, defaultTenant } from '@/constans';
import type { ApiPromise, LangFiles } from '@/interfaces';

export async function POST(request: NextRequest): ApiPromise {
  const { locale, tenant } = await request.json();
  const jsonRegex = /\.json$/i;
  const language: LangFiles = {
    default: [],
    tenant: [],
  };
  const src = {
    default: path.join(process.cwd(), `dictionary/${defaultTenant}`),
    tenant: path.join(process.cwd(), `dictionary/${tenant}`),
  };
  const langResp = { ...apiRespObject };
  let status = 200;

  try {
    // Read files from the default directory and filter JSON files
    const defaultFiles = fs.readdirSync(src.default, { recursive: true }).filter((file) => {
      const dirName = path.dirname(`${file}`);
      return (dirName === '.' || dirName === locale) && jsonRegex.test(path.extname(`${file}`));
    });

    /**
     * Updates the language files.
     *
     * @param {string} filePath - The path of the file.
     * @param {string} fileName - The name of the file.
     */
    const updateLanguageFiles = (filePath: string, fileName: string) => {
      language.default.push(fileName);

      if (tenant !== defaultTenant && fs.existsSync(path.join(src.tenant, filePath))) {
        language.tenant.push(fileName);
      }
    };

    // Process each file and update the language files
    for (const file of defaultFiles) {
      const dirName = path.dirname(`${file}`);
      const fileName = path.basename(`${file}`, path.extname(`${file}`));

      if (dirName === '.') {
        updateLanguageFiles(`${file}`, fileName);
      }

      if (dirName === locale) {
        updateLanguageFiles(`${file}`, `${dirName}/${fileName}`);
      }
    }

    langResp.language = language;
  } catch (error) {
    status = 500;
    langResp.code = `${status}.00.00`;
    langResp.message = `Internal server ${(error as Error).message}`;
  }

  return NextResponse.json(langResp, { status });
}
