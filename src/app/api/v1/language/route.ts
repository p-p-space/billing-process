import fs from 'fs';
import path from 'path';
import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { LangFiles } from '@/interfaces';

export async function POST(request: NextRequest) {
  const { locale, client = 'bt' } = await request.json();
  const jsonRegex = /\.json$/i;
  const language: LangFiles = {
    default: [],
    client: [],
  };
  const src = {
    default: path.join(process.cwd(), 'dictionary/bt'),
    client: path.join(process.cwd(), `dictionary/${client}`),
  };

  try {
    const defaultFiles = fs.readdirSync(src.default, { recursive: true }).filter((file) => {
      const dirName = path.dirname(`${file}`);
      return (dirName === '.' || dirName === locale) && jsonRegex.test(path.extname(`${file}`));
    });

    const updateLanguageFiles = (filePath: string, fileName: string) => {
      language.default.push(fileName);

      if (client !== 'bt' && fs.existsSync(path.join(src.client, filePath))) {
        language.client.push(fileName);
      }
    };

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

    return NextResponse.json({ language }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', error: error }, { status: 500 });
  }
}
