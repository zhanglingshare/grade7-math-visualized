# 小学数学60场思维实验 · 动画形式重构施工图

> 版本 2026-11-14。这是**逐场施工方案**，不是“60场已完成对象级交互”的验收声明。
> 
> 对应现有小学校园：[`K1-6.html#/train`](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train)。原有12节 Grok 动画、284个小学知识点保持不动。此表只规划60场实验的深化，不另起割裂系统。

## 核心判断

现有60场均有可视化环节，其中后增18种 SVG 场景支持数值拖动、切换视角和短动画。但“拖动横坐标改变参数”不等于真实操作数学对象；例如 **m14“25×16凑整”** 必须实际完成25×4×4的分组重构，而不是只显示普通4×4点阵。**所有下列“目标动作”均为待逐场实现并验收的要求，不可把计划当作已交付功能。**

**优先级：** P0（30场，针对主要断点）→ P1（20场，拓展迁移）→ P2（10场，巩固与辨析）。优先级用于开发顺序，不用于评价孩子能力。

**六道教学质量门：** 读懂求什么；预测并说理由；直接操作数学对象；切换至少两种表征；陈述变化与不变量；完成反例或陌生迁移。若只能拖滑杆看数值变化，不计入深度思维动画验收。

## 60场逐项重构表

### 1. 读题建模（10场）

| 现有实验 | 年级 | 目标动画／可视化 | 孩子必须亲手做 | 建构的数学原理 | 优先级 |
|---|---:|---|---|---|:---:|
| [M01 · 多3颗，为什么反而要减？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m01) | 1 | 比较条形与缺失量 | 拖动黄色差值段使甲乙对齐；先标记谁较大 | 比较方向决定加减，乙＝甲－差 | P0 |
| [M02 · 把文字变成几组几](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m02) | 2 | 实物分盒＋阵列互换 | 把24支笔拖成4盒×6，再重新分成6盒×4 | 组数与每组数可交换，总量不变 | P1 |
| [M03 · 问题问袋数，还是剩余数？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m03) | 2 | 糖果装袋与余数托盘 | 亲手装满5颗一袋，剩余自动落入托盘 | 商是满袋数，余数不能算满袋 | P0 |
| [M04 · 面积和周长不是一回事](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m04) | 3 | 可变长方形与两种描边 | 拖动顶点；内部单位格与边界分别点亮 | 面积与周长是不同度量 | P0 |
| [M25 · 比谁多，别只盯“多”字](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m25) | 2 | 卡片条形与比较箭头 | 先选“谁比谁多”，拖动多出的5张部分 | 比较方向决定未知量 | P0 |
| [M26 · 别把时钟上的数字直接相减](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m26) | 3 | 可拨双时钟与60分钟轴 | 从9:45拨到10:20，在10:00处分段暂停 | 跨时进率60 | P0 |
| [M27 · 账单里的固定费用不能反复加](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m27) | 4 | 可拆装购物清单 | 加入第4本书仅增加商品金额，邮费只一次 | 固定费用与逐件费用不同 | P2 |
| [M28 · 单位不同，不能直接相加](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m28) | 4 | 千米米双标尺接龙 | 把2km刻度接300m刻度后统一读取米 | 相加前单位必须统一 | P2 |
| [M29 · 行程题先分清速度、时间、路程](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m29) | 5 | 行车动画与距离时间图 | 拖动时间，车位移与路程曲线同步 | 匀速时路程随时间线性变化 | P1 |
| [M30 · 看懂楼梯图，别急着找公式](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m30) | 6 | 可搭建阶梯方块 | 逐层搭1、2、3、4块，累计显示10 | 逐层增量和总块数不同 | P0 |

### 2. 看懂结构（10场）

