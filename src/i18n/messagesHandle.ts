'use server';

import fs from 'fs';
import path from 'path';
// Internal
import { LangFiles } from '@/interfaces';
import { defaultTenant } from '@/constans';

export async function messagesHandle(locale: string, tenant: string) {
  const jsonRegex = /\.json$/i;
  const lang: LangFiles = {
    default: [],
    tenant: [],
  };

  const src = {
    default: path.join(process.cwd(), `dictionary/${defaultTenant}`),
    tenant: path.join(process.cwd(), `dictionary/${tenant}`),
  };

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
      lang.default.push(fileName);

      if (tenant !== defaultTenant && fs.existsSync(path.join(src.tenant, filePath))) {
        lang.tenant.push(fileName);
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
  } catch (error) {
    console.error(`messagesHandle: ${(error as Error).message}`);
  }

  return lang;
}
