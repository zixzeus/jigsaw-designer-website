import {readFile} from "node:fs/promises";
import ts from "typescript";

export async function loadTsModule(filePath) {
  const source = await readFile(filePath, "utf8");
  const result = ts.transpileModule(source, {
    fileName: filePath,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });

  const diagnostics = (result.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (diagnostics.length) {
    const formatted = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n",
    });
    throw new Error(`Could not load ${filePath}:\n${formatted}`);
  }

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(result.outputText).toString("base64")}`;
  return import(moduleUrl);
}