| 现有实验 | 年级 | 目标动画／可视化 | 孩子必须亲手做 | 建构的数学原理 | 优先级 |
|---|---:|---|---|---|:---:|
| [M05 · 一个数字，两个身份](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m05) | 1 | 数位抽屉＋单位珠 | 把数字2从个位拖到十位并观察数量变化 | 数位改变单位，数字不等于数量 | P0 |
| [M06 · 把乘法拆开，答案不变](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m06) | 3 | 长方阵分割刀 | 把6×7沿5列切开成6×5和6×2，拼回验证 | 拆分不改变总点数 | P0 |
| [M07 · 火柴棒里藏着结构](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m07) | 4 | 共享边火柴棒拼搭 | 逐格加正方形，自动合并公共边并数新增火柴 | 增加一格只增3根 | P2 |
| [M08 · 分母大，谁的一份更大？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m08) | 5 | 等大蛋糕的扇区切分 | 同一蛋糕分别切4和8份，比较各取一份 | 同一整体，单位分数随分母增大而减小 | P1 |
| [M31 · 把长方阵切开，乘法不用死背](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m31) | 3 | 7×8矩阵切拼板 | 动手分割为7×5、7×3并合并 | 切割不改变点阵总数 | P0 |
| [M32 · 层数、行数、列数怎样相乘？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m32) | 4 | 可旋转三维积木堆 | 堆3×2×2后旋转并剥离隐藏层 | 体积需计入遮挡的小方块 | P0 |
| [M33 · 组合问题：为什么要画树？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m33) | 4 | 服装搭配卡片＋分支树 | 将3件上衣配2条裤子逐条连到树叶 | 选择相乘而非相加 | P2 |
| [M34 · 整体的一部分，先找整体](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m34) | 5 | 48颗珠子平均分袋 | 把48颗平均分4袋，再更换袋数 | 分数与整体大小紧密关联 | P1 |
| [M35 · 放大边长，面积发生了什么？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m35) | 5 | 可缩放正方形网格 | 拖边长3到6，同时重数边长和内部面积 | 面积倍数是边长倍数平方 | P0 |
| [M36 · 镜子两边，哪些量不变？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m36) | 6 | 可拖动镜面反射点 | 移动(3,2)，镜像点同步移动，显示到轴距离 | 反射保距离、改变左右位置 | P2 |

### 3. 换种表示（10场）

| 现有实验 | 年级 | 目标动画／可视化 | 孩子必须亲手做 | 建构的数学原理 | 优先级 |
|---|---:|---|---|---|:---:|
| [M09 · 图形、算式和语言同一件事](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m09) | 4 | 文字／方阵／算式三屏联动 | 将6行4列搭成方格再拖入乘法槽 | 三种表征指向同一数量结构 | P0 |
| [M10 · 同一块蛋糕，两种写法](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m10) | 5 | 分数条二次细分 | 把1/2纵向细切为2/4，阴影长度保持不动 | 分割变细但占比不变 | P0 |
| [M11 · 0.4、4/10与40%是同一幅图](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m11) | 5 | 十分格／百分格双网格 | 涂4个十分格，再映射到40个百分格 | 0.4、4/10、40%是等量表达 | P1 |
| [M12 · 位置和路程，两个答案](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m12) | 6 | 人偶与路程双轨数轴 | 人偶从0向左3格；同步显示终点和走过距离 | 位置可以负，路程不能负 | P0 |
| [M37 · 一张图，同时看见分数、小数、百分数](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m37) | 5 | 分数条／百分格／小数标尺 | 涂3/5后切换成0.6、60%，要求反向还原 | 不同符号是同一占比 | P1 |
| [M38 · 时间也能变成数轴](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m38) | 3 | 时钟展开成分钟尺 | 把1:15展开为75分钟，再换1.25小时 | 时分与小数小时进率不同 | P1 |
| [M39 · 厘米、分米、米，换单位不是移魔术点](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m39) | 4 | 米尺厘米尺重合刻度 | 让0.25米终点与25厘米标记重合 | 换单位不换长度 | P2 |
| [M40 · 数轴上的走路，文字变成运算](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m40) | 6 | 起点可移动的数轴跳跃 | 从5向左移动9格显示−4与路程9 | 位移与路程不同 | P0 |
| [M41 · 把输入、过程和输出画成机器](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m41) | 6 | 可改顺序的双运算机器 | 分别运行×3再＋2和＋2再×3并对照 | 运算顺序一般不可交换 | P1 |
| [M42 · 一刀拼出三角形面积](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m42) | 5 | 全等三角形旋转拼接 | 拖动并旋转第二个三角形成平行四边形 | 底×高是两块同面积三角形 | P0 |

### 4. 等价变换（10场）

