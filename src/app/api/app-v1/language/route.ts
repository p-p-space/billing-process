import fs from 'fs';
import path from 'path';
import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { LangFiles } from '@/interfaces';

/**
 * Handles POST requests to fetch language files.
 *
 * @param {NextRequest} request - The HTTP request.
 * @returns {NextResponse} - The HTTP response with the language files.
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<{ code: string; language?: LangFiles; error?: unknown }>> {
  // Extract locale and tenant from the request body
  const { locale, tenant = 'bt' } = await request.json();
  const jsonRegex = /\.json$/i;
  const language: LangFiles = {
    default: [],
    tenant: [],
  };
  const src = {
    default: path.join(process.cwd(), 'dictionary/bt'),
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
      language.default.push(fileName);

      if (tenant !== 'bt' && fs.existsSync(path.join(src.tenant, filePath))) {
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

    // Return the response with the language files
    return NextResponse.json({ code: '200.000.00', language }, { status: 200 });
  } catch (error) {
    // Handle errors and return an error response
    return NextResponse.json({ code: '500.000.00', error }, { status: 500 });
  }
}
