import esbuild from "esbuild";
import glob from "tiny-glob";

const pattern = await glob("src-electron/**/*.ts");

const isProduction = process.env.NODE_ENV === "production";

const { metafile } = await esbuild.build({
  entryPoints: pattern,
  outdir: "dist-electron",
  format: "cjs",
  target: "esnext",
  platform: "node",
  metafile: true,
  treeShaking: true,
  color: true,
  outExtension: { ".js": ".cjs" },
  minify: isProduction,
});

const out = await esbuild.analyzeMetafile(metafile);

console.log(out);
