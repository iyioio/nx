import {
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    getWorkspaceLayout,
    names,
    offsetFromRoot,
    Tree
} from '@nrwl/devkit';
import * as path from 'path';
import { CdkGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends CdkGeneratorGeneratorSchema {
  uname:string;
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  jsonTags: string;
  toRoot: string;

}

function normalizeOptions(tree: Tree, options: CdkGeneratorGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];
  const jsonTags=JSON.stringify(parsedTags);

  let toRoot='..';
  for(const c of projectRoot){
    if(c==='/' || c==='\\'){
        toRoot+='/..';
    }
  }

  const uname=options.stackName
    .split('-')
    .map(p=>p.substring(0,1).toUpperCase()+p.substring(1))
    .join('')

  return {
    ...options,
    uname,
    jsonTags,
    toRoot,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      template: ''
    };
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: CdkGeneratorGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(
    tree,
    normalizedOptions.projectName,
    {
      root: normalizedOptions.projectRoot,
      projectType: 'library',
      sourceRoot: `${normalizedOptions.projectRoot}/src`,
      targets: {
        build: {
          executor: "@iyio/nx-cdk:build",
        },
      },
      tags: normalizedOptions.parsedTags,
    }
  );
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