| 现有实验 | 年级 | 目标动画／可视化 | 孩子必须亲手做 | 建构的数学原理 | 优先级 |
|---|---:|---|---|---|:---:|
| [M13 · 把10个一换成一个十](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m13) | 1 | 小棒捆扎交换台 | 凑满10根小棒，拖进十位换一捆 | 10个一与1个十相等 | P0 |
| [M14 · 25×16为什么能心算？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m14) | 4 | 25×16凑整重组工坊 | 16个25先每4个打成100，再组成4个100 | 分组重排不改变乘积 | P0 |
| [M15 · 等值分数不是换个答案](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m15) | 5 | 等值分数细分镜 | 1/2切成2/4、3/6、4/8，保持同一区域 | 同乘非零倍数分数值不变 | P1 |
| [M16 · 配方能翻倍，但味道不能变](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m16) | 6 | 配方双杯同比倒料 | 面粉2份与水3份同步扩成3倍，观察比例 | 总量变而配比不变 | P2 |
| [M43 · 借1还1：19+18为什么等于20+17？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m43) | 2 | 19＋18方块搬运工坊 | 从18搬1给19，形成20＋17 | 一增一减保证总和不变 | P0 |
| [M44 · 把15×6拆成两块，答案为什么不变？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m44) | 3 | 15×6面积切割板 | 将15分10＋5并重合检验 | 乘法须作用于两部分 | P1 |
| [M45 · 3/4和6/8：变小的格子，不变的阴影](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m45) | 5 | 3/4到6/8分格镜 | 滑动细分镜，格数双倍而阴影长度保持 | 分子分母同乘保证等值 | P0 |
| [M46 · 缩小到一半，面积会缩成多少？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m46) | 5 | 边长8到4缩放对照 | 把正方形缩半，重叠比较面积64到16 | 长度缩半面积缩四倍 | P1 |
| [M47 · 天平两边同时减8，为什么仍然平衡？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m47) | 5 | 可拿走砝码双盘天平 | 两边同取8砝码再看是否水平 | 等式两边同时减相等量仍平衡 | P0 |
| [M48 · 减去一个负数，方向会反过来](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m48) | 6 | 减去负数箭头反转数轴 | 对比6−2与6−(−2)，分开操作与符号箭头 | 减负数等价加正数 | P0 |

### 5. 逆向推理（10场）

| 现有实验 | 年级 | 目标动画／可视化 | 孩子必须亲手做 | 建构的数学原理 | 优先级 |
|---|---:|---|---|---|:---:|
| [M17 · 从结果倒推缺失的一块](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m17) | 2 | 未知方块双盘天平 | 盖住未知量，再同时移除已知5块找原量 | 等式两边做同一种减法 | P0 |
| [M18 · 从商和余数倒回总数](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m18) | 3 | 商余拆装机 | 用3组每组4个，再补2个还原原数 | 被除数＝除数×商＋余数 | P1 |
| [M19 · 从面积倒推出边长](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m19) | 5 | 固定面积24的矩形变形 | 拖成长6宽4或8宽3，反求缺失边 | 相同面积不能唯一决定形状 | P0 |
| [M20 · 字母不是神秘的答案](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m20) | 6 | 运费价格机器倒带 | 从总价18先拆运费2，再每4元换一本 | 逆向计算要撤销最后的操作 | P0 |
| [M49 · 反向打开运算机器](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m49) | 6 | 运算机器反向拆解 | 从23减2，再除3得到7 | 逆推操作须按逆序撤销 | P0 |
| [M50 · 知道3/8是27，反求整体](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m50) | 5 | 3/8已知量反求整体 | 给3格放27人，先求一格9再补到8格 | 一份求出后才能求整体 | P0 |
| [M51 · 知道到达时间，倒推出发时间](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m51) | 3 | 倒着走的时钟与时间轴 | 从9:05回拨45分钟，越过9点到8:20 | 分钟按60借位 | P1 |
| [M52 · 已知体积和底面积，倒推出高度](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m52) | 5 | 30立方块逐层剥离 | 固定底面10格，从体积30倒推3层 | 体积÷底面积＝高 | P1 |
| [M53 · 12种搭配，反推另一类有几种](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m53) | 4 | 逆向组合分支树 | 帽子固定3种，补到12个叶子推4种围巾 | 完全搭配前提下叶数÷分支数 | P2 |
| [M54 · 从路程和时间倒推速度](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m54) | 5 | 距离时间斜率对照图 | 固定180km，拖动3小时位置观察斜率 | 速度依赖路程和耗时 | P2 |

### 6. 反例迁移（10场）

