import handlebars from 'handlebars';

interface TemplateVariables {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  template: string;
  variables: TemplateVariables;
}

export default class HandlebarsEmailTemplate {
  public async parse({
    template,
    variables,
  }: ParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
