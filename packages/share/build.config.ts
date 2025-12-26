import { defineBuildConfig } from "unbuild";
export default defineBuildConfig({
  entries: ["./src/index"], // 打包⼊⼝
  outDir: "./dist", // 打包后的输出⽂件
  declaration: true, // 打包导出 TS 类型代码，⽅便其他⼦项⽬使⽤有类型提示
  rollup: {
    emitCJS: true, // 输出 commonjs 格式代码
  },
  externals: ["react", "react-dom", "antd", "@ant-design/icons"],
})