| 现有实验 | 年级 | 目标动画／可视化 | 孩子必须亲手做 | 建构的数学原理 | 优先级 |
|---|---:|---|---|---|:---:|
| [M21 · 同样面积，就一定同样周长？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m21) | 3 | 等面积异周长双矩形 | 同步拼6×4和8×3，再量各自周长 | 面积相同不推周长相同 | P0 |
| [M22 · 看到三个数，就发现唯一规律了吗？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m22) | 4 | 数列多规则续写工作台 | 给2、5、8设计至少两种后续规则 | 少量观察值不足以决定唯一规律 | P1 |
| [M23 · 先涨20%，再跌20%，回原价吗？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m23) | 5 | 百分比基准瀑布图 | 把100先放大20%到120，再从120缩20% | 两次百分比的基准不同 | P1 |
| [M24 · 分母变大，分数一定变小吗？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m24) | 6 | 双分数比较器＋反例按钮 | 先比1/2与1/3，再换3/4与1/2作反例 | 单位分数规律不能泛化到所有分数 | P0 |
| [M55 · 面积翻倍，周长会翻倍吗？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m55) | 5 | 边长／周长／面积三联图 | 边长3拖到6，对比周长×2与面积×4 | 不同量对缩放响应不同 | P1 |
| [M56 · “多20%”的整体究竟是谁？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m56) | 6 | 可交换百分比基准条 | 锁乙100求甲120，再切换基准为甲看16.7% | 百分比始终依赖比较基准 | P0 |
| [M57 · 看到1、4、9、16，就知道唯一规律吗？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m57) | 5 | 平方点阵与不同规则分支 | 拼1、4、9、16，切换另一条前四项相同的规则 | 有限样本不能唯一外推 | P1 |
| [M58 · 一半一定比三分之一大吗？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m58) | 5 | 不同整体分数双条对比 | 把6的一半涂3，把12的三分之一涂4 | 要比较绝对数量先看两个整体 | P1 |
| [M59 · 镜像后什么变，什么不变？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m59) | 6 | 镜像点与等长圆弧 | 拖(2,3)与(−2,3)并连向原点 | 反射改变横坐标，不改变到原点距离 | P2 |
| [M60 · 分支越多，结果一定等可能吗？](https://zhanglingshare.github.io/grade7-math-visualized/animation/K1-6.html#/train/m60) | 6 | 两次抛硬币分支树 | 逐层展4种顺序，再切换偏置机制看概率 | 路径数和等可能是不同判断 | P1 |

## 面向孩子的操作验收

每个实验至少记录以下信号：

1. **读题定位：** 第一次能否指出已知、未知、单位与限制；不要只看是否选对答案。
2. **预测理由：** 不给公式提示，先写或口述为什么认为它会如此变化。
3. **对象操作：** 实际拖拽方块、转动时针、切分面积、移动数轴人偶、增减天平砝码等，不把滑块本身视为建构。
4. **双表征映射：** 例如实物 ↔ 线段图 ↔ 算式，孩子能指出对应关系。
5. **寻找不变量：** 更换条件后自己指出“什么改变了、什么没变、为什么”。
6. **独立迁移与事后复盘：** 变式题不复用演示数值；复盘回到自己的错误想法，并在之后的新题里检验。

## 最需要先修复的设计偏差

- **m14:** 现有动画的4×4点阵与题目的25×16不对应，必须用100的组成真正展示凑整。
- **m24:** 仅展示单位分数无法解释“分母大分数一定小”的反例，必须支持分子与分母独立改变。
- **m32 / m52:** 现有SVG是静态投影搭配层数变化，需加入真实旋转、遮挡与逐层剥离，才可能建立空间构造能力。
- **m42:** 现有图形切换并非孩子亲自完成的拼接；需要全等三角形的拖拽、旋转、吸附和面积保持。
- **m47 / m49:** 现有平衡图和运算机器更多是画面呈现，孩子需要实际执行“双方同减”和“逆序撤销”，以检验等价关系。
- **m60:** 必须区分“结果路径的数量”与“路径等可能”，不能凭分支数量单独断言概率分布。

## 工程边界

- 原版 Grok 动画不删、不重写；现有60个 `m01–m60` ID 与已保存进度键保持稳定。
- 对象级动画使用场景组件，允许同类复用，但每场的数学操作和验收标准必须具体。
- 手机／平板可用，触控目标至少约44px；为运动敏感用户提供减少动画模式；不要求纸上书写。
- 现有题与图谱的准确性尚需核验，尤其先修关系和个别自测题；不能把一次答对解释为概念掌握。
- 不向孩子暴露科研或算法术语。设计规格和质量门只放在此维护文件，不堆到学习页面。

**本施工图的数据来源：** 当前仓库 `animation/primary-thinking-data.js` 与 `animation/primary-thinking-extra.js` 的60场现有实验主题、题目和当前场景类型；目标动作、验收原则和优先级是本轮新增的设计判断。
