# 数学知识图谱数据

原作者 xiaoyang111222。原项目 [cn-math-taxonomy](https://github.com/xiaoyang111222/cn-math-taxonomy)，使用 [548320e](https://github.com/xiaoyang111222/cn-math-taxonomy/tree/548320e076bbd06edbde6ca8fb67b45bb6730768) 快照的 `data/topics.json`、`data/dependencies.json`、`data/id-aliases.json`。

`catalog.js` 选取了该快照中小学至高中数学的全部 870 个节点及其 1,459 条先修关系。去除了本图谱不使用的字段，保留了原编号、名称、教材位置、先修强度和连线理由。为衔接本站已有课程，沿用部分讲解和简称，增加课节映射、17 条本站补充关系及其说明。本站补充关系有单独标识。原始和改编数据采用 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)。

`dagre.min.js` 来自同一快照中 `assets/vendor/`，沿用 [MIT 许可](LICENSE-dagre.txt)。
