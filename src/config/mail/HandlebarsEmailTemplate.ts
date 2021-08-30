import handlebars from 'handlebars';
import fs from 'fs';

interface TemplateVariables {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  file: string;
  variables: TemplateVariables;
}

export default class HandlebarsEmailTemplate {
  public async parse({ file, variables }: ParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
